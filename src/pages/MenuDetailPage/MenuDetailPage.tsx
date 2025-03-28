import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";

import { getMenuItemById } from "../../app/slices/menuSlice";

import Container from "../../Components/Container/Container";
import Loading from "../../Components/Loading/Loading";
import NoImage from "../../assets/no-img.jpg";
import "./MenuDetailPage.scss";
import cn from "classnames";

const MenuDetailPage = () => {
	const dispatch = useAppDispatch();
	const { loading, selectedItem } = useAppSelector((state) => state.menu);

	const { categories: categoryParam, id } = useParams<{
		categories: string;
		id: string;
	}>();

	useEffect(() => {
		if (id && categoryParam) {
			dispatch(getMenuItemById({ category: categoryParam, id: id }));
		}
	}, [dispatch, categoryParam, id]);

	const detailAlcoholCn = cn("menu-detail__subtext","menu-detail__alcohol", {
		"menu-detail__alcohol--active": selectedItem?.alcohol_content,
	});

	return (
		<section className="menu-detail">
			<Container>
				{loading ? (
					<Loading />
				) : (
					selectedItem && (
						<>
                        <h2 className="menu-detail__title">{selectedItem.name}</h2>
							<figure className="menu-detail__figure">
								<img
									className="menu-detail__image"
									src={`${selectedItem.picture ? selectedItem?.picture : NoImage}`}
									alt={`image for ${selectedItem.name}`}
									width={500}
									height={500}
									loading="lazy"
								/>
								<figcaption className="menu-detail__caption">
									
									<h4 className="menu-detail__subtitle">
										Price:{" "}
										<span className="menu-detail__subtext menu-detail__subtext--price">{`$ ${selectedItem.price}`}</span>
									</h4>

									<div className="menu-detail__list-wrapper">
										<h4 className="menu-detail__subtitle menu-detail__subtitle--ingredients">
											Ingredients :
										</h4>

										<ul className="menu-detail__list">
											{selectedItem.ingredients.map((ing, index) => (
												<li className="menu-detail__list-item" key={index}>
													{ing}
												</li>
											))}
										</ul>
									</div>
									<h4 className="menu-detail__subtitle">
										Calories:{" "}
										<span className="menu-detail__subtext menu-detail__subtext--calories">{selectedItem.calories}</span>
									</h4>

									<h4 className="menu-detail__subtitle">
										Preparation time:{" "}
										<span className="menu-detail__subtext menu-detail__subtext--prep-time">
											{`${selectedItem.preparation_time} m.`}
										</span>
									</h4>

									{categoryParam === "drinks" && (
										<h4 className="menu-detail__subtitle">
											Alcohol:{" "}
											<span className={detailAlcoholCn}>
												{selectedItem.alcohol_content ? "Contains Alcohol" : "No Alcohol"}
											</span>
										</h4>
									)}
								</figcaption>
							</figure>
						</>
					)
				)}
			</Container>
		</section>
	);
};

export default MenuDetailPage;
