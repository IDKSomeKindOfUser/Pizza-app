import styles from './Search.module.css';
import classNames from "classnames";
import {SearchProps} from "./Search.props.ts";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {forwardRef} from "react";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input({className, isValid = true, ...props}, ref) {
    return (
        <div className={styles['input-wrapper']}>
            <input {...props} ref={ref} className={classNames(className, styles['input'], {
                [styles['invalid']]: !isValid,
            })} {...props}/>
            <FontAwesomeIcon icon={fas.faSearch} className={styles['icon']}/>
        </div>
    )
})

export default Search