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
          <title>Serverless Next.js Example - GitHub User Info</title>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0"
          />
          <meta
            name="description"
            content="Sample Next.js application using serverless component."
          />
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
