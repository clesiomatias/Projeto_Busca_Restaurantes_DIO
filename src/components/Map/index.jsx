import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import point from "../../assets/map-point.png"
import React, { useState, useRef, useEffect } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurants } from '../../redux/modules/restaurants';
import { setRestaurant } from '../../redux/modules/restaurants';



export default function Map(props) {
    const dispatch = useDispatch();
    const { restaurants } = useSelector((state) => state.restaurants);
    const myMapRef = useRef();
    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOXGL_API_TOKEN;

    navigator.geolocation.getCurrentPosition(Success, console.error);
    const { query, restaurantId } = props;
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        width: "100vw",
        height: '100vh',
        zoom: 8.5,
    });
    const [centerMap, setCenterMap] = useState({ latitude: 0, longitude: 0 });
    useEffect(() => {
        if (query) {
            searchNearBy(centerMap.longitude, centerMap.latitude, query)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])
    useEffect(() => {
        if (restaurantId) {
            getRestautantById(restaurantId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restaurantId])

    //Função que substitui o 'centerAroundCurrentLocation do GoogleMaps
    function Success(data) {
        if (data.coords.latitude !== 0 && data.coords.longitude !== 0) {
            setViewport({ ...viewport, latitude: data.coords.latitude, longitude: data.coords.longitude });
            setCenterMap({ ...centerMap, latitude: data.coords.latitude, longitude: data.coords.longitude });
        }
    };


    function searchNearBy(lon, lat, req) {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${req}.json?access_token=${MAPBOX_TOKEN}&country=BR&limit=10&language=pt&proximity=${lon},${lat}&bbox=${lon - 0.300},${lat - 0.300},${lon + 0.300},${lat + 0.300}&type=poi`)
            .then(response => response.json())
            .then((data) => {
                console.log(data.features)
                dispatch(setRestaurants(data.features));
            })
    }
    function getRestautantById(restaurantId) {

        if (restaurantId !== undefined) {
            console.log('foi enviado: ' + restaurantId)

            dispatch(setRestaurant(restaurantId))
        }



    }





    return (
        <>
            <ReactMapGL
                {...viewport}
                ref={myMapRef}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                mapStyle='mapbox://styles/mapbox/streets-v11'
                onViewportChange={(viewport, centerMap) => {
                    setViewport(viewport);
                    setCenterMap({ ...centerMap, latitude: viewport.latitude, longitude: viewport.longitude })
                }

                }
                {...props}

            >

                {restaurants.map((restaurant) => (
                    <Marker
                        latitude={restaurant.geometry.coordinates[1]}
                        longitude={restaurant.geometry.coordinates[0]}
                        key={restaurant.id}
                    >
                        <img src={point} alt={restaurant.place_name.split(',')[0]} width='10%' height='10%' />
                        {/* {restaurant.place_name.split(',')[0]} */}
                    </Marker>
                ))}


            </ReactMapGL>

        </>
    )
}