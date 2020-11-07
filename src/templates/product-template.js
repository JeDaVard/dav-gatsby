import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Slider from 'react-slick'
import Img from 'gatsby-image'
import ReactMarkdown from 'react-markdown'

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
}

export const query = graphql`
    query Product($slug: String) {
        product: contentfulProduct(slug: { eq: $slug }) {
            id
            title
            price
            slug
            createdAt(formatString: "hh:mm DD MMM YYYY")
            images {
                fluid {
                    ...GatsbyContentfulFluid
                }
            }
            description {
                description
            }
        }
    }
`

export default function ProductTemplate({ data }) {
    return (
        <Container>
            <Product>
                <Image>
                    <Slider {...settings}>
                        {data.product.images.map(image => (
                            <Img key={image.fluid.src} fluid={image.fluid} />
                        ))}
                    </Slider>
                </Image>
                <Info>
                    <Title>{data.product.title}</Title>
                    <Date>{data.product.createdAt}</Date>
                    <Price>${data.product.price}</Price>
                    <Description>
                        <ReactMarkdown source={data.product.description.description} />
                    </Description>
                </Info>
            </Product>
            <Link to={'/products'}>&larr; Back</Link>
        </Container>
    )
}

const Container = styled.section`
    margin-top: 30px;
    padding: 0 40px;
    @media (max-width: 744px) {
        margin-top: 0;
        padding: 0;
    }
`
const Product = styled.div`
    display: flex;
    margin-bottom: 40px;
    @media (max-width: 744px) {
        flex-direction: column;
    }
`
const Image = styled.div`
    width: 50%;
    @media (max-width: 744px) {
        width: 100%;
    }
    & .gatsby-image-wrapper {
        height: 400px;
    }
`
const Info = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 0 3%;
    width: 50%;
    @media (max-width: 744px) {
        margin-top: 40px;
        width: 100%;
    }
`

const Date = styled.p`
    font-size: 12px;
    color: rgba(0, 0, 0, 0.4);
`

const Title = styled.p`
    font-size: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
`

const Price = styled.p`
    font-size: 14px;
    font-weight: 600;
    background: rebeccapurple;
    border-radius: 20px;
    padding: 2px 10px;
    color: white;
`
const Description = styled.div`
    width: 100%;
    font-size: 15px;
`
