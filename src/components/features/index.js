import { Link } from "gatsby"
import React from "react"
import { StaticQuery, graphql } from "gatsby"

const Features = () => (
  <StaticQuery
    query={graphql`
      query FeaturesQuery {
        allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "features"}}}) {
          edges {
            node {
              id
              frontmatter {
                templateKey
                title
                features {
                  class
                  title
                  tagline
                  link {
                    class
                    label
                    linkUrl
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => {

      const features = data.allMarkdownRemark.edges[0].node.frontmatter.features

      return (
        <section>
          <header className="major">
            <h2>{data.allMarkdownRemark.edges[0].node.frontmatter.title}</h2>
          </header>
          <div className="features">
          {features.map((featureitem, featureidx) => {
            return (
              <article key={featureidx}>
                <span className={featureitem.class}></span>
                <div className="content">
                  <h3>{featureitem.title}</h3>
                  <p>{featureitem.tagline}</p>
                  {featureitem.link ? <Link to={featureitem.link.linkUrl} className={featureitem.link.class}>{featureitem.link.label}</Link> : ''}
                </div>
              </article>
            )})}
          </div>
        </section>
    )

    }}
  />
)

export default Features