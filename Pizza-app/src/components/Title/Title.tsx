import styles from './Title.module.css';
import {TitleProps} from "./Title.props.ts";
import cn from 'classnames'


export function Title({ children, className,...props }: TitleProps){
    return(
        <h1 className={cn(className, styles['h1'])} {...props}>{children}</h1>
    )
}