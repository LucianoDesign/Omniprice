"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { scrapeAndStoreProduct } from "@/lib/actions";
import React, { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import { SectionWrapper } from "./HOC/SectionWrapper";
import { motion } from "framer-motion";
import { fadeIn } from './utils/utils'

const Searchbar = () => {
  const { user } = useUser();
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidMeliProductURL = (url: string) => {
    try {
      const parsedURL = new URL(url);
      const hostname = parsedURL.hostname;

      if (
        hostname.includes("mercadolibre.com") ||
        hostname.includes("mercadolibre.") ||
        hostname.endsWith("mercadlibre")
      )
        return true;
    } catch (error) {
      return false;
    }
    return false;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isValidMeliProductURL(searchPrompt);
    if (!user)
      return Swal.fire({
        title: "Please!",
        text: "Log in to continue",
        icon: "warning",
        confirmButtonText: "Got it",
        width: "20em",
      });
    if (!isValidLink)
      return Swal.fire({
        title: "Invalid Link",
        text: "Provide a valid Mercado Libre link, example: https://www.mercadolibre.com.ar/mon...",
        icon: "error",
        confirmButtonText: "Got it",
        width: "30em",
      });
    try {
      const { sub } = user;
      setIsLoading(true);
      if (sub) {
        const product = await scrapeAndStoreProduct(searchPrompt, sub);

        return Swal.fire({
          title: "Product Tracked",
          text: `${product?.title}`,
          icon: "success",
          confirmButtonText: "Got it",
          width: "30em",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div variants={fadeIn("right", "", 0.1, 1)}>

    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter product link"
        className="searchbar-input"
      />
      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ""}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
    </motion.div>
  );
};

export default SectionWrapper(Searchbar, 'searchbar');
