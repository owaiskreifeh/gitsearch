'use client'
import { useCallback, useContext, useEffect, useState } from 'react'
import styles from './page.module.css'

import SearchBar from '@/app/components/SearchBar/SearchBar'
import { GitSearchResultPage } from '@/lib/GitSearchResultPage'
import { debounce } from '@/lib/utils/timing'
import { storeContext } from '@/lib/stores'

import { searchByRepoName, searchByUsername } from './actions/gitActions'
import { SearchResult } from './components/SearchResults/SearchResult'
import { Button } from './components/UI/Button/Button'

enum SearchMode {
  USER = "user",
  REPO = "repo",
}

const validateSearchInput = (value: string) => {
  const errors: string[] = [];
  const validInput = /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,100}$/

  // should match a valid input pattern
  // @TODO: check for what git client we're using
  // @TODO: give more info on where/why the validation fails
  // @TODO: thought: checkout https://www.npmjs.com/package/validator
  if (value && !validInput.test(value)) {
    errors.push("the input is not a valid ")
  }

  return errors;
}

export default function Home() {

  const store = useContext(storeContext);

  const [searchMode, setSearchMode] = useState(SearchMode.USER);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreResults, setHasMoreResults] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)

  const onSearchTextChanged = useCallback((value: string) => {
    if (!value) return; // NOOP

    setCurrentPage(1);
    store.clear();
    setError(null)
    setSearchTerm(value);
  }, [store])

  function setMode(mode: SearchMode) {
    store.clear();
    setCurrentPage(1);
    setError(null)
    setSearchMode(mode);
  }


  useEffect(() => {
    if (!searchTerm) return; // NOOP

    // @TODO: implement a function factory based on the search mode
    const searchMethod = searchMode == SearchMode.REPO ? searchByRepoName : searchByUsername;
    setLoading(true);
    searchMethod(searchTerm, currentPage).then(data => {
      const page = GitSearchResultPage.deserialize(data);
      setHasMoreResults(page.hasMore);
      store.append(page);
    }).catch((e) => {
      setError("something went wrong: " + e.message)
    }).finally(() => {
      setLoading(false);
    })
  }, [currentPage, searchTerm, searchMode, store])

  return (
    <main className={styles.main}>
      <SearchBar
        trim
        value={searchTerm}
        onTextChange={debounce(onSearchTextChanged, 500)}
        validator={validateSearchInput}
        onValidatorFail={console.error}
      />

      <div className={styles.searchModeGroup}>
        <span>
          Search
        </span>
        <Button
          active={searchMode == SearchMode.USER}
          onClick={() => { setMode(SearchMode.USER) }}
        >
          Users
        </Button>
        <Button
          active={searchMode == SearchMode.REPO}
          onClick={() => { setMode(SearchMode.REPO) }}
        >
          Repos
        </Button>
        <span>
          in GitHub
        </span>
      </div>

      {
        error && (
          <div className={styles.error}>
            {error}
          </div>
        )
      }

      <SearchResult
        loading={loading}
        mode={searchMode}
        items={store.flatSearchResults}
        onReachEnd={debounce(() => { !loading && hasMoreResults && setCurrentPage(currentPage + 1) }, 500)}
      />
    </main>
  )
}
