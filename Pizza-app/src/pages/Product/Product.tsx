import {useLoaderData} from "react-router-dom";
import {ProductType} from "../../interfaces/Product.interface.ts";

export function Product(){
    const data  = useLoaderData() as ProductType;

    return <>
        Product - {data.name}
    </>
}