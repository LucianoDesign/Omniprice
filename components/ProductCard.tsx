'use client'

import { Product } from "@/types";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";


interface Props {
  product: Product;
  delay: number
}

const ProductCard = ({ product, delay }: Props) => {
 
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{once: true, amount: 0.25}}
      transition={{ duration: 0.3, delay: delay }}
      className="flex sm:w-[292px] w-full"
    >
    <Link href={`/products/${product._id}`} className="product-card">
      <div className="product-card_img-container">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="product-card_img"
        />
        <div className="flex flex-col gap-3">
          <h3 className="product-title">{product.title}</h3>
          <div className="flex justify-between">
            <p className="text-black opacity-50 text-lg capitalize">
              {product.category}
            </p>
            <p className="text-black text-lg font-semibold">
              <span>{product?.currency}</span>
              <span>{product?.currentPrice}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>

    </motion.div>
  );
};

export default ProductCard;
