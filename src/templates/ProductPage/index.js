import React from 'react'
import { graphql } from 'gatsby'
//import { Flex, Box } from '@rebass/grid/emotion'

import ProductForm from '../../components/ProductForm'
//import { Img } from '../../utils/styles'
import Image from 'gatsby-image'

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  return (
    <>
    <section id="banner">
      <div className="content">
        <header>
          <h1>{product.title}</h1>
        </header>
        {/*<p>{product.description}</p>*/}
        <ProductForm product={product} />
        {/*<ul className="actions">
          <li><Link to="/" className="button big">Learn More</Link></li>
        </ul>*/}
      </div>
      <span className="image object">
        {product.images.map(x => (
          <Image
            fluid={x.localFile.childImageSharp.fluid}
            key={x.id}
            alt={product.title}
          />
        ))}
      </span>
    </section>

    <div className="row">
      <div className="col-12">
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
      </div>
    </div>
      </>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description  
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 600, maxHeight: 450) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default ProductPage
