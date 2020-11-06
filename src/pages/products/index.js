import React from 'react'
import { graphql, Link } from 'gatsby'
import Slider from 'react-slick'
import styled from 'styled-components'
import Img from 'gatsby-image'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
}

export default props => {
    const { nodes } = props.data.allContentfulProduct
    console.log(nodes)
    return (
        <Products>
            {nodes.map(product => (
                <Article key={product.id}>
                    <Link to={'/products/' + product.slug}>
                        <Image>
                            <Slider {...settings}>
                                {product.images.map(image => (
                                    <Img key={image.fluid.src} fluid={image.fluid} />
                                ))}
                            </Slider>
                        </Image>
                        <Info>
                            <Title>{product.title}</Title>
                            <Price>${product.price}</Price>
                        </Info>
                    </Link>
                </Article>
            ))}
        </Products>
    )
}

const Products = styled.div`
    width: 94%;
    font-weight: 900;
    display: flex;
    margin: 20px auto;

    @media (max-width: 744px) {
        flex-direction: column;
    }
`
const Image = styled.div`
    & .gatsby-image-wrapper {
        height: 400px;
    }
`

const Info = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    margin-top: 20px;
`
const Price = styled.p`
    font-size: 14px;
    font-weight: 600;
    background: rebeccapurple;
    border-radius: 20px;
    padding: 2px 10px;
    color: white;
`

const Title = styled.p`
    font-size: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
`

const Article = styled.article`
    padding: 10px;
    width: calc(50% - 10px);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    //height: 200px;

    &:not(:last-of-type) {
        margin-right: 20px;
    }

    @media (max-width: 744px) {
        width: 100%;
        margin-bottom: 20px;
        margin-right: 0;
    }

    a {
        text-decoration: none;
    }
`

export const query = graphql`
    query MyQuery {
        allContentfulProduct(limit: 2, skip: 0) {
            nodes {
                price
                slug
                id
                title
                images {
                    fluid {
                        ...GatsbyContentfulFluid
                    }
                }
            }
            totalCount
            pageInfo {
                currentPage
                hasNextPage
                hasPreviousPage
                itemCount
                pageCount
                perPage
                totalCount
            }
        }
    }
`
