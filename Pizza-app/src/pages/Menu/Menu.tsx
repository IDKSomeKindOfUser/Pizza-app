import {Title} from "../../components/Title/Title.tsx";
import Search from "../../components/Search/Search.tsx";
import styles from './Menu.module.css'
import ProductCard from "../../components/ProductCard/ProductCard.tsx";

export function Menu(){
    return <>
        <div className={styles["head"]}>
            <Title>Menu</Title>
            <Search placeholder={'Enter a dish or composition'}></Search>
        </div>
        <div>
            <ProductCard
                id={1}
                price={5}
                rating={4.5}
                title={'Meat Lover\'s Pizza'}
                description={' Parmesan cheese, crumbled sausage, bacon, pepperoni'}
                image={'/pizza-img/meat.webp'}/>
        </div>
    </>
}