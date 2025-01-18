export const fetchIngredients = async () => {
  const response = await fetch('/api/ingredients');
  if (!response.ok) {
    throw new Error('Failed to fetch ingredients');
  }
  return response.json();
};
