"use server";
import { cache } from 'react'

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import { scrapeMeliProduct } from "../scraper";
import Product from "../models/product.model";
import Users, { IUser } from "../models/user.model";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";

type RandomIndexes = number[] | number;

export async function createUser(userData: IUser) {
  if (!userData) return;
  try {
    connectToDB();

    const existingUser = await Users.findOne({ sid: userData.sid });
    if (!existingUser) {
      const savedUser = await Users.create(userData);
      return savedUser;
    } else {
      console.log("Welcome back");
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function scrapeAndStoreProduct(
  productUrl: string,
  userSid: string
) {
  if (!productUrl || !userSid) return;

  try {
    connectToDB();

    const scrapedProduct = await scrapeMeliProduct(productUrl);
    if (!scrapedProduct) return;

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];
      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );
    const user = await Users.findOne({ sid: userSid });
    if (user && !user.productsList.includes(newProduct._id)) {
      user.productsList.push(newProduct._id);
      await user.save();
    } else {
      console.log(`Producto ya encontrado en la Lista del usuario`);
    }

    revalidatePath(`/products/${newProduct._id}`);
    return product;
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}

export async function getProductById(productId: string) {
  try {
    connectToDB();

    const product = await Product.findOne({ _id: productId });

    if (!product) return null;
    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();

    const products = await Product.find();
    return products;
  } catch (error) {
    console.log(error);
  }
}

export const getRandomProducts = cache(async() => {
  try {
    connectToDB();
    const totalProducts = await Product.countDocuments();
    const randomIndexes: RandomIndexes = [];
    while (randomIndexes.length < 6) {
      const randomIndex = Math.floor(Math.random() * totalProducts);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    randomIndexes.sort();
    const randomProducts = await Product.find().skip(randomIndexes[0]).limit(6);

    return randomProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
})
export async function getSelectedProducts(sid: string) {
  try {
    connectToDB();
    const user = await Users.findOne({ sid }).populate("productsList");
    const products = user.productsList;
    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    connectToDB();

    const currentProduct = await Product.findById(productId);
    if (!currentProduct) return null;
    const similarProduct = await Product.find({
      _id: { $ne: productId },
    }).limit(3);
    return similarProduct;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserEmailToProduct(
  productId: string,
  userEmail: string
) {
  try {
    const product = await Product.findById(productId);
    if (!product) return;

    const userExists = product.users.some(
      (user: User) => user.email === userEmail
    );
    if (!userExists) {
      product.users.push({ email: userEmail });

      await product.save();

      const emailContent = await generateEmailBody(product, "WELCOME");

      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}
