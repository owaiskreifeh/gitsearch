
import { BaseSyntheticEvent, useCallback, useState } from 'react';
import styles from './SearchBar.module.css'

type SearchBarProps = {
    onTextChange?: ((value: string) => void);
    validator?: ((value: string) => string[]);
    onValidatorFail?: ((value: string, errors: string[]) => void);
    trim?: boolean;
};

export default function SearchBar({ onTextChange, validator, onValidatorFail, trim = true }: SearchBarProps) {

    const [validatorErrors, setValidatorErrors] = useState(Array<string>());

    const onChangeHandler = useCallback((evt: BaseSyntheticEvent) => {
        // trim whitespace if needed
        const value = trim ? evt.target.value.trim() : evt.target.value;

        // Guard from null event or onTextChange function
        if (!onTextChange) {
            return; // NOOP
        }

        // Guard from bad input text
        if (validator) {
            const _validatorErrors = validator(value);

            if (_validatorErrors.length > 0) {
                setValidatorErrors(_validatorErrors)
                if (onValidatorFail) {
                    onValidatorFail(value, _validatorErrors);
                }
                return; // NOOP
            }

        }

        // Call onTextChange callback
        onTextChange(value);

    }, [onTextChange, validator, onValidatorFail, trim])

    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
            <div className={styles.inputContainer}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Search"
                    onChange={onChangeHandler}
                />
            </div>
            {
                validatorErrors.length > 0 &&
                <div className={styles.validatorErrors}>
                    {validatorErrors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            }
        </div>
    )
}