import { RecipeStep } from '@/types/recipe'
import { Card } from '@radix-ui/themes'
import styles from './RecipeInstructions.module.scss'

interface Props {
    recipeSteps: RecipeStep[]
}

const RecipeInstructions: React.FC<Props> = ({ recipeSteps }) => {
    return (
        <Card className={styles.card}>
            <h2 className={styles.title}>Cooking Instructions</h2>
            <div className={styles.instructionsContainer}>
                {recipeSteps.map((step, index) => (
                    <div key={index} className={styles.instructionRow}>
                        <span className={styles.stepNumber}>{index + 1}</span>
                        <p>{step.content}</p>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default RecipeInstructions