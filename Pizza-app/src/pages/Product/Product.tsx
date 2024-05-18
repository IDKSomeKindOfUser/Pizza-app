import {Await, useLoaderData} from "react-router-dom";
import {ProductType} from "../../interfaces/Product.interface.ts";
import {Suspense} from "react";

export function Product(){
    const data  = useLoaderData() as { data: ProductType };

    return <>
        <Suspense fallback={'Loading...'}>
            <Await resolve={data.data}>
                {({data}: {data: ProductType}) => (
                    <>Product - {data.name}</>
                )}
            </Await>
        </Suspense>
    </>
}