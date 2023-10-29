import { useEffect, useRef } from 'react';
import { Spinner } from '../UI/Spinner/Spinner';
import styles from './SearchResult.module.css';
import { RepoSearchResultItem } from './SearchResultsItem/RepoSearchResultItem';
import { UserSearchResultItem } from './SearchResultsItem/UserSearchResultItem';

type SearchResultProps = {
    items?: Array<any>,
    mode: string,
    onReachEnd?: () => void,
    endThreshold?: number,
    loading?: boolean,
};
export function SearchResult({ items, mode, onReachEnd, endThreshold = 40, loading }: SearchResultProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollHandler = (evt: Event) => {
            // Check if we got to the end of the scrollable section
            const { scrollTop, clientHeight, scrollHeight } = evt.target as HTMLDivElement;
            if (scrollTop + clientHeight >= scrollHeight - endThreshold) {
                if (onReachEnd) {
                    onReachEnd();
                }
            }
        }

        // Get a ref to the wrapper element
        const wrapper = wrapperRef.current

        if (wrapper) {
            wrapper.addEventListener("scroll", scrollHandler)
        }

        return () => {
            if (wrapper) {
                wrapper.removeEventListener("scroll", scrollHandler)
            }
        }
    }, [wrapperRef, onReachEnd, endThreshold])

    return (
        <div className={styles.container}>
            {
                (items && items?.length < 1 && !loading) ?
                    <div className={styles.empty}>
                        <p>
                            No results found
                        </p>
                    </div>
                    : null
            }

            <div
                ref={wrapperRef}
                data-cy={"search-result-wrapper"}
                className={styles.searchResultsWrapper}>
                <>
                    {
                        items ? items.map((item, index) => (
                            <div
                                data-cy={"search-result-item"}
                                key={item.id || item.name || index}
                                className={styles.item}>
                                {
                                    mode == 'repo'
                                        ? <RepoSearchResultItem {...item} />
                                        : <UserSearchResultItem {...item} />
                                }
                            </div>
                        )) : null
                    }
                    {
                        (loading) ?
                            <div className={styles.loading}>
                                <Spinner />
                                <p>
                                     Loading data ...
                                </p>
                            </div>
                            : null
                    }
                </>

            </div>



        </div>
    )

}