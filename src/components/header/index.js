import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { StaticQuery, graphql } from "gatsby"

const Header = ({ siteMetadata }) => (
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "header"}}}) {
          edges {
            node {
              id
              frontmatter {
                social{
                  label
                  class
                  linkUrl
                }
                templateKey
              }
            }
          }
        }
      }
    `}
    render={data => {

      const social = data.allMarkdownRemark.edges[0].node.frontmatter.social

      return (
        <header id="header">
          <Link
            to="/"
            className="logo"
          >
            <strong>{siteMetadata.title}</strong> {siteMetadata.by}
          </Link>
          <ul className="icons">
            {social.map((litem, lidx) => {
              return (
                <li key={lidx}><Link to={litem.linkUrl} className={litem.class}><span className="label">{litem.label}</span></Link></li>
              )})}
            {/*<li><Link to="/" className="icon brands fa-twitter"><span className="label">Twitter</span></Link></li>
            <li><Link to="/" className="icon brands fa-facebook-f"><span className="label">Facebook</span></Link></li>
            <li><Link to="/" className="icon brands fa-snapchat-ghost"><span className="label">Snapchat</span></Link></li>
            <li><Link to="/" className="icon brands fa-instagram"><span className="label">Instagram</span></Link></li>
            <li><Link to="/" className="icon brands fa-medium-m"><span className="label">Medium</span></Link></li>*/}
          </ul>
        </header>
      )
    }}
  />
)


Header.propTypes = {
  siteMetadata: PropTypes.object,
}

Header.defaultProps = {
  siteMetadata: {},
}

export default Header
