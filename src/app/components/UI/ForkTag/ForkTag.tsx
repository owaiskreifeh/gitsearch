import { GitFork } from "@/lib/Model/GitForkModel";
import styles from './ForkTag.module.css';


export function ForkTag({ owner, url }: GitFork) {
    return (
        <div className={styles.tag}>
            <a href={url} className={styles.link} target="_blank">
                <img className={styles.avatar} src={owner.avatarUrl} alt={`an avatar for ${owner.name}`} />
                <span className={styles.name}>{owner.name}</span>
            </a>
        </div>
    )
}