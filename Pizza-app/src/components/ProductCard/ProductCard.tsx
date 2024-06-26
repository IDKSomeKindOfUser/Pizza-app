import styles from './ProductCard.module.css'
import {ProductCardProps} from "./ProductCard.props.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingBag, faStar} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {cartActions} from "../../store/cart.slice.ts";
import React from "react";


function ProductCard(props: ProductCardProps) {

    const dispatch = useDispatch<AppDispatch>();

    const add = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(cartActions.add(props.id));
    }


    return (
        <Link to={`/product/${props.id}`}>
            <div className={styles['card']}>
                <div className={styles['header']} style={{backgroundImage: `url('${props.image}')`}}>
                    <div className={styles['price']}>
                        {props.price}&nbsp;
                        <span className={styles['currency']}>₽</span>
                    </div>
                    <button className={styles['add-to-cart-button']} style={{border: 'none'}} onClick={add}>
                        <FontAwesomeIcon icon={faShoppingBag} style={{color: "#FFFFFF",}}/>
                    </button>
                    <div className={styles['rating']}>
                        {props.rating}&nbsp;
                        <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B",}}/>
                    </div>
                </div>
                <div className={styles['footer']}>
                    <div className={styles['title']}>{props.name}</div>
                    <div className={styles['description']}>{props.description}</div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard;