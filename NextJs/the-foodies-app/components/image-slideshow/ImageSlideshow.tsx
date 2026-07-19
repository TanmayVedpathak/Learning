"use client";

import { useEffect, useState } from "react";

import Image, { type StaticImageData } from "next/image";

import burgerImg from "@/assets/burger.jpg";
import curryImg from "@/assets/curry.jpg";
import dumplingsImg from "@/assets/dumplings.jpg";
import macncheeseImg from "@/assets/macncheese.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import schnitzelImg from "@/assets/schnitzel.jpg";
import tomatoSaladImg from "@/assets/tomato-salad.jpg";

import style from "./image-slideshow.module.css";

type SlideshowImage = {
  image: StaticImageData;
  alt: string;
};

const images: SlideshowImage[] = [
  { image: burgerImg, alt: "A delicious, juicy burger" },
  { image: curryImg, alt: "A delicious, spicy curry" },
  { image: dumplingsImg, alt: "Steamed dumplings" },
  { image: macncheeseImg, alt: "Mac and cheese" },
  { image: pizzaImg, alt: "A delicious pizza" },
  { image: schnitzelImg, alt: "A delicious schnitzel" },
  { image: tomatoSaladImg, alt: "A delicious tomato salad" },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    }, 3000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <div className={style.slideshow}>
        {images.map((item, index) => (
          <Image key={item.alt} src={item.image} className={index === currentImageIndex ? style.active : ""} alt={item.alt} fill sizes="200px" preload />
        ))}
      </div>
    </>
  );
}
