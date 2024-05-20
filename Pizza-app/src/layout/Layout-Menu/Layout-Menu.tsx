import {NavLink, Outlet, useNavigate} from "react-router-dom";
import styles from "./Layout-Menu.module.css";
import Button from "../../components/Button/Button.tsx";
import cn from 'classnames';

export function Layout(){
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('jwt');
        navigate('/auth/login');
    }

    return <div className={styles['layout']}>
        <div className={styles['sidebar']}>
            <div className={styles['user']}>
                <img src="/avatar.png" alt="avatar" className={styles['avatar']}/>
                <div className={styles['name']}>AkumA</div>
                <div className={styles['email']}>akuma@duck.com</div>
            </div>
            <div className={styles['menu']}>
                <NavLink to={'/'} className={({ isActive }) => cn(styles['link'], {
                    [styles.active]: isActive
                })}>
                    <i className="fas fa-ellipsis-h-alt"></i>
                    Menu
                </NavLink>
                <NavLink to={'/cart'} className={({ isActive }) => cn(styles['link'], {
                    [styles.active]: isActive
                })}>
                    <i className="fas fa-shopping-cart"></i>
                    Cart
                </NavLink>
            </div>
            <Button className={styles['exit-button']} onClick={logout}>
                <i className="fal fa-times-circle"></i>
                Exit
            </Button>
        </div>
        <div className={styles['content']}>
        <Outlet />
        </div>
    </div>
}