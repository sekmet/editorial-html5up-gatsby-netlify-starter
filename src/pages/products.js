import React from "react"
//import { Link } from "gatsby"

//import Banner from "../components/banner/"
//import Features from "../components/features/"
//import Articles from "../components/articles/"
import ProductGrid from '../components/products'
//import Image from "../components/image"
import SEO from "../components/seo"

const isShopify = process.env.GATSBY_SHOPIFY_ACCESS_TOKEN ? process.env.GATSBY_SHOPIFY_ACCESS_TOKEN : process.env.SHOPIFY_ACCESS_TOKEN

const ProductsPage = () => (
  <>
    <SEO title="Home" />

    {/* Banner
    <Banner />*/}

    {/* Section
    <Features />*/}

    {/* Section
    <Articles />*/}

    {isShopify ? <ProductGrid /> : ''}

  </>
)

export default ProductsPage
