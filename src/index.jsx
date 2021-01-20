import React from "react";

/**
 * Renders SEOmatic `<head>` and `<body>` tags.
 *
 * @example
 * <body>
 *   <!-- ... -->
 *   <Seomatic {...pageProps.entry.seomatic} />
 * </body>
 *
 * @example
 * // Next.js
 * <body>
 *   <!-- ... -->
 *   <Seomatic Head={Head} {...pageProps.entry.seomatic} />
 * </body>
 *
 * @param {Class|function|null} Head
 * @param {string|null} metaJsonLdContainer
 * @param {string|null} metaLinkContainer
 * @param {string|null} metaScriptContainer
 * @param {string|null} metaTagContainer
 * @param {string|null} metaTitleContainer
 * @returns {JSX.Element}
 * @constructor
 */
function Seomatic({
  Head,
  metaJsonLdContainer,
  metaLinkContainer,
  metaScriptContainer,
  metaTagContainer,
  metaTitleContainer,
}) {
  return (
    <>
      <SeomaticHead
        Head={Head}
        metaJsonLdContainer={metaJsonLdContainer}
        metaLinkContainer={metaLinkContainer}
        metaScriptContainer={metaScriptContainer}
        metaTagContainer={metaTagContainer}
        metaTitleContainer={metaTitleContainer}
      />
      <SeomaticBody metaScriptContainer={metaScriptContainer} />
    </>
  );
}

/**
 * Renders SEOmatic `<head>` tags.
 *
 * @example
 * <head>
 *   <SeomaticHead {...pageProps.entry.seomatic} />
 * </head>
 *
 * @example
 * // Next.js
 * <SeomaticHead Head={Head} {...pageProps.entry.seomatic} />
 *
 * @param {Class|function|null} Head
 * @param {string|null} metaJsonLdContainer
 * @param {string|null} metaLinkContainer
 * @param {string|null} metaScriptContainer
 * @param {string|null} metaTagContainer
 * @param {string|null} metaTitleContainer
 * @returns {JSX.Element}
 * @constructor
 */
function SeomaticHead({
  Head,
  metaJsonLdContainer,
  metaLinkContainer,
  metaScriptContainer,
  metaTagContainer,
  metaTitleContainer,
}) {
  return (
    <>
      <SeomaticMetaJsonLd
        Head={Head}
        metaJsonLdContainer={metaJsonLdContainer}
      />
      <SeomaticMetaLinks Head={Head} metaLinkContainer={metaLinkContainer} />
      <SeomaticMetaScripts
        Head={Head}
        metaScriptContainer={metaScriptContainer}
      />
      <SeomaticMetaTags Head={Head} metaTagContainer={metaTagContainer} />
      <SeomaticMetaTitle Head={Head} metaTitleContainer={metaTitleContainer} />
    </>
  );
}

/**
 * Renders SEOmatic `<body>` tags.
 *
 * @example
 * <body>
 *   <!-- ... -->
 *   <SeomaticBody {...pageProps.entry.seomatic} />
 * </body>
 *
 * @param {string|null} metaScriptContainer
 * @returns {JSX.Element}
 * @constructor
 */
function SeomaticBody({ metaScriptContainer }) {
  return <SeomaticMetaBodyScripts metaScriptContainer={metaScriptContainer} />;
}

/**
 * Renders SEOmatic’s `metaJsonLdContainer` value.
 * @param {Class|function|null} Head
 * @param {string|null} metaJsonLdContainer
 * @returns {JSX.Element|null}
 * @constructor
 */
function SeomaticMetaJsonLd({ Head, metaJsonLdContainer }) {
  if (!metaJsonLdContainer) {
    return null;
  }

  const container = JSON.parse(metaJsonLdContainer);

  if (!container.mainEntityOfPage) {
    return null;
  }

  return (
    <HeadWrapper Head={Head}>
      <script
        key={"metaJsonLdContainer.mainEntityOfPage"}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(container.mainEntityOfPage),
        }}
      />
    </HeadWrapper>
  );
}

/**
 * Renders SEOmatic’s `metaLinkContainer` value.
 * @param {Class|function|null} Head
 * @param {string|null} metaLinkContainer
 * @returns {JSX.Element|null}
 * @constructor
 */
function SeomaticMetaLinks({ Head, metaLinkContainer }) {
  if (!metaLinkContainer) {
    return null;
  }

  return (
    <HeadTagsWrapper
      container={JSON.parse(metaLinkContainer)}
      Head={Head}
      type={"link"}
    />
  );
}

