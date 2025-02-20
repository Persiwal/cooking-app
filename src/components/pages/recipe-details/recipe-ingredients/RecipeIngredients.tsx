import { RecipeIngredient } from "@/types/recipe";
import { Card } from "@radix-ui/themes";
import styles from './RecipeIngredients.module.scss';

interface Props {
    ingredients: RecipeIngredient[];
}


const RecipeIngredients: React.FC<Props> = ({ ingredients }) => {
    return (
        <Card className={styles.card}>
            <h2 className={styles.title}>Ingredients</h2>
            <ul className={styles.list}>
                {ingredients.map((ingredient, index) => (
                    <li key={index} className={styles.listItem}>
                        <i className="fa-solid fa-check" /> {ingredient.quantity} {ingredient.unit} {ingredient.ingredient.name}
                    </li>
                ))}
            </ul>
        </Card>
    );
}

export default RecipeIngredients;