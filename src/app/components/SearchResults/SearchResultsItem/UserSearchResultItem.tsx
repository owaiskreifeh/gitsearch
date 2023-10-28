import { GitUser } from '@/lib/Model/GitUserModel';
import styles from './UserResultsItem.module.css'

export function UserSearchResultItem({ name, avatarUrl, profileUrl }: GitUser) {
    return (
        <div className={styles.card}>
            <a className={styles.link} href={profileUrl} aria-label={`${name}'s profile`}>
                <img className={styles.avatar} src={avatarUrl} alt={`avatar of ${name}`} />
                <span className={styles.name}>{name}</span>
            </a>
        </div>
    )
}