/**
 * Renders SEOmatic’s `metaScriptContainer` value.
 * @param {Class|function|null} Head
 * @param {string|null} metaScriptContainer
 * @returns {JSX.Element[]|null}
 * @constructor
 */
function SeomaticMetaScripts({ Head, metaScriptContainer }) {
  if (!metaScriptContainer) {
    return null;
  }

  const container = JSON.parse(metaScriptContainer);

  return Object.entries(container).map((entry, index) => {
    if (!entry[0] || !entry[1]) {
      return null;
    }

    const key = entry[0];
    const { script } = entry[1];

    if (!script) {
      return null;
    }

    return (
      <HeadWrapper key={index} Head={Head}>
        <script key={key} dangerouslySetInnerHTML={{ __html: script }} />
      </HeadWrapper>
    );
  });
}

/**
 * Renders SEOmatic’s `metaScriptContainer` value.
 * @param {string|null} metaScriptContainer
 * @returns {JSX.Element[]|null}
 * @constructor
 */
function SeomaticMetaBodyScripts({ metaScriptContainer }) {
  if (!metaScriptContainer) {
    return null;
  }

  const container = JSON.parse(metaScriptContainer);

  return Object.entries(container).map((entry) => {
    if (!entry[0] || !entry[1]) {
      return null;
    }

    const key = entry[0];
    const { bodyScript } = entry[1];

    if (!bodyScript) {
      return null;
    }

    return (
      <div
        key={key}
        style={{ display: "none !important" }}
        dangerouslySetInnerHTML={{
          __html: bodyScript,
        }}
      />
    );
  });
}

/**
 * Renders SEOmatic’s `metaTagContainer` value.
 * @param {Class|function|null} Head
 * @param {string|null} metaTagContainer
 * @returns {JSX.Element|null}
 * @constructor
 */
function SeomaticMetaTags({ Head, metaTagContainer }) {
  if (!metaTagContainer) {
    return null;
  }

  return (
    <HeadTagsWrapper
      container={JSON.parse(metaTagContainer)}
      Head={Head}
      type={"meta"}
    />
  );
}

/**
 * Renders SEOmatic’s `metaTitleContainer` value.
 * @param {Class|function|null} Head
 * @param {string|null} metaTitleContainer
 * @returns {JSX.Element|null}
 * @constructor
 */
function SeomaticMetaTitle({ Head, metaTitleContainer }) {
  if (!metaTitleContainer) {
    return null;
  }

  const container = JSON.parse(metaTitleContainer);

  if (!container || !container.title || !container.title.title) {
    return null;
  }

  return (
    <HeadWrapper Head={Head}>
      <title>{container.title.title}</title>
    </HeadWrapper>
  );
}

/**
 * Enables support for `next/head` via the `Head` property.
 * @param children
 * @param Head
 * @param props
 * @returns {JSX.Element|*}
 * @constructor
 */
function HeadWrapper({ children, Head, ...props }) {
  if (Head) {
    return <Head {...props}>{children}</Head>;
  }

  return children;
}

/**
 * Parses a container object and renders out head tags (i.e. `link` or `meta`).
 * @param {Class|function|null} Head
 * @param {Object} container
 * @param string|null type
 * @returns {Object[]}
 * @constructor
 */
function HeadTagsWrapper({ Head, container, type }) {
  return Object.entries(container)
    .flatMap((entry) => {
      const key = entry[0];
      const props = entry[1];

      // Check that we actually have values before proceeding
      if (!key && !props) {
        return null;
      }

      // If `props` isn’t an array we can assume it’s an object
      if (!Array.isArray(props)) {
        return {
          key,
          ...props,
        };
      }

      // If `props` is an array, make sure that there’s at least 1 to process
      if (props.length === 0) {
        return null;
      }

      // Loop through and create index suffixed keys for each
      return props.map((props, index) => {
        return {
          key: `${key}${index}`,
          ...props,
        };
      });
    })
    .map(
      (props, index) =>
        props && (
          <HeadWrapper key={index} Head={Head}>
            {React.createElement(type, props)}
          </HeadWrapper>
        )
    );
}

export {
  Seomatic,
  SeomaticBody,
  SeomaticHead,
  SeomaticMetaBodyScripts,
  SeomaticMetaJsonLd,
  SeomaticMetaLinks,
  SeomaticMetaScripts,
  SeomaticMetaTags,
  SeomaticMetaTitle,
};
