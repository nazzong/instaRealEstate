import React from "react";
import { withApollo } from "../lib/apollo";
import MM01 from "../src/Components/Routes/Client/MM01";
import ClientLayout from "../src/Components/Routes/Layouts/ClientLayout";
import { NextSeo } from "next-seo";
import seoConfig from "../src/seo.config.json";

const Main = () => {
  return (
    <ClientLayout>
      <NextSeo
        title={seoConfig.title}
        subject={seoConfig.subject}
        author={seoConfig.author}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        openGraph={{
          type: seoConfig.openGraph.type,
          site_name: seoConfig.openGraph.site_name,
          title: seoConfig.openGraph.title,
          description: seoConfig.openGraph.description,
          keywords: seoConfig.openGraph.keywords,
          url: seoConfig.openGraph.url,
          images: [
            {
              url: seoConfig.openGraph.images[0].url,
              width: seoConfig.openGraph.images[0].width,
              height: seoConfig.openGraph.images[0].height,
            },
          ],
        }}
      />

      <MM01 />
    </ClientLayout>
  );
};

export default withApollo(Main);
