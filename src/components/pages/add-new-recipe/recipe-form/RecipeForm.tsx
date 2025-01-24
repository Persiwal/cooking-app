'use client';
import { Select, SelectItem } from '@/components/ui/Select/Select';
import { createRecipe } from '@/helpers/api-helpers/recipes';
import { useIngredients } from '@/hooks/query/ingredients/useIngredients';
import { Ingredient, RecipeDifficulty } from '@/types/recipe';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Form from '@radix-ui/react-form';
import { Button, Container, Flex, Heading, TextArea, TextField } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './formSchema';
import styles from './RecipeForm.module.scss';

const RecipeForm = () => {
    const session = useSession();
    const [image, setImage] = useState<[File, string] | null>(null)

    useEffect(() => {
        console.log(image);
    }, [image])

    //@ts-ignore
    const onDrop = useCallback(acceptedFiles => {
        setImage([acceptedFiles[0], URL.createObjectURL(acceptedFiles[0])])
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const { control, handleSubmit, register, watch } = useForm<
        z.infer<typeof formSchema>
    >({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            cuisine: '',
            difficulty: RecipeDifficulty.EASY,
            prepareTime: 3600,
            numberOfPortions: 1,
            ingredients: [{ name: '', quantity: 1, unit: '' }],
            steps: [{ order: 1, content: '' }],
        },
    });

    const watchIngredients = watch('ingredients');

    const {
        fields: ingredientFields,
        append: appendIngredient,
        remove: removeIngredient,
    } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const {
        fields: stepFields,
        append: appendStep,
        remove: removeStep,
    } = useFieldArray({
        control,
        name: 'steps',
    });

    const { data: ingredients, isLoading, error } = useIngredients();


    const uploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        console.log(res);

        const data = await res.json();
        console.log(data);
        return data.url;
    };

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        let imageUrl = '';
        if (image) {
            imageUrl = await uploadImage(image[0]);
            console.log(imageUrl);
        }

        const recipeIngredients = data.ingredients.map((ingredient) => {
            const ingredientFromDB = ingredients.find((i: Ingredient) => i.name === ingredient.name) || '';

            return (
                {
                    ingredientId: ingredientFromDB.id,
                    quantity: ingredient.quantity,
                }
            )
        });


        if (session.data?.user?.email) {
            await createRecipe({ userEmail: session.data.user.email, ...data, image: imageUrl, ingredients: recipeIngredients, });
        } else {
            console.error('User email is not available');
        }
    }

    return (
        <Container className={styles.container}>
            <Heading className={styles.heading}>Create New Recipe</Heading>
            <Form.Root onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <Flex direction="column" gap="4">
                    <Controller
                        name="title"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Form.Field
                                name="title"
                                className={`${styles.field} ${fieldState.error && styles.error}`}
                            >
                                <Form.Label className={styles.label}>Title</Form.Label>
                                <TextField.Root>
                                    <TextField.Input
                                        value={field.value}
                                        size="3"
                                        className={styles.input}
                                        onChange={field.onChange}
                                        placeholder="Title"
                                    />
                                </TextField.Root>
                                {fieldState.error && (
                                    <Form.Message className={styles.errorMsg}>
                                        {fieldState.error.message}
                                    </Form.Message>
                                )}
                            </Form.Field>
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Form.Field
                                name="description"
                                className={`${styles.field} ${fieldState.error && styles.error}`}
                            >
                                <Form.Label className={styles.label}>Description</Form.Label>
                                <TextArea
                                    value={field.value}
                                    size="3"
                                    className={styles.input}
                                    onChange={field.onChange}
                                    placeholder="Description"
                                />
                                {fieldState.error && (
                                    <Form.Message className={styles.errorMsg}>
                                        {fieldState.error.message}
                                    </Form.Message>
                                )}
                            </Form.Field>
                        )}
                    />

                    <label className={styles.label}>Image</label>
                    <section style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '20px',
                        borderWidth: 4,
                        borderRadius: 4,
                        borderColor: '#FFFFFF',
                        borderStyle: 'dashed',
                        backgroundColor: '#fafafa',
                        color: '#bdbdbd',
                        outline: 'none',
                        transition: 'border .24s ease-in-out'
                    }}>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
                        </div>
                    </section>

                    {image && (
                        <div className={styles.imagePreview}>
                            <Image src={image[1]} alt='image preview' width={400} height={200} />
                        </div>
                    )}


                    <Controller
                        name="cuisine"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Form.Field
                                name="cuisine"
                                className={`${styles.field} ${fieldState.error && styles.error}`}
                            >
                                <Form.Label className={styles.label}>Cuisine</Form.Label>
                                <TextField.Root>
                                    <TextField.Input
                                        value={field.value}
                                        size="3"
                                        className={styles.input}
                                        onChange={field.onChange}
                                        placeholder="Cuisine"
                                    />
                                </TextField.Root>
                                {fieldState.error && (
                                    <Form.Message className={styles.errorMsg}>
                                        {fieldState.error.message}
                                    </Form.Message>
                                )}
                            </Form.Field>
                        )}
                    />

                    <Controller
                        name="prepareTime"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Form.Field
                                name="prepareTime"
                                className={`${styles.field} ${fieldState.error && styles.error}`}
                            >
                                <Form.Label className={styles.label}>Prepare Time (seconds)</Form.Label>
                                <TextField.Root>
                                    <TextField.Input
                                        value={field.value}
                                        size="3"
                                        className={styles.input}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        placeholder="Prepare Time (seconds)"
                                        type="number"
                                    />
                                </TextField.Root>
                                {fieldState.error && (
                                    <Form.Message className={styles.errorMsg}>
                                        {fieldState.error.message}
                                    </Form.Message>
                                )}
                            </Form.Field>
                        )}
                    />

                    <Controller
                        name="numberOfPortions"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Form.Field
                                name="numberOfPortions"
                                className={`${styles.field} ${fieldState.error && styles.error}`}
                            >
                                <Form.Label className={styles.label}>Number of Portions</Form.Label>
                                <TextField.Root>
                                    <TextField.Input
                                        value={field.value}
                                        size="3"
                                        className={styles.input}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        placeholder="Number of Portions"
                                        type="number"
                                    />
                                </TextField.Root>
                                {fieldState.error && (
                                    <Form.Message className={styles.errorMsg}>
                                        {fieldState.error.message}
                                    </Form.Message>
                                )}
                            </Form.Field>
                        )}
                    />

                    <Controller
                        name="difficulty"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Form.Field
                                name="difficulty"
                                className={`${fieldState.error && styles.error}`}
                            >
                                <Form.Label className={styles.label}>Difficulty</Form.Label>
                                <TextField.Root>
                                    <Select
                                        placeholder='Select an difficulty'
                                        label='Difficulty'
                                        value={field.value}
                                        onChange={value => field.onChange(value)}
                                    >
                                        <SelectItem value={RecipeDifficulty.EASY}>Easy</SelectItem>
                                        <SelectItem value={RecipeDifficulty.MEDIUM}>Medium</SelectItem>
                                        <SelectItem value={RecipeDifficulty.HARD}>Hard</SelectItem>
                                    </Select>
                                </TextField.Root>
                                {fieldState.error && (
                                    <Form.Message className={styles.errorMsg}>
                                        {fieldState.error.message}
                                    </Form.Message>
                                )}
                            </Form.Field>
                        )}
                    />

                    <Heading className={styles.subheading}>Ingredients</Heading>
                    {ingredientFields.map((field, index) => {
                        return (
                            <Flex key={field.id} direction="row" gap="2" align="start" className={styles.ingredientRow}>
                                <Controller
                                    name={`ingredients.${index}.name`}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Form.Field
                                            name={`ingredients.${index}.name`}
                                            className={`${styles.field} ${fieldState.error && styles.error}`}
                                        >
                                            <Form.Label className={styles.label}>Name</Form.Label>
                                            <TextField.Root>
                                                <Select
                                                    placeholder='Select an ingredient'
                                                    label='Ingredients'
                                                    value={field.value}
                                                    onChange={value => field.onChange(value)}
                                                >
                                                    {isLoading ? (
                                                        <SelectItem value='Loading...'>Loading...</SelectItem>
                                                    ) : error ? (
                                                        <SelectItem value='error'>Error loading ingredients</SelectItem>
                                                    ) : (
                                                        ingredients.map((ingredient: any) => (
                                                            <SelectItem key={ingredient.id} value={ingredient.name}>
                                                                {ingredient.name}
                                                            </SelectItem>
                                                        ))
                                                    )}
                                                </Select>
                                            </TextField.Root>
                                            {fieldState.error && (
                                                <Form.Message className={styles.errorMsg}>
                                                    {fieldState.error.message}
                                                </Form.Message>
                                            )}
                                        </Form.Field>
                                    )}
                                />
                                <Controller
                                    name={`ingredients.${index}.quantity`}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Form.Field
                                            name={`ingredients.${index}.quantity`}
                                            className={`${styles.field} ${fieldState.error && styles.error}`}
                                        >
                                            <Form.Label className={styles.label}>Quantity</Form.Label>
                                            <TextField.Root>
                                                <TextField.Input
                                                    value={field.value}
                                                    size="3"
                                                    className={styles.input}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    placeholder="Quantity"
                                                    type="number"
                                                />
                                            </TextField.Root>
                                            {fieldState.error && (
                                                <Form.Message className={styles.errorMsg}>
                                                    {fieldState.error.message}
                                                </Form.Message>
                                            )}
                                        </Form.Field>
                                    )}
                                />
                                <Controller
                                    name={`ingredients.${index}.unit`}
                                    control={control}
                                    render={({ field, fieldState }) => {
                                        const selectedIngredient = ingredients?.find(
                                            (ingredient: any) => ingredient.name === field.value
                                        );
                                        return (
                                            <Form.Field
                                                name={`ingredients.${index}.unit`}
                                                className={`${styles.field} ${fieldState.error && styles.error}`}
                                            >
                                                <Form.Label className={styles.label}>Unit</Form.Label>
                                                <TextField.Root>
                                                    <TextField.Input
                                                        value={selectedIngredient ? selectedIngredient.unit : 'gram'}
                                                        size="3"
                                                        className={styles.input}
                                                        readOnly
                                                    />
                                                </TextField.Root>
                                                {fieldState.error && (
                                                    <Form.Message className={styles.errorMsg}>
                                                        {fieldState.error.message}
                                                    </Form.Message>
                                                )}
                                            </Form.Field>
                                        );
                                    }}
                                />
                                <Button type="button" style={{ marginTop: '25px', height: '40px' }} onClick={() => removeIngredient(index)} className={styles.removeButton}>
                                    Remove
                                </Button>
                            </Flex>
                        );
                    })}
                    <Button type="button" onClick={() => appendIngredient({ name: '', quantity: 1, unit: '' })} className={styles.addButton}>
                        Add Ingredient
                    </Button>

                    <Heading className={styles.subheading}>Steps</Heading>
                    {stepFields.map((field, index) => (
                        <Flex key={field.id} direction="row" gap="2" align="start" className={styles.stepRow}>
                            <Controller
                                name={`steps.${index}.order`}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Form.Field
                                        name={`steps.${index}.order`}
                                        className={`${styles.field} ${fieldState.error && styles.error}`}
                                    >
                                        <Form.Label className={styles.label}>Order</Form.Label>
                                        <TextField.Root>
                                            <TextField.Input
                                                value={field.value}
                                                size="3"
                                                className={styles.input}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                placeholder="Order"
                                                type="number"
                                            />
                                        </TextField.Root>
                                        {fieldState.error && (
                                            <Form.Message className={styles.errorMsg}>
                                                {fieldState.error.message}
                                            </Form.Message>
                                        )}
                                    </Form.Field>
                                )}
                            />
                            <Controller
                                name={`steps.${index}.content`}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Form.Field
                                        name={`steps.${index}.content`}
                                        className={`${styles.field} ${fieldState.error && styles.error}`}
                                    >
                                        <Form.Label className={styles.label}>Content</Form.Label>
                                        <TextField.Root>
                                            <TextField.Input
                                                value={field.value}
                                                size="3"
                                                className={styles.input}
                                                onChange={field.onChange}
                                                placeholder="Content"
                                            />
                                        </TextField.Root>
                                        {fieldState.error && (
                                            <Form.Message className={styles.errorMsg}>
                                                {fieldState.error.message}
                                            </Form.Message>
                                        )}
                                    </Form.Field>
                                )}
                            />
                            <Button type="button" style={{ marginTop: '25px', height: '40px' }} onClick={() => removeStep(index)} className={styles.removeButton}>
                                Remove
                            </Button>
                        </Flex>
                    ))}
                    <Button type="button" onClick={() => appendStep({ order: stepFields.length + 1, content: '' })} className={styles.addButton}>
                        Add Step
                    </Button>

                    <Button type="submit" className={styles.submitButton}>Create Recipe</Button>
                </Flex>
            </Form.Root>
        </Container >
    );
};

export default RecipeForm;
