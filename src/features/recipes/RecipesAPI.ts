import axios from "axios";
import { IRecipes } from "../../shared/interfaces/Recipes.interface";

const API_URL = "http://localhost:5000/api/recipes";

// Получение всех рецептов
export const fetchRecipes = async (): Promise<IRecipes[]> => {
	const response = await axios.get(API_URL);
	return response.data;
};

// export const fetchRecipes = async () => {
//     const response = await fetch(API_URL);
//     if (!response.ok) {
//       throw new Error('Не удалось загрузить рецепты');
//     }
//     return response.json(); // Парсим JSON-данные
//   };

// Получение одного рецепта по ID
export const fetchRecipeById = async (id: string): Promise<IRecipes> => {
	const response = await axios.get(`${API_URL}/${id}`);
	return response.data;
};

// export const fetchRecipeById = async (id: string) => {
//     const response = await fetch(`${API_URL}/${id}`);
//     if (!response.ok) {
//       throw new Error(`Не удалось загрузить рецепт с ID: ${id}`);
//     }
//     return response.json();
//   };

// Создание нового рецепта
export const createRecipe = async (recipeData: IRecipes): Promise<IRecipes> => {
	const response = await axios.post(API_URL, recipeData);
	return response.data;
};

// export const createRecipe = async (recipeData: any) => {
// 	const response = await fetch(API_URL, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(recipeData), // Передаем данные в теле запроса
// 	});
// 	if (!response.ok) {
// 		throw new Error("Не удалось создать рецепт");
// 	}
// 	return response.json();
// };

// Обновление рецепта
export const updateRecipe = async (
	id: string,
	updatedData: IRecipes
): Promise<IRecipes> => {
	const response = await axios.put(`${API_URL}/${id}`, updatedData);
	return response.data;
};

// export const updateRecipe = async (id: string, updatedData: any) => {
//     const response = await fetch(`${API_URL}/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedData),
//     });
//     if (!response.ok) {
//       throw new Error('Не удалось обновить рецепт');
//     }
//     return response.json();
//   };

// Удаление рецепта
export const deleteRecipe = async (
	id: string
): Promise<{ success: boolean }> => {
	const response = await axios.delete(`${API_URL}/${id}`);
	return response.data;
};

// export const deleteRecipe = async (id: string) => {
// 	const response = await fetch(`${API_URL}/${id}`, {
// 		method: "DELETE",
// 	});
// 	if (!response.ok) {
// 		throw new Error("Не удалось удалить рецепт");
// 	}
// 	return response.json();
// };
