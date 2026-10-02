import axios from "axios";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  truncateMeta,
  type DynamicSeoProps,
} from "@/contants/seo";

export async function fetchProductForSeo(id: string): Promise<any | null> {
  const base = process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL;
  if (!base || !id) return null;

  try {
    const res = await axios.get(`${base}/public-product/${id}`, {
      params: { lang: "en" },
      timeout: 8000,
    });
    return res.data;
  } catch {
    return null;
  }
}

export function buildProductSeo(
  product: any | null,
  slug: string,
  basePath: "/product" | "/new-product"
): DynamicSeoProps {
  const path = `${basePath}/${encodeURIComponent(slug)}`;
  const name =
    product?.name ||
    product?.productName ||
    product?.title ||
    `Product ${slug}`;
  const rawDescription =
    product?.description ||
    product?.shortDescription ||
    product?.metaDescription ||
    DEFAULT_DESCRIPTION;
  const imagePath = product?.image || product?.images?.[0];
  const s3Base = process.env.NEXT_PUBLIC_S3_BASE_URL;
  const image = imagePath
    ? String(imagePath).startsWith("http")
      ? String(imagePath)
      : s3Base
        ? `${s3Base}/${imagePath}`.replace(/([^:]\/)\/+/g, "$1")
        : DEFAULT_OG_IMAGE
    : DEFAULT_OG_IMAGE;

  const jsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        description: truncateMeta(rawDescription, 300),
        image,
        brand: {
          "@type": "Brand",
          name: SITE_NAME,
        },
        offers: product?.price
          ? {
              "@type": "Offer",
              priceCurrency: product?.currency || "AED",
              price: product.price,
              availability: "https://schema.org/InStock",
            }
          : undefined,
      }
    : undefined;

  return {
    title: `${name} | ${SITE_NAME}`,
    description: truncateMeta(String(rawDescription)),
    path,
    noindex: false,
    ogType: "website",
    image: image && image !== "/" ? image : DEFAULT_OG_IMAGE,
    jsonLd,
  };
}
