import styles from './Login.module.css'
import {Title} from "../../components/Title/Title.tsx";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useState} from "react";
import axios, {AxiosError} from "axios";
import { prefix } from '../../helpers/API.ts'
import {AuthResponse} from "../../interfaces/auth.interface.ts";
import {AppDispatch} from "../../store/store.ts";
import {userActions} from "../../store/user.slice.ts";
import {useDispatch} from "react-redux";

export type LoginForm = {
    email:{
        value: string,
    },
    password: {
        value: string
    }
}


export function Login(){
    const [error, setError] = useState<string | null>()
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & LoginForm;
        const { email, password } = target;
        await sendLogin(email.value, password.value)
    }

    const sendLogin = async (email: string, password: string) =>{
        try {
            const { data } = await axios.post<AuthResponse>(`${prefix}/auth/login`, {
                email,
                password,
            })
            dispatch(userActions.addJwt(data.access_token))
            navigate('/')
        }catch(e){
            if(e instanceof AxiosError){
                console.log(e);
                setError(e.response?.data.message);
            }
        }
    }

    return <div className={styles['login-wrapper']} >
        <Title className={styles['title']}>Вход</Title>
        {error && <div className={styles['error']}>{error}</div>}
        <form className={styles['form']} onSubmit={submit}>
            <div className={styles['field']}>
                <label htmlFor={'email'} className={styles['description']}>Your email</label>
                <Input placeholder={'Email'} id={'email'} type={'email'} name={'email'}/>
            </div>
            <div className={styles['field']}>
                <label htmlFor={'password'} className={styles['description']}>Your password</label>
                <Input placeholder={'Password'} id={'password'} type={'password'} name={'password'}/>
            </div>
            <Button className={styles['button']} appearance={'big'}>Enter</Button>
        </form>
        <div className={styles['footer']}>
            <p>Don't have an account?</p>
            <Link to={'/auth/register'}>Register</Link>
        </div>
    </div>
}