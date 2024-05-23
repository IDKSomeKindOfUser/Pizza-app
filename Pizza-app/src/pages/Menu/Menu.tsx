import {Title} from "../../components/Title/Title.tsx";
import Search from "../../components/Search/Search.tsx";
import styles from './Menu.module.css'
import {prefix} from "../../helpers/API.ts";
import {ProductType} from "../../interfaces/Product.interface.ts";
import {ChangeEvent, useEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {MenuList} from "./MenuList/MenuList.tsx";

export function Menu(){
    const [products, setProducts] = useState<ProductType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [filter, setFilter] = useState<string>()


    useEffect(() => {
        getMenu(filter).then();
    }, [filter]);



    const getMenu = async (name?: string) => {
        // using library axios
        try{
            setIsLoading(true);
            const { data } = await axios.get<ProductType[]>(`${prefix}/products`, {
                params: {
                    name
                }
            });
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

    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }


    return <>
        <div className={styles["head"]}>
            <Title>Menu</Title>
            <Search placeholder={'Enter a dish or composition'} onChange={updateFilter}></Search>
        </div>
        <div>
            {error && <>{error}</>}
            {!isLoading && products.length > 0 && <MenuList products={products}/>}
            {!isLoading && products.length === 0 && <>No menu found on request</>}
            {isLoading && <>Loading menu :)</>}
        </div>
    </>
}

export default Menu;