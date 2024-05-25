import {Await, Link, useLoaderData} from "react-router-dom";
import {ProductType} from "../../interfaces/Product.interface.ts";
import styles from "./Product.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingBag, faStar} from "@fortawesome/free-solid-svg-icons";
import {Title} from "../../components/Title/Title.tsx";
import {useDispatch} from "react-redux";
import {cartActions} from "../../store/cart.slice.ts";
import {AppDispatch} from "../../store/store.ts";
import {Suspense} from "react";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import Button from "../../components/Button/Button.tsx";

export function Product() {
    const data = useLoaderData() as { data: ProductType };
    const dispatch = useDispatch<AppDispatch>();

    return <>
        <Suspense fallback={'Loading...'}>
            <Await resolve={data.data}>
                {({data}: { data: ProductType }) => (
                    <div className={styles['card-wrapper']}>
                        <div className={styles['header']}>
                            <Link to={'/'}>
                                <FontAwesomeIcon icon={faArrowLeft} className={styles['arrow']}/>
                            </Link>
                            <Title>{data.name}</Title>
                            <Button className={styles['add-to-cart-button']} appearance={'small'}
                                    onClick={() => dispatch(cartActions.add(data.id))}>
                                <FontAwesomeIcon icon={faShoppingBag} style={{color: "#FFFFFF",}}/>
                                <div className={styles['text']}>In the cart</div>
                            </Button>
                        </div>
                        <div className={styles['card']}>
                            <div>
                                <img src={data.image} alt="product image" className={styles['image']}/>
                            </div>
                            <div className={styles['description']}>
                                <div className={styles['wrapper']}>
                                    <div className={styles['text']}>Price</div>
                                    <div className={styles['price']}>{data.price}&nbsp;<span
                                        className={styles['currency']}>₽</span></div>
                                </div>
                                <hr className={styles['hr']}/>
                                <div className={styles['wrapper']}>
                                    <div className={styles['text']}>Rating</div>
                                    <div className={styles['rating']}>{data.rating}&nbsp;<FontAwesomeIcon icon={faStar}
                                                                                                          style={{color: "#FFD43B",}}/>
                                    </div>
                                </div>
                                <hr className={styles['hr']}/>
                                <div className={styles['composition-wrapper']}>
                                    <div className={styles['text']}>Composition:</div>
                                    <br/>
                                    <ul style={{paddingLeft: '20px'}}>
                                        {data.ingredients.map((ingredient, index) => (
                                            <li key={index} className={styles['ingredient-text']}>{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Await>
        </Suspense>
    </>
}