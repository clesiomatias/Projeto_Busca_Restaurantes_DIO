import { Skeleton } from '../index';
import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { Restaurant, RestaurantInfo, Title, Address, RestaurantPhoto } from './styles';


export default function RestauranteCard({ restaurant, onClick, photo }) {
    //como o Mapbox não tem um ranking como o Google, só pra termos de "fazer valer" esse projeto 
    // esse ranking será gerado aleatóriamente  :)
    const ranking = (Math.random() * 5).toFixed(1);
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <Restaurant onClick={onClick}>
            <RestaurantInfo>
                <Title>{restaurant !== undefined ? restaurant.place_name.split(',')[0] : ''}</Title>
                <ReactStars count={5} value={Number(ranking)} isHalf activeColor='#e7711c' edit={false} />
                <Address>{restaurant !== undefined ? restaurant.properties.address ? restaurant.properties.address : restaurant.place_name : ""}</Address>
            </RestaurantInfo>
            <RestaurantPhoto
                imageLoaded={imageLoaded}
                src={photo.toString()}
                onLoad={() => setImageLoaded(true)}
                alt="Foto do Restaurante" />
            {!imageLoaded && <Skeleton width='100px' height='100px' />}
        </Restaurant>

    )
}

