import styles from './Login.module.css'
import {Title} from "../../components/Title/Title.tsx";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useEffect} from "react";
import {AppDispatch, RootState} from "../../store/store.ts";
import {login, userActions} from "../../store/user.slice.ts";
import {useDispatch, useSelector} from "react-redux";

export type LoginForm = {
    email: {
        value: string,
    },
    password: {
        value: string
    }
}


export function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const {jwt, loginErrorMessage} = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate('/')
        }
    }, [jwt, navigate]);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearLoginError());
        const target = e.target as typeof e.target & LoginForm;
        const {email, password} = target;
        await sendLogin(email.value, password.value)
    }

    const sendLogin = async (email: string, password: string) => {
        dispatch(login({email, password}))
    }

    return <div className={styles['login-wrapper']}>
        <Title className={styles['title']}>Enter</Title>
        {loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}</div>}
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
            <p>Don't have an account yet?</p>
            <Link to={'/auth/register'}>Register</Link>
        </div>
    </div>
}