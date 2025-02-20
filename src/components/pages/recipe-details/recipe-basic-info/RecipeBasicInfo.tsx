"use client";

import { RecipeDifficulty } from "@/types/recipe";
import { Card } from "@radix-ui/themes";
import React from "react";
import styles from "./RecipeBasicInfo.module.scss";

interface Props {
    prepTime: number;
    numberOfPortions: number;
    difficulty: RecipeDifficulty;
}

const RecipeBasicInfo: React.FC<Props> = ({ prepTime, numberOfPortions, difficulty }) => {
    return (
        <Card className={styles.card}>
            <h2 className={styles.title}>Recipe Details</h2>
            <div className={styles.infoContainer}>
                <div className={styles.infoRow}>
                    <span className={styles.label}>Prep Time</span>
                    <span className={styles.value}>{prepTime} mins</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.label}>Servings</span>
                    <span className={styles.value}>{numberOfPortions} servings</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.label}>Difficulty</span>
                    <span className={styles.value}>{difficulty}</span>
                </div>
            </div>
        </Card>
    );
};

export default RecipeBasicInfo;