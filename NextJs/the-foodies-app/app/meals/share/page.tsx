import ShareMealForm from "@/components/meals/ShareMealForm";

import style from "./page.module.css";

export default function ShareMealPage() {
  return (
    <>
      <header className={style.header}>
        <h1>
          Share your <span className={style.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={style.main}>
        <ShareMealForm styleName={style} />
      </main>
    </>
  );
}
