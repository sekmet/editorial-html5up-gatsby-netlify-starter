import React from "react"
import { StaticQuery, graphql } from 'gatsby';
import { Link } from "gatsby"
import ReactMarkdown from "react-markdown"
import FeaturedImage from "./featuredImage"

const randomIntFromInterval = (min, max) => { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const BlogBanner = ({bannermatter}) => (
  <StaticQuery
    query={graphql`
      query BlogBannerQuery {
        allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/posts/"}, frontmatter: {editorpick: {eq: "yes"}}}) {
          edges {
            node {
              id
              frontmatter {
                bannerImage: featuredImage {
                  src
                  alt
                }
                linkUrl: path
                header: title
                tagline: description
                editorpick
              }
            }
          }
          totalCount
        }
      }
    `}
    render={data => {

      var randFeatured = data ? randomIntFromInterval(0,data.allMarkdownRemark.totalCount-1) : 0
      const frontmatter = data.allMarkdownRemark.edges[randFeatured].node.frontmatter

      return (
        <section id="banner">
          <div className="content">
            <header>
              <ReactMarkdown source={`# ${frontmatter.header}`}/>
            </header>

            <ReactMarkdown source={frontmatter.tagline}/>

            <ul className="actions">
              <li><Link to={frontmatter.linkUrl}
                        className={bannermatter.actions[0].class}>
                {bannermatter.actions[0].label}
              </Link></li>
            </ul>
          </div>
          <span className="image object">
              {frontmatter.bannerImage ?
                <FeaturedImage alt={frontmatter.bannerImage.alt} filename={frontmatter.bannerImage.src}/> :
                <img src="/assets/pic04.jpg" alt="Gatsby in Space"/>}
          </span>
        </section>
      )
    }}
  />
)


export default BlogBanner