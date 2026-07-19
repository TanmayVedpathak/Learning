"use client";

import { useRef, useState } from "react";

import Image from "next/image";

import style from "./image-picker.module.css";

type ImagePickerProps = {
  label: string;
  name: string;
};

const ImagePicker = ({ label, name }: ImagePickerProps) => {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        setPickedImage(fileReader.result);
      }
    };

    fileReader.readAsDataURL(file);
  };

  const handlePickClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={style.picker}>
      <label htmlFor={name}>{label}</label>

      <div className={style.controls}>
        <div className={style.preview}>
          {pickedImage ? (
            <>
              <Image src={pickedImage} alt="The image picked by user" fill sizes="10px" className={style.previewImage} />
            </>
          ) : (
            <>
              <p>No image picked yet.</p>
            </>
          )}
        </div>

        <input className={style.input} ref={inputRef} type="file" name={name} id={name} accept="image/png, image/jpeg" onChange={handleImageChange} />

        <button className={style.button} type="button" onClick={handlePickClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
