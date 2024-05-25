import styles from './cartItem.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";
import {cartActions} from "../../store/cart.slice.ts";
import {CartItemProps} from "./cartItem.props.ts";


function CartItem(props: CartItemProps) {

    const dispatch = useDispatch<AppDispatch>();

    const increase = () => {
        dispatch(cartActions.add(props.id));
    }

    const decrease = () => {
        dispatch(cartActions.decrease(props.id));
    }

    const remove = () => {
        dispatch(cartActions.remove(props.id));
    }


    return (
        <div className={styles['item']}>
            <div className={styles['image']} style={{backgroundImage: `url('${props.image}')`}}></div>
            <div className={styles['description']}>
                <div className={styles['name']}>{props.name}</div>
                <div className={styles['price']}>{props.price}&nbsp;₽</div>
            </div>
            <div className={styles['actions']}>
                <button className={styles['decrease-button']} onClick={decrease}>
                    <FontAwesomeIcon icon={faMinus}/>
                </button>
                <div className={styles['count']}>{props.count}</div>
                <button className={styles['increase-button']} onClick={increase}>
                    <FontAwesomeIcon icon={faPlus} style={{color: "#FFFFFF",}}/>
                </button>
                <button className={styles['remove-button']} onClick={remove}>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
            </div>
        </div>
    )
}

export default CartItem