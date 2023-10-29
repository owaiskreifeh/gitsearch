'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './page.module.css'

import SearchBar from '@/app/components/SearchBar/SearchBar'
import { GitSearchResultPage } from '@/lib/GitSearchResultPage'
import { debounce } from '@/lib/utils/timing'

import { searchByRepoName, searchByUsername } from './actions/gitActions'
import { SearchResult } from './components/SearchResults/SearchResult'

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

  const [searchMode, setSearchMode] = useState(SearchMode.USER);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Array<any>>([])
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreResults, setHasMoreResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)


  const onSearchTextChanged = useCallback((value: string) => {
    if (!value) return; // NOOP

    setCurrentPage(1);
    setSearchResults([]);
    setError(null)
    setSearchTerm(value);
  }, [])

  function setMode(mode: SearchMode) {
    setSearchResults([]);
    setCurrentPage(1);
    setError(null)
    setSearchMode(mode);
  }


  useEffect(() => {
    if (!searchTerm) return; // NOOP
    const searchMethod = searchMode == SearchMode.REPO ? searchByRepoName : searchByUsername;
    setLoading(true);
    searchMethod(searchTerm, currentPage).then(data => {
      const page = GitSearchResultPage.deserialize(data);
      setHasMoreResults(page.hasMore);
      setSearchResults(results => {
        return [...results, ...page.searchResults]
      });
    }).catch((e) => {
      console.error(e);
      setError("something went wrong: " + e.message)
    }).finally(() => {
      setLoading(false);
    })
  }, [
    currentPage,
    searchTerm,
    searchMode,
  ])

  return (
    <main className={styles.main}>
      <SearchBar
        trim
        onTextChange={debounce(onSearchTextChanged, 500)}
        validator={validateSearchInput}
        onValidatorFail={console.error}
      />

      <div className={styles.searchSelectionGroup}>
        <span>
          Search
        </span>
        <button
          className={`${styles.button} ${searchMode == SearchMode.USER ? styles.active : null}`}
          onClick={() => { setMode(SearchMode.USER) }}
        >Users
        </button>
        <button
          className={`${styles.button} ${searchMode == SearchMode.REPO ? styles.active : null}`}
          onClick={() => { setSearchResults([]); setSearchMode(SearchMode.REPO) }}>
          Repo
        </button>
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
        items={searchResults}
        onReachEnd={debounce(() => { !loading && hasMoreResults && setCurrentPage(currentPage + 1) }, 500)}
      />
    </main>
  )
}
