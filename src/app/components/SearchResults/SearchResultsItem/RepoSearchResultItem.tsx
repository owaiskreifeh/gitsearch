import { memo, useCallback, useRef, useState } from 'react';

import { getRepoByName } from '@/app/actions/gitActions';
import { GitRepo } from '@/lib/Model/GitRepoModel';
import { formatNumber } from '@/lib/utils/numbers';
import { FaAngleDown, FaCodeBranch, FaEye } from 'react-icons/fa';
import { Spinner } from '../../UI/Spinner/Spinner';
import { Tag } from '../../UI/Tag/Tag';

import { ForkTag } from '../../UI/ForkTag/ForkTag';
import styles from './RepoSearchResultItem.module.css';



export const RepoSearchResultItem = memo(({ name, forksCount, owner, watchersCount, topics, language }: GitRepo) => {

    const [loading, setLoading] = useState(false);
    const [moreInfo, setMoreInfo] = useState<GitRepo>();
    const [error, setError] = useState('');

    const topicsToShow = useRef(topics.splice(0, 3));

    const handleMoreClicked = useCallback(() => {
        if (moreInfo || loading) return;
        setLoading(true);
        getRepoByName(name)
            .then(serializedRepo => { setMoreInfo(GitRepo.deserialize(serializedRepo)) })
            .catch(error => setError(`error while fetching extra data: ${error.message}`))
            .finally(() => setLoading(false));
    }, [loading, moreInfo, name])


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
                    <span className={styles.stat}> {formatNumber(forksCount)} <FaCodeBranch /></span>
                    <span className={styles.stat}>{formatNumber(watchersCount)} <FaEye /></span>
                </div>
            </div>

            <div className={styles.body}>
                <h2 className={styles.name} onClick={handleMoreClicked}>
                    {loading ? <Spinner /> : null}
                    {loading || moreInfo ? null : <FaAngleDown className={styles.more} />}
                    {name}
                </h2>

                {error ? <p className={styles.error}>{error}</p> : null}

                <div className={styles.languages}>{
                    moreInfo?.languages?.map(lang => (<span key={lang}>{lang}</span>)) ||
                    (language ? <span>{language}</span> : null)
                }</div>

                {
                    moreInfo?.forks?.length ?
                        <div className={styles.forks}>
                            <small>Forked By:</small>
                            <div className={styles.forkGroup}>
                                {
                                    moreInfo?.forks?.map((fork) => (
                                        <ForkTag key={fork.id} {...fork} serialize={fork.serialize} />
                                    ))
                                }
                            </div>
                        </div>
                        : null
                }

                {
                    topicsToShow.current ?
                        <div className={styles.topics}>
                            {
                                topicsToShow.current.map(topic => (
                                    <Tag key={`TOPIC_${name}_${topic}`} tag={topic} />
                                ))
                            }
                        </div>
                        : null
                }


            </div>


        </div>
    )
})

RepoSearchResultItem.displayName = 'RepoSearchResultItem';