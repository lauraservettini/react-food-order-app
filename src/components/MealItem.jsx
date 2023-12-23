export default function MealItem ({meal}){
    return (
        <li key={meal.id} className="meal-item">
            <article>
                <img src="http://localhost:3000/images/${meal.image}" alt={meal.name} />
                <h3>{meal.name}</h3>
                <div className="meal-item-description">{meal.description}</div>
                <div className="meal-item-price">{meal.price}</div>
                <div className="meal-item-actions">actions</div>
            </article>
        </li>
    );
}