import styles from './Tag.module.css';

export function Tag({tag}: {tag: string}) {

    return (
        <span className={styles.tag}>{tag}</span>
    )
}