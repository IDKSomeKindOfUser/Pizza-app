import styles from './Login.module.css'
import {Title} from "../../components/Title/Title.tsx";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import {Link} from "react-router-dom";
import {FormEvent} from "react";

export function Login(){
    const submit = (e: FormEvent) => {
        e.preventDefault();
        console.log(e)
    }

    return <div className={styles['login-wrapper']} onSubmit={submit}>
        <Title className={styles['title']}>Вход</Title>
        <form className={styles['form']}>
            <div className={styles['field']}>
                <label htmlFor={'email'} className={styles['description']}>Your email</label>
                <Input placeholder={'Email'} id={'email'} type={'email'}/>
            </div>
            <div className={styles['field']}>
                <label htmlFor={'password'} className={styles['description']}>Your password</label>
                <Input placeholder={'Password'} id={'password'} type={'password'}/>
            </div>
            <Button className={styles['button']} appearance={'big'}>Enter</Button>
        </form>
        <div className={styles['footer']}>
            <p>Don't have an account?</p>
            <Link to={'/auth/register'}>Register</Link>
        </div>
    </div>
}