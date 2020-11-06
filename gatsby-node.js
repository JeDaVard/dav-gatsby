/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions

    const dogData = [
        {
            name: 'Fido',
            breed: 'Sheltie',
            path: 'fido',
        },
        {
            name: 'Sparky',
            breed: 'Corgi',
            path: 'sparky',
        },
    ]

    const productData = await graphql(`
        query GetProductSlugs {
            products: allContentfulProduct {
                nodes {
                    slug
                }
            }
        }
    `)

    productData.data.products.nodes.forEach(product => {
        createPage({
            path: `/products/${product.slug}`,
            component: require.resolve(`./src/templates/product-template.js`),
            context: { product: { slug: product.slug } },
        })
    })

    dogData.forEach(dog => {
        createPage({
            path: `/${dog.path}`,
            component: require.resolve(`./src/templates/dog-template.js`),
            context: { dog },
        })
    })
}
