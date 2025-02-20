import { Recipe } from "@/types/recipe";
import Image from "next/image";
import styles from './RecipeHero.module.scss';

const RecipeHero = ({ recipe }: { recipe: Recipe }) => {
    console.log(recipe)
    return (
        <div className={styles.headerContainer}>
            <Image src={recipe.image || `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/elementor-placeholder-image_jpuhxr.webp`} alt={recipe.title} className={styles.image} width={1400} height={400} />
            <div className={styles.overlay}>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>{recipe.title}</h1>
                    <p className={styles.description}>{recipe.description}</p>
                    <div className={styles.infoRow}>
                        <div className={styles.infoItem}>
                            <i className="fa-solid fa-clock" />
                            <span>{recipe.prepareTime}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <i className="fa-solid fa-user-group" />
                            <span>{recipe.numberOfPortions} servings</span>
                        </div>
                        {/* <div className={styles.infoItem}>
                            <i className="fa-solid fa-star" />
                            <span>
                                {recipe.rating} ({recipe.reviews} reviews)
                            </span>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeHero;