'use client';
import { Select, SelectItem } from '@/components/ui/Select/Select';
import { useIngredients } from '@/hooks/query/ingredients/useIngredients';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Form from '@radix-ui/react-form';
import { Button, Container, Flex, Heading, TextArea, TextField } from '@radix-ui/themes';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './formSchema';
import styles from './RecipeForm.module.scss';

const RecipeForm = () => {
    const { control, handleSubmit, register, watch } = useForm<
        z.infer<typeof formSchema>
    >({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            cuisine: '',
            difficulty: 'EASY',
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

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        // Handle form submission
    };

    return (
        <Container>
            <Heading>Create New Recipe</Heading>
            <Form.Root onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap="4">
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: true }}
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
                                        placeholder={'Title'}
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
                                    placeholder={'Description'}
                                />
                                {fieldState.error && (
                                    <Form.Message className={styles.errorMsg}>
                                        {fieldState.error.message}
                                    </Form.Message>
                                )}
                            </Form.Field>
                        )}
                    />

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
                                        placeholder={'Cuisine'}
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
                                <Form.Label className={styles.label}>
                                    Prepare Time (seconds)
                                </Form.Label>
                                <TextField.Root>
                                    <TextField.Input
                                        value={field.value}
                                        size="3"
                                        className={styles.input}
                                        onChange={field.onChange}
                                        placeholder={'Prepare Time (seconds)'}
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
                                <Form.Label className={styles.label}>
                                    Number of Portions
                                </Form.Label>
                                <TextField.Root>
                                    <TextField.Input
                                        value={field.value}
                                        size="3"
                                        className={styles.input}
                                        onChange={field.onChange}
                                        placeholder={'Number of Portions'}
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
                                className={`${styles.field} ${fieldState.error && styles.error}`}
                            >
                                <Form.Label className={styles.label}>Difficulty</Form.Label>
                                <Select
                                    placeholder='Select a difficulty'
                                    label='Difficulty'
                                    value={field.value}
                                    onChange={field.onChange}
                                >
                                    <SelectItem value="EASY">Easy</SelectItem>
                                    <SelectItem value="MEDIUM">Medium</SelectItem>
                                    <SelectItem value="HARD">Hard</SelectItem>
                                </Select>
                                {fieldState.error && (
                                    <Form.Message className={styles.errorMsg}>
                                        {fieldState.error.message}
                                    </Form.Message>
                                )}
                            </Form.Field>
                        )}
                    />

                    <Heading>Ingredients</Heading>
                    {ingredientFields.map((field, index) => {
                        let selectedIngredient = [];

                        if (ingredients) {
                            selectedIngredient = ingredients.find(
                                (ingredient: any) =>
                                    ingredient.name === watchIngredients?.[index]?.name
                            );
                        }

                        return (
                            <Flex key={field.id} direction="row" gap="2">
                                <Controller
                                    name={`ingredients.${index}.name`}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Form.Field
                                            name={`ingredients.${index}.name`}
                                            className={`${styles.field} ${fieldState.error && styles.error}`}
                                        >
                                            <Form.Label className={styles.label}>Ingredient name</Form.Label>
                                            <TextField.Root>
                                                <Select
                                                    label='Ingredient name'
                                                    placeholder='Select an ingredient'
                                                    value={field.value}
                                                    onChange={value => field.onChange(value)}
                                                >
                                                    {isLoading ? (
                                                        <SelectItem value='Loading...'>Loading...</SelectItem>
                                                    ) : error ? (
                                                        <SelectItem value='Error'>Error loading ingredients</SelectItem>
                                                    ) : (
                                                        ingredients.map((ingredient: any) => (
                                                            <SelectItem
                                                                key={ingredient.id}
                                                                value={ingredient.name}
                                                            >
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
                                                    placeholder={'Quantity'}
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
                                        return (
                                            <Form.Field
                                                name={`ingredients.${index}.unit`}
                                                className={`${styles.field} ${fieldState.error && styles.error}`}
                                            >
                                                <Form.Label className={styles.label}>Unit</Form.Label>
                                                <TextField.Root>
                                                    <TextField.Input
                                                        value={
                                                            selectedIngredient ? selectedIngredient.unit : 'G'
                                                        }
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
                                <Button type="button" onClick={() => removeIngredient(index)}>
                                    Remove
                                </Button>
                            </Flex>
                        );
                    })}
                    <Button
                        type="button"
                        onClick={() =>
                            appendIngredient({ name: '', quantity: 1, unit: '' })
                        }
                    >
                        Add Ingredient
                    </Button>

                    <Heading>Steps</Heading>
                    {stepFields.map((field, index) => (
                        <Flex key={field.id} direction="row" gap="2">
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
                                                onChange={field.onChange}
                                                placeholder={'Order'}
                                                type="number"
                                                readOnly
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
                                                placeholder={'Content'}
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
                            <Button type="button" onClick={() => removeStep(index)}>
                                Remove
                            </Button>
                        </Flex>
                    ))}
                    <Button
                        type="button"
                        onClick={() =>
                            appendStep({ order: stepFields.length + 1, content: '' })
                        }
                    >
                        Add Step
                    </Button>

                    <Button type="submit">Create Recipe</Button>
                </Flex>
            </Form.Root>
        </Container>
    );
};

export default RecipeForm;
