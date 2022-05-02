import React from "react";
import { withApollo } from "../lib/apollo";
import MM05 from "../src/Components/Routes/Client/MM05";
import ClientLayout from "../src/Components/Routes/Layouts/ClientLayout";
import { NextSeo } from "next-seo";
import seoConfig from "../src/seo.config.json";

const Search = () => {
  return (
    <ClientLayout title={`검색 | 인스타부동산`}>
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

      <MM05 />
    </ClientLayout>
  );
};

export default withApollo(Search);
