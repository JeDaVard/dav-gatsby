import React from 'react'
import styled from 'styled-components'

export default function DogTemplate({ pageContext: { dog } }) {
    return (
        <section>
            <Name>{dog.name}</Name> - {dog.breed}
        </section>
    )
}

const Name = styled.h1`
    color: rgb(129,163,65);
    display: inline-block;
    position: relative;

    &:hover {
        color: rebeccapurple;
    }

    &:after {
        content: '';
        background: orangered;
        width: 100%;
        height: 3px;
        left: 0;
        position: absolute;
        bottom: 0;
    }
`
