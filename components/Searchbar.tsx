"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { scrapeAndStoreProduct } from "@/lib/actions";
import React, { FormEvent, useState } from "react";
import Swal from "sweetalert2";

const Searchbar = () => {
  const { user } = useUser()
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidAmazonProductURL = (url: string) => {
    try {
      const parsedURL = new URL(url);
      const hostname = parsedURL.hostname;

      if (
        hostname.includes("amazon.com") ||
        hostname.includes("amazon.") ||
        hostname.endsWith("amazon") || 
        hostname.includes("mercadolibre.com") ||
        hostname.includes("mercadolibre.") ||
        hostname.endsWith('mercadlibre')
      )
        return true;
    } catch (error) {
      return false;
    }
    return false;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isValidAmazonProductURL(searchPrompt);
    if(!user) return Swal.fire({
      
      title: 'Please!',
      text: 'Log in to continue',
      icon: 'warning',
      confirmButtonText: 'Got it',
      width: '20em'
    })
    if (!isValidLink) return Swal.fire({
      
      title: 'Invalid Link',
      text: 'Provide a valid Amazon, for example: https://www.amazon.com/dp/B0BF...',
      icon: 'error',
      confirmButtonText: 'Got it',
      width: '30em'
    })
    try {
      setIsLoading(true);
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
};

export default Searchbar;
