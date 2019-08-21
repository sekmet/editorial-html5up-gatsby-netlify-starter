import { Link } from "gatsby"
import React from "react"
import { StaticQuery, graphql } from "gatsby"

const Latest = () => (
  <StaticQuery
    query={graphql`
      query LatestQuery {
        allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "latest"}}}) {
          edges {
            node {
              id
              frontmatter {
                templateKey
                title
                datasource
                items {
                  tagline
                  class
                  linkUrl
                  image {
                    image
                    imageAlt
                  }
                }
                 action {
                  class
                  label
                  linkUrl
                }
              }
            }
          }
        }
      }
    `}
    render={data => {

      const latest = data.allMarkdownRemark.edges[0].node.frontmatter

      return (
        <section>
          <header className="major">
            <h2>{latest.title}</h2>
          </header>
          <div className="mini-posts">
            {latest.items.map((litem, lidx) => {
              return (
                <article key={lidx}>
                  <Link to={litem.linkUrl} className={litem.class}><img src={litem.image.image} alt={litem.image.imageAlt} /></Link>
                  <p>{litem.tagline}</p>
                </article>
              )})}
          </div>
          {latest.action ?
            <ul className="actions">
              <li><Link to={latest.action.linkUrl} className={latest.action.class}>{latest.action.label}</Link></li>
            </ul> : ''}
        </section>
      )
    }}
  />
)

export default Latest
