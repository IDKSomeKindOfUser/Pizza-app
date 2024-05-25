import styles from './Success.module.css'
import Button from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";

export function Success() {
    const navigate = useNavigate();

    return (
        <div className={styles['success']}>
            <img src="/pizza.png" alt="pizza"/>
            <div className={styles['text']}>Your order has been successfully placed!</div>
            <Button appearance={'big'} onClick={() => navigate('/')}>Place a new order</Button>
        </div>
    )
}