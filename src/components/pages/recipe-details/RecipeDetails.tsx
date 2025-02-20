import { Recipe } from '@/types/recipe';
import { Container } from '@radix-ui/themes';
import RecipeBasicInfo from './recipe-basic-info/RecipeBasicInfo';
import RecipeHero from './recipe-hero/RecipeHero';
import RecipeIngredients from './recipe-ingredients/RecipeIngredients';
import RecipeInstructions from './recipe-instructions/RecipeInstructions';
import RecipeNutrition from './recipe-nutrition/RecipeNutrition';
import styles from './RecipeDetails.module.scss';

interface Props {
    recipe: Recipe;
}

const RecipeDetails: React.FC<Props> = ({ recipe }) => {
    return (
        <Container >
            <RecipeHero recipe={recipe} />
            <div className={styles.recipeGrid}>

                <div className={styles.leftColumn}>
                    <RecipeBasicInfo prepTime={recipe.prepareTime} numberOfPortions={recipe.numberOfPortions} difficulty={recipe.difficulty} />
                    <RecipeIngredients ingredients={recipe.ingredients} />
                </div>
                <div className={styles.rightColumn}>
                    <RecipeInstructions recipeSteps={recipe.steps} />
                    <RecipeNutrition />
                </div>
            </div>
        </Container>

    )
}

export default RecipeDetails;

