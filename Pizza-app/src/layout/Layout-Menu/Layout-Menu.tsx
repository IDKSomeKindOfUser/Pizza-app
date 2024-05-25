import {NavLink, Outlet, useNavigate} from "react-router-dom";
import styles from "./Layout-Menu.module.css";
import Button from "../../components/Button/Button.tsx";
import cn from 'classnames';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {getProfile, userActions} from "../../store/user.slice.ts";
import {useEffect} from "react";

export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector((s: RootState) => s.user.profile);
    const items = useSelector((s: RootState) => s.cart.items);


    const logout = () => {
        dispatch(userActions.logout());
        navigate('/auth/login');
    }

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch]);

    return <div className={styles['layout']}>
        <div className={styles['sidebar']}>
            <div className={styles['user']}>
                <img src="/avatar.png" alt="avatar" className={styles['avatar']}/>
                <div className={styles['name']}>{profile?.name}</div>
                <div className={styles['email']}>{profile?.email}</div>
            </div>
            <div className={styles['menu']}>
                <NavLink to={'/'} className={({isActive}) => cn(styles['link'], {
                    [styles.active]: isActive
                })}>
                    <i className="fas fa-ellipsis-h-alt"></i>
                    Menu
                </NavLink>
                <NavLink to={'/cart'} className={({isActive}) => cn(styles['link'], {
                    [styles.active]: isActive
                })}>
                    <i className="fas fa-shopping-cart"></i>
                    Cart
                    <span className={styles['count']}>{items.reduce((acc, item) => acc += item.count, 0)}</span>
                </NavLink>

            </div>
            <Button className={styles['exit-button']} onClick={logout}>
                <i className="fal fa-times-circle"></i>
                Exit
            </Button>
        </div>
        <div className={styles['content']}>
            <Outlet/>
        </div>
    </div>
}