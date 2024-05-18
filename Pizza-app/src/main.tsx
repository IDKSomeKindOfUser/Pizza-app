import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Menu} from "./pages/Menu/Menu.tsx";
import {Cart} from "./pages/Cart/Cart.tsx";
import {Error} from "./pages/Error/Error.tsx";
import {Layout} from "./layout/Layout-Menu/Layout-Menu.tsx";
import {Product} from "./pages/Product/Product.tsx";
import axios from "axios";
import { prefix } from './helpers/API.ts';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Menu />,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '*',
                element: <Error />,
            },
            {
                path: '/product/:id',
                element: <Product />,
                loader: async ({ params }) => {
                    const { data } = await axios.get(`${prefix}/products/${params.id}`);
                    return data;
                }
            }
        ]
    },
    // {
    //     path: '/cart',
    //     element: <Cart />,
    // },
    // {
    //     path: '*',
    //     element: <Error />,
    // },

])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            <RouterProvider router={router}/>
        </DevSupport>
    </React.StrictMode>,
)
