import { SyntheticEvent, useCallback, useEffect, useRef } from 'react';
import styles from './SearchResult.module.css';

type SearchResultProps = {
    items?: Array<any>,
    renderComponent: (...args: any[]) => JSX.Element,
    onReachEnd?: () => void,
    endThreshold?: number,
    loading?: boolean,
};
export function SearchResult({ items, renderComponent, onReachEnd, endThreshold = 40, loading }: SearchResultProps) {

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollHandler = (evt: Event) => {
            const { scrollTop, clientHeight, scrollHeight } = evt.target as HTMLDivElement;
            if (scrollTop + clientHeight >= scrollHeight - endThreshold) {
                if (onReachEnd) {
                    onReachEnd();
                }
                console.log("end reaxhed")
            }
        }

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
                            No results yet
                        </p>
                    </div>
                    : null
            }

            <div ref={wrapperRef} className={styles.searchResultsWrapper}>
                <>
                    {
                        items ? items.map((item, index) => (
                            <div key={index} className={styles.item}>
                                {renderComponent(item)}
                            </div>
                        )) : null
                    }
                    {
                        (loading) ?
                            <div className={styles.loading}>
                                <p>
                                    Loading data
                                </p>
                            </div>
                            : null
                    }
                </>

            </div>



        </div>
    )

}