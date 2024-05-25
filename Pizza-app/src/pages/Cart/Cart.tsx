import styles from './Cart.module.css'
import {Title} from "../../components/Title/Title.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {ProductType} from "../../interfaces/Product.interface.ts";
import axios from "axios";
import {prefix} from "../../helpers/API.ts";
import CartItem from "../../components/cartItem/cartItem.tsx";
import {useEffect, useState} from "react";
import Button from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {cartActions} from "../../store/cart.slice.ts";

const delivery_fee = 169;

export function Cart() {
    const [cartProducts, setCartProducts] = useState<ProductType[]>([])
    const items = useSelector((state: RootState) => state.cart.items);
    const jwt = useSelector((state: RootState) => state.user.jwt);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const total_price = items.map(i => {
        const product = cartProducts.find(p => p.id === i.id);
        if (!product) {
            return 0;
        }
        return i.count * product.price;
    }).reduce((acc, i) => acc += i, 0);


    const getItem = async (id: number) => {
        const {data} = await axios.get<ProductType>(`${prefix}/products/${id}`);
        return data;
    }

    const loadAllItems = async () => {
        const res = await Promise.all(items.map(item => getItem(item.id)));
        setCartProducts(res);
    }

    const checkout = async () => {
        await axios.post(`${prefix}/order`, {
            products: items
        }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch(cartActions.clean())
        navigate('/success');
    }

    useEffect(() => {
        loadAllItems()
    }, [items]);


    return <>
        <Title style={{marginBlock: '40px'}}>Cart</Title>
        {items.map(i => {
            const product = cartProducts.find(p => p.id === i.id);
            if (!product) {
                return
            }
            return <CartItem key={product.id} count={i.count} {...product} />
        })}
        <div className={styles['price-container']}>
            <div className={styles['text']}>Total</div>
            <div className={styles['price']}>{total_price}&nbsp;<span>₽</span></div>
        </div>
        <hr className={styles['hr']}/>
        <div className={styles['price-container']}>
            <div className={styles['text']}>Delivery</div>
            <div className={styles['price']}>{delivery_fee}&nbsp;<span>₽</span></div>
        </div>
        <hr className={styles['hr']}/>
        <div className={styles['price-container']}>
            <div className={styles['text']}>Total <span className={styles['total-count']}>({items.length})</span></div>
            <div className={styles['price']}>{total_price + delivery_fee}&nbsp;<span>₽</span></div>
        </div>
        <div className={styles['checkout']}>
            <Button appearance={'big'} onClick={checkout}>Checkout</Button>
        </div>
    </>
}