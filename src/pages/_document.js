import { extractCritical } from "emotion-server";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = extractCritical(page.html);
    return { ...page, ...styles };
  }

  render() {
    return (
      <Html dir="ltr" lang="pt-br">
        <Head>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0"
          />
          <meta
            name="description"
            content="Sample Next.js application using serverless component."
          />
          <link rel="manifest" href="/manifest.json" />
          <link
            href="/images/icons/favicon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/images/icons/favicon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link rel="apple-touch-icon" href="/images/icons/apple-icon-180x180.png"></link>
          <meta name="theme-color" content="#3d5a71" />
          <style
            data-emotion-css={this.props.ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
