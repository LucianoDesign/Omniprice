'use client'
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { SectionWrapper } from "./HOC/SectionWrapper";
import { motion } from "framer-motion";
import { fadeIn } from './utils/utils'

const heroImage = [
    {imgUrl: '/assets/images/laptop2.png', alt: 'laptop'},
    {imgUrl: '/assets/images/iphone.jpg', alt: 'iphone'},
    {imgUrl: '/assets/images/hero-3.svg', alt: 'lamp'},
    {imgUrl: '/assets/images/hero-4.svg', alt: 'air fryer'},
    {imgUrl: '/assets/images/hero-5.svg', alt: 'chair'}
]

const HeroCarousel = () => {
  return (
    <motion.div 
    variants={fadeIn("left", "", 0.1, 1)}
    className="hero-carousel flex justify-center items-center">
      <Carousel
        showThumbs= {false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImage.map((image)=>(
            <div key={image.alt}>
                <Image src={image.imgUrl} 
                alt={image.alt}
                width={484}
                height={484}
                key={image.alt}
                className="object-cover pt-12"
                />
            </div>
        ))}
      </Carousel>
      <Image 
        src="assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={175}
        height={175}
        className="max-xl:hidden absolute -left-[15%] bottom-0"
      />
    </motion.div>
  );

  
};

export default SectionWrapper(HeroCarousel, 'herocarousel');
