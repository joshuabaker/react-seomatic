import React from 'react';
import Head from 'next/head';

/**
 * Renders SEOmatic data for a Next.js app.
 * @param {Object|null} metaJsonLdContainer
 * @param {Object|null} metaLinkContainer
 * @param {Object|null} metaScriptContainer
 * @param {Object|null} metaTagContainer
 * @param {Object|null} metaTitleContainer
 * @returns {JSX.Element}
 * @constructor
 */
function Seomatic({
  metaJsonLdContainer,
  metaLinkContainer,
  metaScriptContainer,
  metaTagContainer,
  metaTitleContainer,
}) {
  return (
    <>
      <SeomaticMetaJsonLdContainer metaJsonLdContainer={metaJsonLdContainer} />
      <SeomaticMetaLinkContainer metaLinkContainer={metaLinkContainer} />
      <SeomaticMetaScriptContainer metaScriptContainer={metaScriptContainer} />
      <SeomaticMetaTagContainer metaTagContainer={metaTagContainer} />
      <SeomaticMetaTitleContainer metaTitleContainer={metaTitleContainer} />
    </>
  );
}

/**
 * Renders SEOmatic’s `metaJsonLdContainer` value.
 * @param {Object|null} metaJsonLdContainer
 * @returns {JSX.Element|null}
 * @constructor
 */
function SeomaticMetaJsonLdContainer({ metaJsonLdContainer }) {
  if (!metaJsonLdContainer) {
    return null;
  }

  const container = JSON.parse(metaJsonLdContainer);

  if (!container.mainEntityOfPage) {
    return null;
  }

  return (
    <Head>
      <script
        key={'metaJsonLdContainer.mainEntityOfPage'}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(container.mainEntityOfPage),
        }}
      />
    </Head>
  );
}

/**
 * Renders SEOmatic’s `metaLinkContainer` value.
 * @param {Object|null} metaLinkContainer
 * @returns {JSX.Element|null}
 * @constructor
 */
function SeomaticMetaLinkContainer({ metaLinkContainer }) {
  if (!metaLinkContainer) {
    return null;
  }

  return (
    <Head>
      <ContainerLinkTags container={JSON.parse(metaLinkContainer)} />
    </Head>
  );
}

/**
 * Renders SEOmatic’s `metaScriptContainer` value.
 * @param {Object|null} metaScriptContainer
 * @returns {unknown[]|null}
 * @constructor
 */
function SeomaticMetaScriptContainer({ metaScriptContainer }) {
  if (!metaScriptContainer) {
    return null;
  }

  const container = JSON.parse(metaScriptContainer);

  return Object.entries(container).map((entry) => {
    if (!entry[0] || !entry[1]) {
      return null;
    }

    const key = entry[0];
    const { script, bodyScript } = entry[1];

    return (
      <>
        {script && (
          <Head>
            <script key={key} dangerouslySetInnerHTML={{ __html: script }} />
          </Head>
        )}
        {bodyScript && (
          <div
            key={key}
            style={{ display: 'none !important' }}
            dangerouslySetInnerHTML={{
              __html: bodyScript,
            }}
          />
        )}
      </>
    );
  });
}

/**
 * Renders SEOmatic’s `metaTagContainer` value.
 * @param {Object|null} metaTagContainer
 * @returns {JSX.Element|null}
 * @constructor
 */
function SeomaticMetaTagContainer({ metaTagContainer }) {
  if (!metaTagContainer) {
    return null;
  }

  return (
    <Head>
      <ContainerLinkTags container={JSON.parse(metaTagContainer)} />
    </Head>
  );
}

/**
 * Renders SEOmatic’s `metaTitleContainer` value.
 * @param {Object|null} metaTitleContainer
 * @returns {JSX.Element|null}
 * @constructor
 */
function SeomaticMetaTitleContainer({ metaTitleContainer }) {
  if (!metaTitleContainer) {
    return null;
  }

  const { title } = JSON.parse(metaTitleContainer);

  if (!title || !title.title) {
    return null;
  }

  return (
    <Head>
      <title key={'title'}>{title.title}</title>
    </Head>
  );
}

/**
 * Renders a container object as `link` tags.
 * @param {Object} container
 * @returns {JSX.Element[]}
 * @constructor
 */
function ContainerLinkTags({ container }) {
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
    .map((props) => props && <link {...props} />);
}

export {
  SeomaticMetaJsonLdContainer,
  SeomaticMetaLinkContainer,
  SeomaticMetaScriptContainer,
  SeomaticMetaTagContainer,
  SeomaticMetaTitleContainer,
};

export default Seomatic;
