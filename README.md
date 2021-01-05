# React SEOmatic

React helper components for Craft’s [SEOmatic plugin](https://plugins.craftcms.com/seomatic).

## Install

```
npm i react-seomatic
```

## Usage

These components expect array from the GraphQL response (i.e. the `asArray` set to `true`). Please see the [Headless SPA API documentation](https://nystudio107.com/docs/seomatic/Advanced.html#headless-spa-api) for how to use this.

### GraphQL example

```graphql
{
  #                   ↓  ↓  ↓  ↓  ↓
  seomatic (uri: "/", asArray: true) {
      metaTitleContainer
      metaTagContainer
      metaLinkContainer
      metaScriptContainer
      metaJsonLdContainer
      metaSiteVarsContainer
  }
}
```

### Simple example

For most use cases, it’s recommended to just pass the containers directly into the `Seomatic` component as properties.

```jsx
return (
  <body>
    {/* … */}
    <Seomatic {...entry.seomatic} />
  </body>
)
```

### Next.js

When using Next.js the `Head` property is required, otherwise the tags won’t be correctly picked up on client-side navigations. See the [`next/head` documentation](https://nextjs.org/docs/api-reference/next/head) for further information on this.

```jsx
import Head from 'next/head';

function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Seomatic Head={Head} {...pageProps.entry.seomatic} />
    </>
  )
}
```

### Components

The library’s built up of several components that allow flexibility and control where needed.
