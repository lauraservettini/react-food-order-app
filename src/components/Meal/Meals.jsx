import { useEffect, useState } from "react";
import MealItem from "./MealItem";

import useFetch from "../../hooks/useFetch";
import Error from "../Error";

const requestConfig = {};
export default function Meals() {
  const {
    data: meals,
    isLoading,
    error,
  } = useFetch("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p>Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error.message} />;
  }
  return (
    <section>
      <ul id="meals">
        {meals && meals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
      </ul>
    </section>
  );
}
