import React from 'react'
import { useStaticQuery,  graphql, Link } from 'gatsby'
//import { Flex, Box } from '@rebass/grid/emotion'

import Image from 'gatsby-image'

//import { Img } from '../../utils/styles'
//const ifShopify = process.env.GATSBY_SHOPIFY_ACCESS_TOKEN ? process.env.GATSBY_SHOPIFY_ACCESS_TOKEN : process.env.SHOPIFY_ACCESS_TOKEN

const ProductGrid = () => {

  //const data = false

  const data = useStaticQuery(
    graphql`
      query {
        allShopifyProduct(
          sort: {
            fields: [createdAt]
            order: DESC
          }
        ) {
          edges {
            node {
              id
              title
              description  
              handle
              createdAt
              images {
                id
                originalSrc
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 416, maxHeight: 256) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
              variants {
                price
              }
              tags
            }
          }
        }
      }
    `
  )

  return (
      <section>
          <header className="major">
              <h2>My Shopify Products</h2>
          </header>
          <div className="posts">
            {data.allShopifyProduct.edges.map(x => (
            <article key={x.node.id}>
              <Link to={`/product/${x.node.handle}/`} className="image">
                <Image
                  fluid={x.node.images[0].localFile.childImageSharp.fluid}
                  alt={x.node.handle}
                />
              </Link>
              <h3>{x.node.title}</h3>
              <h4>R${x.node.variants[0].price}</h4>
              <p>{x.node.description.substr(0,111)}...</p>
              <ul className="actions">
                <li><Link to={`/product/${x.node.handle}/`} className="button">Learn More</Link></li>
              </ul>
            </article>
            ))}
          </div>
      </section>
  )
}


export default ProductGrid
