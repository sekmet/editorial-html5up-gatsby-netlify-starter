require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
//const queries = require("./src/components/searchbox/queries")
const siteMetadata = require("./static/admin/site_metadata")
const ifShopify = process.env.GATSBY_SHOPIFY_ACCESS_TOKEN ? process.env.GATSBY_SHOPIFY_ACCESS_TOKEN : process.env.SHOPIFY_ACCESS_TOKEN

const GATSBY_CHECK_IF_PLUGIN_SHOPIFY2 = () => {


  if (ifShopify)
  return  {
    resolve: `gatsby-source-shopify2`,
    options: {
      // The domain name of your Shopify shop. This is required.
      // Example: 'gatsby-source-shopify-test-shop' if your Shopify address is
      // 'gatsby-source-shopify-test-shop.myshopify.com'.
      shopName: process.env.GATSBY_SHOP_NAME ? process.env.GATSBY_SHOP_NAME : process.env.SHOP_NAME,

      // An API access token to your Shopify shop. This is required.
      // You can generate an access token in the "Manage private apps" section
      // of your shop's Apps settings. In the Storefront API section, be sure
      // to select "Allow this app to access your storefront data using the
      // Storefront API".
      // See: https://help.shopify.com/api/custom-storefronts/storefront-api/getting-started#authentication
      accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN ? process.env.GATSBY_SHOPIFY_ACCESS_TOKEN : process.env.SHOPIFY_ACCESS_TOKEN,

      // Set verbose to true to display a verbose output on `npm run develop`
      // or `npm run build`. This prints which nodes are being fetched and how
      // much time was required to fetch and process the data.
      // Defaults to true.
      verbose: true,
    }
  }
  else
    return `gatsby-dummy`

}

/*
{
    title: `Gatsby Default Starter`,
    description: `This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@2600hz`,
    siteUrl: `https://editorial-html5up-gatsby.netlify.com/`,
  }
 */
module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/components/`,
        name: 'components',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts/`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/assets/`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
              wrapperStyle: 'margin-bottom: 1.0725rem;',
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-sass`,
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-twitter',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        description: 'Gatsby starter for a blog or store',
        homepage_url: 'https://editorial-html5up-gatsby.netlify.com',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#673ab7',
        display: 'standalone',
        crossOrigin: `use-credentials`,
        icons: [
          {
            src: '/img/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/img/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    // To learn more, visit: https://gatsby.dev/offline
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        cacheId: `editorial-theme-offline`
      }
    },
    GATSBY_CHECK_IF_PLUGIN_SHOPIFY2(),
    /*{
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        //indexName: process.env.ALGOLIA_INDEX_NAME,
        queries,
        chunkSize: 10000, // default: 1000
      },
    },*/
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: '',
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        mergeSecurityHeaders: true,
        mergeLinkHeaders: true,
        mergeCachingHeaders: true,
      },
    },
    `gatsby-plugin-netlify-cache`
  ],
}
