import React from "react"
//import { Link } from "gatsby"

import Banner from "../components/banner/"
import Features from "../components/features/"
import Articles from "../components/articles/"
//import Image from "../components/image"
import SEO from "../components/seo"

const PostsPage = () => (
  <>
    <SEO title="Blog Posts" />

    {/* Banner*/}
    <Banner />

    {/* Section */}
    <Features />

    {/* Section*/}
    <Articles />


  </>
)

export default PostsPage
