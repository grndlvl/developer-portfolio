// @flow strict

// Renders a schema.org JSON-LD <script> for AI/search engines. Server
// component -- safe to place in the layout or any page's tree.
function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default JsonLd;
