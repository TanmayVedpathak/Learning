import { Meal } from "@/types";

import style from "./meals-grid.module.css";

import MealItem from "./MealItem";

const MealsGrid = ({ meals }: { meals: Meal[] }) => {
  return (
    <>
      <ul className={style.meals}>
        {meals?.map((meal) => (
          <li key={meal.id}>
            <MealItem {...meal} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default MealsGrid;
