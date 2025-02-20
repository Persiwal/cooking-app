import { Recipe } from "@/types/recipe";
import { Card, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import Image from 'next/image';
import Link from "next/link";
import React from "react";
import styles from './RecipeCard.module.scss';

interface Props {
    recipe: Recipe
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
    return (
        <Card className={styles.card} key={recipe.id}>
            <Link href={`recipe/${recipe.id}`}>
                <div className={styles.imageContainer}>
                    <Image src={recipe.image || `${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/elementor-placeholder-image_jpuhxr.webp`} width={400} height={400} alt={recipe.title} className={styles.image} />
                </div>
                <div className={styles.content}>
                    <Heading as="h3" size="4" className={styles.title}>
                        {recipe.title}
                    </Heading>
                    <Text className={styles.description}>{recipe.description || 'No description provided'}</Text>
                    <Flex align="center" justify="between" className={styles.details}>
                        <Flex align="center" className={styles.info}>
                            <span className={styles.iconText}>
                                <i className='fa-solid fa-clock' style={{ marginRight: '4px' }}></i>
                                {recipe.prepareTime}
                            </span>
                            <span className={styles.iconText}>
                                <i className='fa-solid fa-signal' style={{ marginRight: '4px' }}></i>
                                {recipe.difficulty}
                            </span>
                        </Flex>
                        <IconButton className={styles.bookmark}>
                            <i className='fa-solid fa-bookmark'></i>
                        </IconButton>
                    </Flex>
                </div></Link>

        </Card>
    )
}

export default RecipeCard