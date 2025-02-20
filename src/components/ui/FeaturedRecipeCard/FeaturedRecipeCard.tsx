import { Recipe } from "@/types/recipe";
import Image from "next/image";
import styles from "./FeaturedRecipeCard.module.scss";

interface Props {
    featuredRecipe: Recipe;
}

const FeaturedRecipeCard: React.FC<Props> = ({ featuredRecipe }) => {
    return (
        <div className={styles.container}>
            <h2>Featured recipe</h2>
            <div className={styles.card}>
                <div className={styles.imageContainer}>
                    <Image
                        src={featuredRecipe.image || `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/elementor-placeholder-image_jpuhxr.webp`}
                        alt={featuredRecipe.title}
                        className={styles.image}
                        width={800}
                        height={400}
                    />
                    <div className={styles.overlay}>
                        <div className={styles.contentWrapper}>
                            <div className={styles.content}>
                                <h2 className={styles.title}>{featuredRecipe.title}</h2>
                                <p className={styles.description}>{featuredRecipe.description}</p>
                                <div className={styles.detailsGrid}>
                                    <div>
                                        <p className={styles.label}>
                                            <i className="fa-regular fa-clock" style={{ marginRight: '4px' }}></i>
                                            Prep Time
                                        </p>
                                        <p className={styles.value}>{featuredRecipe.prepareTime}</p>
                                    </div>
                                    <div>
                                        <p className={styles.label}>
                                            <i className="fa-solid fa-utensils" style={{ marginRight: '4px' }}></i>
                                            Servings
                                        </p>
                                        <p className={styles.value}>{featuredRecipe.numberOfPortions}</p>
                                    </div>
                                    <div>
                                        <p className={styles.label}>
                                            <i className="fa-solid fa-signal" style={{ marginRight: '4px' }}></i>
                                            Difficulty</p>
                                        <p className={styles.value}>{featuredRecipe.difficulty}</p>
                                    </div>
                                </div>
                                <div className={styles.actions}>
                                    <button className={styles.viewRecipe}>View Recipe</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default FeaturedRecipeCard;