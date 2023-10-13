import axios from "axios";
import * as cheerio from "cheerio";
import {
  extractCurrency,
  extractPrice,
  extractPercentageDiscount,
} from "../utils";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;
  // BrightData proxy config

  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };
  try {
    const response = await axios.get(url, options);

    const $ = cheerio.load(response.data);
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $(".a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base")
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    const outOfStockText = $("#availability span").text().trim().toLowerCase();
    const outOfStock = outOfStockText.includes("currently unavailable");

    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    const imagesUrls = Object.keys(JSON.parse(images));
    const currency = extractCurrency($("span.a-offscreen"));
    const discountRate = extractPercentageDiscount($("span.a-color-price"));
    const discountRate2 = $(".savingsPercentage").text().replace(/[-%]/g, "");

    /* console.log({
      title,
      currentPrice,
      originalPrice,
      outOfStock,
      imagesUrls,
      currency,
      discountRate,
      discountRate2,
    }); */

    const data = {
      url,
      currency: currency || '$',
      image: imagesUrls[0],
      title,
      currentPrice: parseFloat(currentPrice.replace(',', '').replace('.', '.')),
      originalPrice: parseFloat(originalPrice.replace(',', '').replace('.', '.')),
      isOutofStock: outOfStock,
      priceHistory: [],
      discountRate: discountRate ? discountRate : discountRate2,
    };
    console.log(data)
  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
