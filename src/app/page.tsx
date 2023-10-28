'use client'
import { useCallback, useRef, useState } from 'react'
import styles from './page.module.css'

import SearchBar from '@/app/components/SearchBar/SearchBar'
import { GitSearchResultPage } from '@/lib/GitSearchResultPage'
import { searchByUsername } from './actions/gitActions'
import { debounce } from '@/lib/utils/timing'
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

  const lastSearchInput = useRef<string>("");

  const [searchMode, setSearchMode] = useState(SearchMode.USER);
  const [searchResults, setSearchResults] = useState<GitSearchResultPage<any>[]>([])
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null)

  const onSearchTextChanged = useCallback((value: string) => {
    if (!value) return; // NOOP


    // @TODO: recheck, some text may differ
    // if the current input is the same as the last input, or is starting substring of the previous one do nothing
    if (lastSearchInput.current.startsWith(value)) {
      return; // NOOP
    }

    // update the last searched term
    lastSearchInput.current = value;

    setLoading(true);
    searchByUsername(value, 0 /** page */).then(data => { 
      setSearchResults([GitSearchResultPage.deserialize(data)]);
     }).catch((e) => {
      console.error(e);
      setError("something went wrong")
     }).finally(() => {
      setLoading(false)
     })

  }, [/** no dep */])

  return (
    <main className={styles.main}>
      <SearchBar
        trim
        onTextChange={debounce(onSearchTextChanged, 500)}
        validator={validateSearchInput}
        onValidatorFail={console.error}
      />

      {/* <SearchResult
        loading={loading}
        renderComponent={renderComponent}
        items={searchResults?.searchResults}
        onReachEnd={() => setCurrentPage(currentPage + 1)}
        /> */}
      
    </main>
  )
}
