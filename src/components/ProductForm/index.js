import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import StoreContext from '../../context/StoreContext'
import VariantSelector from './VariantSelector'
import ShopifyBuyButton from '../../components/common/buybutton'

const ProductForm = props => {
  const [quantity, setQuantity] = useState(1)
  const [variant, setVariant] = useState(props.product.variants[0])
  const context = useContext(StoreContext)
  
  const hasVariants = props.product.variants.length > 1
  const productVariant =
  context.client.product.helpers.variantForOptions(props.product, variant) ||
  variant
  const [available, setAvailable] = useState(productVariant.availableForSale)

  useEffect(() => {
    let defaultOptionValues = {}
    props.product.options.forEach(selector => {
      defaultOptionValues[selector.name] = selector.values[0]
    })
    setVariant(defaultOptionValues)
  }, [])

  useEffect(() => {
    checkAvailability(props.product.shopifyId)
  }, [productVariant])

  const checkAvailability = productId => {
    context.client.product.fetch(productId).then((product) => {
      // this checks the currently selected variant for availability
      const result = product.variants.filter(
        variant => variant.id === productVariant.shopifyId
      )
      setAvailable(result[0].available)
    })
  }
 
  const handleQuantityChange = event => {
    setQuantity(event.target.value)
  }

  const handleOptionChange = event => {
    const { target } = event
    setVariant(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  /*const handleAddToCart = () => {
    context.addVariantToCart(productVariant.shopifyId, quantity)
  }*/

  const variantSelectors = hasVariants
    ? props.product.options.map(option => {
        return (
          <VariantSelector
            onChange={handleOptionChange}
            key={option.id.toString()}
            option={option}
          />
        )
      })
    : null

  return (
    <>
      <h3>R${productVariant.price}</h3>
      {variantSelectors}
      <div className="row aln-bottom">
        <div className="col-7">
          <label htmlFor="quantity">Quantity </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            step="1"
            onChange={handleQuantityChange}
            value={quantity}
          />
        </div>
        <div className="col-4">
          <ShopifyBuyButton productId={props.product.id} disabled={!available} />
          {/*<button className="button primary icon solid fa-cart-plus" type="submit" disabled={!available} onClick={handleAddToCart}>
            Add to Cart
          </button>*/}
          {!available && <p>This Product is out of Stock!</p>}
        </div>
      </div>
    </>
  )
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string,
    descriptionHtml: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    shopifyId: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        originalSrc: PropTypes.string,
      })
    ),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    productType: PropTypes.string,
    title: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        availableForSale: PropTypes.bool,
        id: PropTypes.string,
        price: PropTypes.string,
        title: PropTypes.string,
        shopifyId: PropTypes.string,
        selectedOptions: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string,
          })
        ),
      })
    ),
  }),
  addVariantToCart: PropTypes.func,
}

export default ProductForm
