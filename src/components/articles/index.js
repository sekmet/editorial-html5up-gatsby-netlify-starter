import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import FeaturedImage from "./featuredImage"

const Articles = () => (
<StaticQuery
  query={graphql`
      query ArticlesQuery {
        allMarkdownRemark(filter: {frontmatter: {layout: {eq: "post"}}}, sort: {fields: frontmatter___date, order: DESC}) {
          edges {
            node {
              id
              frontmatter {
                title
                date
                templateKey
                tagline
                category
                editorpick
                description
                featuredImage {
                  alt
                  src
                }
                layout
                path
              }
            }
          }
        }
      }
    `}
  render={data => {

    const nodes = data.allMarkdownRemark.edges
    //const frontmatter = nodeitem.frontmatter

      return (
        <section>
          <header className="major">
            <h2>Ipsum sed dolor</h2>
          </header>
          <div className="posts">
            {nodes.map((nodeitem) => {
              return (
                <article key={nodeitem.node.id}>
                  <Link to={nodeitem.node.frontmatter.path} className="image">
                    {nodeitem.node.frontmatter.featuredImage ? <FeaturedImage alt={nodeitem.node.frontmatter.featuredImage.alt} filename={nodeitem.node.frontmatter.featuredImage.src} /> : <img src="/assets/pic01.jpg" alt="Gatsby in Space" />}
                  </Link>
                  <h3>{nodeitem.node.frontmatter.title}</h3>
                  <p>{nodeitem.node.frontmatter.description}</p>
                  <ul className="actions">
                    <li><Link to={nodeitem.node.frontmatter.path} className="button">More</Link></li>
                  </ul>
                </article>
              )})}

            {/*<article>
              <Link to="/" className="image"><img src="/assets/pic02.jpg" alt="" /></Link>
              <h3>Nulla amet dolore</h3>
              <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p>
              <ul className="actions">
                <li><Link to="/" className="button">More</Link></li>
              </ul>
            </article>
            <article>
              <Link to="/" className="image"><img src="/assets/pic03.jpg" alt="" /></Link>
              <h3>Tempus ullamcorper</h3>
              <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p>
              <ul className="actions">
                <li><Link to="/" className="button">More</Link></li>
              </ul>
            </article>
            <article>
              <Link to="/" className="image"><img src="/assets/pic04.jpg" alt="" /></Link>
              <h3>Sed etiam facilis</h3>
              <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p>
              <ul className="actions">
                <li><Link to="/" className="button">More</Link></li>
              </ul>
            </article>
            <article>
              <Link to="/" className="image"><img src="/assets/pic05.jpg" alt="" /></Link>
              <h3>Feugiat lorem aenean</h3>
              <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p>
              <ul className="actions">
                <li><Link to="/" className="button">More</Link></li>
              </ul>
            </article>
            <article>
              <Link to="/" className="image"><img src="/assets/pic06.jpg" alt="" /></Link>
              <h3>Amet varius aliquam</h3>
              <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p>
              <ul className="actions">
                <li><Link to="/" className="button">More</Link></li>
              </ul>
            </article>*/}
          </div>
        </section>
      )
  }}
/>
)

export default Articles