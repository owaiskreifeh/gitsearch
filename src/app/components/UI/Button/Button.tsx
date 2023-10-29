
import styles from './Button.module.css';

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    active: boolean
}

export function Button({ onClick, active, children,  }: ButtonProps) {
    return (
        <button
            className={`${styles.button} ${active? styles.active : null}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}