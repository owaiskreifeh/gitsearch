import { FaEye, FaCodeBranch } from 'react-icons/fa'
import { GitRepo } from '@/lib/Model/GitRepoModel';
import styles from './RepoSearchResultItem.module.css'
import { Tag } from '../../UI/Tag/Tag';



export function RepoSearchResultItem({ name, contentUrl, forksCount, forksUrl, owner, watchersCount, topics }: GitRepo) {
    console.log(arguments)
    return (
        <div className={styles.card}>
            <div className={styles.header}>

                <div className={styles.owner}>
                    <a className={styles.link} href={owner.profileUrl}>
                        <img className={styles.ownerAvatar} src={owner.avatarUrl} alt="Owner Avatar" />
                        <span className={styles.ownerName}>{owner.name}</span>
                    </a>
                </div>

                <div className={styles.stats}>
                    <span className={styles.stat}> {forksCount} <FaCodeBranch /></span>
                    <span className={styles.stat}>{watchersCount} <FaEye /></span>
                </div>
            </div>
            <div className={styles.body}>
                <h2 className={styles.name}>{name}</h2>
                {/* <div className={styles.languages}>Languages: JavaScript, Python, Java</div> */}
                <div className={styles.topics}>
                    {
                        topics.map(topic => (
                            <Tag key={`TOPIC_${name}_${topic}`} tag={topic}/>
                        ))
                    }

                </div>
            </div>


        </div>
    )
}