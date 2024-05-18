import {Title} from "../../components/Title/Title.tsx";
import Search from "../../components/Search/Search.tsx";
import styles from './Menu.module.css'
import {prefix} from "../../helpers/API.ts";
import {ProductType} from "../../interfaces/Product.interface.ts";
import {useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {MenuList} from "./MenuList/MenuList.tsx";

export function Menu(){
    const [products, setProducts] = useState<ProductType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();



    const getMenu = async () => {
        // using library axios
        try{
            setIsLoading(true);
            const { data } = await axios.get<ProductType[]>(`${prefix}/products`);
            setProducts(data);
            setIsLoading(false);
        }catch(e){
            console.error(e);
            if (e instanceof AxiosError){
                setError(e.message)
            }
            setIsLoading(false);
            return;
        }
        // using default fetch()
        // try {
        //     const response = await fetch(`${prefix}/products`);
        //     if (!response.ok) {
        //         return;
        //     }
        //     const data = await response.json() as Product[];
        //     setProducts(data);
        // } catch (e) {
        //     console.error(e);
        //     return
        // }
    }

    useEffect(() => {
        getMenu();
    }, []);
    return <>
        <div className={styles["head"]}>
            <Title>Menu</Title>
            <Search placeholder={'Enter a dish or composition'}></Search>
        </div>
        <div>
            {error && <>{error}</>}
            {isLoading ? <>Loading menu :)</> : <MenuList products={products}/>}
        </div>
    </>
}

export default Menu;