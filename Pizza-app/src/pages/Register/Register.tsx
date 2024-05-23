import styles from './Register.module.css'
import {Title} from "../../components/Title/Title.tsx";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useEffect} from "react";
import {AppDispatch, RootState} from "../../store/store.ts";
import {register, userActions} from "../../store/user.slice.ts";
import {useDispatch, useSelector} from "react-redux";

export type RegisterForm = {
    email:{
        value: string,
    },
    password: {
        value: string
    },
    name: {
        value: string
    }
}


export function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const {jwt, registerErrorMessage} = useSelector((s: RootState) => s.user);

    useEffect(() => {
        if (jwt) {
            navigate('/')
        }
    }, [jwt, navigate]);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearRegisterError());
        const target = e.target as typeof e.target & RegisterForm;
        const {email, password, name} = target;
        dispatch(register({email: email.value, password: password.value, name: name.value}))
    }

    return <div className={styles['register-wrapper']} >
        <Title className={styles['title']}>Register</Title>
        {registerErrorMessage && <div className={styles['error']}>{registerErrorMessage}</div>}
        <form className={styles['form']} onSubmit={submit}>
            <div className={styles['field']}>
                <label htmlFor={'email'} className={styles['description']}>Your email</label>
                <Input placeholder={'Email'} id={'email'} type={'email'} name={'email'}/>
            </div>
            <div className={styles['field']}>
                <label htmlFor={'password'} className={styles['description']}>Your password</label>
                <Input placeholder={'Password'} id={'password'} type={'password'} name={'password'}/>
            </div>
            <div className={styles['field']}>
                <label htmlFor={'name'} className={styles['description']}>Your name</label>
                <Input placeholder={'Name'} id={'name'} type={'text'} name={'name'}/>
            </div>
            <Button className={styles['button']} appearance={'big'}>Register</Button>
        </form>
        <div className={styles['footer']}>
            <p>Already have an account?</p>
            <Link to={'/auth/login'}>Login</Link>
        </div>
    </div>
}