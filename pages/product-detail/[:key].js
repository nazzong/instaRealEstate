import React from "react";
import { withApollo } from "../../lib/apollo";
import MM02 from "../../src/Components/Routes/Client/MM02";
import ClientLayout from "../../src/Components/Routes/Layouts/ClientLayout";
import { NextSeo } from "next-seo";
import { rewritePath } from "../../src/proxy.ts";
import fetch from "isomorphic-unfetch";

const ProductDetail = ({ initialData }) => {
  return (
    <ClientLayout title={initialData.title}>
      <NextSeo
        title={`매물번호 ${initialData.productNo}`}
        description={initialData.title}
        openGraph={{
          title: `매물번호 ${initialData.productNo}`,
          description: initialData.title,
          url: initialData.url,
          images: [
            {
              url: initialData.detailImagePaths[0],
              width: 800,
              height: 420,
            },
          ],
        }}
      />

      <MM02 />
    </ClientLayout>
  );
};

ProductDetail.getInitialProps = async (ctx) => {
  const { req, query } = ctx;

  let url = "https://realinstar.com";
  let productData = {};

  if (req && query) {
    url = req.headers.referer;

    const api =
      process.env.NODE_ENV === `development`
        ? rewritePath(`/api/getProductDetail`, {
            "/api": "http://localhost:7006/api",
          })
        : rewritePath(`/api/getProductDetail`, {
            "/api": "http://222.239.251.8:7006/api",
          });

    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: query[":key"],
      }),
    });

    productData = await response.json();
  }

  return {
    initialData: {
      ...productData,
      url,
    },
  };
};

export default withApollo(ProductDetail);
