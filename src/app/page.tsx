'use client'
import { useCallback } from 'react'
import styles from './page.module.css'

import SearchBar from '@/components/SearchBar/SearchBar'

export default function Home() {

  const onSearchTextChanged = useCallback((value: string) => {
    
  }, [])

  const validateSearchInput = (value: string) => {
    const errors: string[] = [];
    const validInput = /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,100}$/
    
    // should match a valid input pattern
    // @TODO: check for what git client we're using
    // @TODO: give more info on where/why the validation fails
    if (!validInput.test(value)) {
      errors.push("the input is not a valid ")
    }

    return errors;
  }

  return (
    <main className={styles.main}>
      <SearchBar
        trim
        onTextChange={console.log}
        validator={validateSearchInput}
        onValidatorFail={console.error}
      />
    </main>
  )
}
