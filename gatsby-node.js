/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions

    const productData = await graphql(`
        {
            products: allContentfulProduct {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
    `)

    if (productData.error) {
        console.error(productData.error)
        return
    }

    productData.data.products.edges.forEach(product => {
        createPage({
            path: `/products/${product.node.slug}`,
            component: require.resolve(`./src/templates/product-template.js`),
            context: { slug: product.node.slug },
        })
    })
}
