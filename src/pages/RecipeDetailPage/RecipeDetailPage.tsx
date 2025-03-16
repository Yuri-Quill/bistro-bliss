import { useParams } from "react-router-dom";
import { useState } from "react";
import cn from "classnames";
import { useAppSelector } from "../../app/hooks";
import Loading from "../../Components/Loading/Loading";
import Container from "../../Components/Container/Container";
import "./RecipeDetailPage.scss";

const RecipeDetailPage = () => {
    const [openAccordion, setOpenAccordion] = useState<Record<string, boolean>>({
        ingredients: false,
        instructions: false,
    });

    const {
        paginatedRecipes: { recipes },
        loading,
    } = useAppSelector((state) => state.recipes);
    const { id } = useParams<{ id: string }>();

    const recipe = recipes.find((item) => String(item._id) === id);

    if (loading) return <Loading fullScreen />;
    if (!recipe) return <div className="error-message">Recipe not found</div>;

    const toggleAccordion = (accordion: string) => {
        setOpenAccordion((prev) => ({
            ...prev,
            [accordion]: !prev[accordion],
        }));
    };

    const ingredientsClass = cn("recipe-detail__accordion-list", {
        "recipe-detail__accordion-list--open": openAccordion.ingredients,
    });

    const instructionsClass = cn("recipe-detail__accordion-list", {
        "recipe-detail__accordion-list--open": openAccordion.instructions,
    });

    return (
        <section className="recipe-detail">
            <Container>
                <h2 className="recipe-detail__title">{recipe.title}</h2>
                <p className="recipe-detail__description">{recipe.description}</p>

                <figure className="recipe-detail__content">
                    <img
                        src={recipe.image}
                        alt={`Image for ${recipe.title}`}
                        className="recipe-detail__image"
                        width={500}
                        height={500}
                    />
                    <figcaption className="recipe-detail__caption">
                        <p className="recipe-detail__caption-text">{recipe.article}</p>
                    </figcaption>
                </figure>

                <section className="recipe-detail__info-block">
                    <div className="recipe-detail__info">
                        <h4 className="recipe-detail__info-item">
                            Preparing time:{" "}
                            <span className="recipe-detail__info-value">{recipe.prepTime}</span>
                        </h4>
                        <h4 className="recipe-detail__info-item">
                            Cooking time:{" "}
                            <span className="recipe-detail__info-value">{recipe.cookTime}</span>
                        </h4>
                    </div>

                    <section className="recipe-detail__accordion">
                        <div
                            className="recipe-detail__accordion-section"
                            onClick={() => toggleAccordion("ingredients")}
                        >
                            <h3 className="recipe-detail__accordion-title">Ingredients</h3>
                            <ul className={ingredientsClass}>
                                {recipe.ingredients.map((item, index) => (
                                    <li className="recipe-detail__accordion-item" key={index}>
                                        <span className="recipe-detail__accordion-text">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div
                            className="recipe-detail__accordion-section"
                            onClick={() => toggleAccordion("instructions")}
                        >
                            <h3 className="recipe-detail__accordion-title">Instructions</h3>
                            <ul className={instructionsClass}>
                                {recipe.instructions.map((item, index) => (
                                    <li className="recipe-detail__accordion-item" key={index}>
                                        <span className="recipe-detail__accordion-text">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </section>
            </Container>
        </section>
    );
};

export default RecipeDetailPage;