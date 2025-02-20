import { Card } from '@radix-ui/themes';
import styles from './RecipeNutrition.module.scss';

const RecipeNutrition = () => {
    //TODO: replace with real data
    const nutrition = {
        Calories: 200,
        Carbs: 30,
        Protein: 10,
        Fat: 5,
    }

    return (
        <Card className={styles.card}>
            <h2 className={styles.title}>Nutrition Information</h2>
            <div className={styles.nutritionGrid}>
                {Object.entries(nutrition).map(([key, value]) => (
                    <div key={key} className={styles.nutritionItem}>
                        <p className={styles.nutritionValue}>{value}g</p>
                        <p className={styles.nutritionLabel}>{key}</p>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default RecipeNutrition;