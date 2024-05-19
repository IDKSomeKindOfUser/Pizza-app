import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import {createBrowserRouter, defer, RouterProvider} from "react-router-dom"
import {Cart} from "./pages/Cart/Cart.tsx";
import {Error} from "./pages/Error/Error.tsx";
import {Layout} from "./layout/Layout-Menu/Layout-Menu.tsx";
import {Product} from "./pages/Product/Product.tsx";
import axios from "axios";
import { prefix } from './helpers/API.ts';
import {AuthLayout} from "./layout/Auth/AuthLayout.tsx";
import {Login} from "./pages/Login/Login.tsx";
import {Register} from "./pages/Register/Register.tsx";


// eslint-disable-next-line react-refresh/only-export-components
const Menu = lazy(() => import('./pages/Menu/Menu'))


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Suspense fallback={<>Loading...</>}><Menu /></Suspense>,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '/product/:id',
                element: <Product />,
                errorElement: <>Some kind of error :(</>,
                loader: async ({ params }) => {
                    return defer({
                        data: new Promise((resolve, reject) => {
                            setTimeout(() => {
                                axios.get(`${prefix}/products/${params.id}`).then(data => resolve(data)).catch(e => reject(e))
                            }, 2000)
                        })
                    })
                }
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login/>,
            },
            {
                path: 'register',
                element: <Register/>,
            },
        ]
    },
    {
        path: '*',
        element: <Error />,
    },

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
