//frontmatter: {purpose: {eq: "page"}}
const pageQuery = `{
  pages: allMarkdownRemark(
    filter: {
      fileAbsolutePath: { regex: "/pages/" },
    }
  ) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
          slug
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`

const postQuery = `{
  posts: allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/posts/" } }
  ) {
    edges {
      node {
        objectID: id
        frontmatter {
          title
          slug
          date(formatString: "MMM D, YYYY")
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`

const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => flatten(data.pages.edges),
    indexName: `Pages`,
    settings,
  },
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `Posts`,
    settings,
  },
]
/*
// gatsby-config.js
const myQuery = `{
  allSitePage {
    edges {
      node {
        # try to find a unique id for each node
        # if this field is absent, it's going to
        # be inserted by Algolia automatically
        # and will be less simple to update etc.
        objectID: id
        component
        path
        componentChunkName
        internal {
          type
          contentDigest
          owner
        }
      }
    }
  }
}`;

const queries = [
  {
    query: myQuery,
    transformer: ({ data }) => data.allSitePage.edges.map(({ node }) => node), // optional
    //indexName: 'Pages', // overrides main index name, optional
    settings: {
      // optional, any index settings
    },
  },
];
*/
module.exports = queries