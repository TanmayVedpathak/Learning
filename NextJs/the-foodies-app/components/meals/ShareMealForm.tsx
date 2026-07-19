"use client";
import { useActionState } from "react";

import { shareMeal } from "@/libs/actions";

import ImagePicker from "./ImagePicker";
import MealsFormSubmit from "./MealsFormSubmit";

const initialState = {
  message: null,
};

const ShareMealForm = ({ styleName: style }: { styleName: { readonly [key: string]: string } }) => {
  const [state, formAction] = useActionState(shareMeal, initialState);
  return (
    <>
      <form className={style.form} action={formAction}>
        <div className={style.row}>
          <p>
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" name="name" />
          </p>
          <p>
            <label htmlFor="email">Your email</label>
            <input type="email" id="email" name="email" />
          </p>
        </div>
        <p>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p>
          <label htmlFor="summary">Short Summary</label>
          <input type="text" id="summary" name="summary" />
        </p>
        <p>
          <label htmlFor="instructions">Instructions</label>
          <textarea id="instructions" name="instructions" rows={10}></textarea>
        </p>

        <ImagePicker label="Your Image" name="image" />

        {state.message && <p style={{ color: "red" }}>{state.message}</p>}

        <p className={style.actions}>
          <MealsFormSubmit />
        </p>
      </form>
    </>
  );
};

export default ShareMealForm;
