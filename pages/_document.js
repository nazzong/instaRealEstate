import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const styledComponentsSheet = new ServerStyleSheet();
    const materialSheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentsSheet.collectStyles(
              materialSheets.collect(<App {...props} />)
            ),
        });
      const initialProps = await Document.getInitialProps(ctx);

      const userAgent = ctx.req
        ? ctx.req.headers["user-agent"]
        : navigator.userAgent;

      return {
        ...initialProps,
        userAgent,
        styles: (
          <React.Fragment>
            {initialProps.head}
            {initialProps.styles}
            {materialSheets.getStyleElement()}
            {styledComponentsSheet.getStyleElement()}
          </React.Fragment>
        ),
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>

          {this.props.userAgent.match(`iphone`) ? (
            <link rel="apple-touch-icon" href="/app-icon-114x114.png" />
          ) : this.props.userAgent.match(`ipad`) ? (
            <link
              rel="apple-touch-icon"
              sizes="72*72"
              href="/app-icon-72x72.png"
            />
          ) : this.props.userAgent.match(`ipod`) ? (
            <link rel="apple-touch-icon" href="/app-icon-114x114.png" />
          ) : this.props.userAgent.match(`android`) ? (
            <link rel="shortcut icon" href="/favicon.ico" />
          ) : null}

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.7.2/flexslider.min.css"
          />

          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/flexslider/2.7.2/jquery.flexslider-min.js"></script>
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
