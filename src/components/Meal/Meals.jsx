import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals() {
    const [ meals, setMeals ] = useState();

    useEffect(() => {
        async function getMeals(){
            try {
                const response = await fetch('http://localhost:3000/meals');
                
                if(!response.ok){
                    //
                }
                const resData = await response.json();
                console.log(resData)
                setMeals(resData);
            } catch (error) {
                throw new Error (error.message || "Can't get meals");
            }
        }

        getMeals();
    },[]);
    return (
        <section>
            <ul  id="meals">
                { meals && meals.map((meal) =>
                (
                    <MealItem key={meal.id} meal={meal} />
                ))}
            </ul>
        </section>
    );
}