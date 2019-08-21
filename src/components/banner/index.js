import React from "react"
import { StaticQuery, graphql } from "gatsby"
import ManualBanner from "./manual"
import BlogBanner from "./blog"

const Banner = () => (
<StaticQuery
  query={graphql`
      query BannerQuery {
        allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "banner"}}}) {
          edges {
            node {
              id
              frontmatter {
                templateKey
                bannerImage {
                  src
                  alt
                }
                actions {
                  class
                  label
                  linkUrl
                }
                datasource
                header
                tagline
              }
            }
          }
        }
      }
    `}
  render={data => {

    const frontmatter = data.allMarkdownRemark.edges[0].node.frontmatter;

    if (frontmatter.datasource === "manual")
      return (<ManualBanner frontmatter={frontmatter}/>)

    if (frontmatter.datasource === "blog")
      return (<BlogBanner bannermatter={frontmatter}/>)

  }}
/>
)

export default Banner