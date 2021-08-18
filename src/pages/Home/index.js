import React from 'react';
import { useSelector } from 'react-redux';
import { ModalContent, Container, Search, Logo, Wraper, CarouselTitle, Carousel, ModalTitle } from './styles';
import logo from '../../assets/logo.svg';
import TextField, { Input } from '@material/react-text-field';
import { useState, useEffect } from 'react';
import MaterialIcon from '@material/react-material-icon';
import { Modal, Map } from '../../components';
import { Card, RestauranteCard, Loader, Skeleton } from '../../components';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

const Home = () => {
    const [inputValue, setInputValue] = useState();
    const [restId, setRestId] = useState(null);
    const [query, setQuery] = useState('');
    const [modalOpened, setModalOpened] = useState(false);
    const { restaurants, restaurantSelected } = useSelector((state) => state.restaurants);

    const settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 300,
        slideToShow: 4,
        slideToScroll: 4,
        adaptiveHeight: true,
        variableWidth: true,

    };
    useEffect(() => {
        // só assim pra funcionar corretamente :(
        if (restId !== null) {
            setModalOpened(true);

        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [restId])
    function handleKeyPress(e) {
        if (e.key === "Enter") {
            setQuery(inputValue);
        }

    }

    function handleOpenModal(e) {
        setRestId(e);

    }
    //esta função sorteia uma imagem  de uma pasta pública
    //para ser colocada nos cards, já que o MapboxGL não tem fotos
    // pra cada estabelecimento
    function sorteiaFoto() {
        const num = Math.trunc(Math.random() * 21)
        const images = `/imgs/${num}.jpg`;

        return images
    }


    return (
        <Wraper>
            <Container>
                <Search>
                    <Logo src={logo} alt="Logo do restaurante" />
                    <TextField
                        label="Pesquisar restaurante"
                        outlined
                        trailingIcon={<MaterialIcon role="button" icon="search" />}>
                        <Input
                            onKeyPress={handleKeyPress}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}>

                        </Input>

                    </TextField>
                    {restaurants.length > 0 ? (
                        <>
                            <CarouselTitle>Na sua Área</CarouselTitle>
                            <Carousel {...settings}>
                                {restaurants.map((restaurant) =>
                                    <Card
                                        key={restaurant.id}
                                        photo={sorteiaFoto}
                                        title={restaurant.place_name.split(',')[0]} />)}


                            </Carousel><br />
                        </>
                    ) : (
                        <Loader />
                    )}


                </Search >
                {restaurants.map((restaurant) => <RestauranteCard
                    key={restaurant.id}
                    photo={sorteiaFoto()}
                    onClick={() => {
                        handleOpenModal(restaurant.id);

                    }}
                    restaurant={restaurant} />)}

            </Container >


            <Map query={query} restaurantId={restId} ></Map>

            <Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)} >
                {restaurantSelected ? (
                    <>
                        <ModalTitle>
                            {/* Aqui , depois de um bilhão de tentativas diretas com o restaurantSelected, refiz esse map :( */}
                            {restaurants.map((restaurant) => restaurant.id === restId ? restaurant.place_name.split(',')[0] : '')}
                        </ModalTitle>
                        <ModalContent>
                            {restaurants.map((restaurant) => restaurant.id === restId ? restaurant.place_name.split(',').slice(1) : '')}

                        </ModalContent>
                    </>
                ) :
                    (
                        <>
                            <Skeleton></Skeleton>
                            <Skeleton></Skeleton>
                            <Skeleton></Skeleton>
                            <Skeleton></Skeleton>
                        </>
                    )}



            </Modal>


        </Wraper>
    )
}

export default Home;


