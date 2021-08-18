import React from 'react';

import styled from 'styled-components';

const Card = styled.div`
    display: flex;
    justify-content: center;
    width: 90px;
    height: 90px;
    border-radius: 6px;
    background-image:url(${(props) => props.photo});
    background-size:cover;
`;
const Title = styled.span`
    font-family: ${(props) => props.theme.fonts.regular};
    font-size:16px;
    color: white;
    margin-top: 10px;
`;
export default function ImageCard({ photo, title }) {
    // Aqui não funcionou corretamente o Skeleton.Aqui.. 
    // e por falta de necessidade, deixei de lado :)

    return (
        <>

            <Card photo={photo} >
                <Title>{title}</Title>
            </Card>
        </>
    )
}