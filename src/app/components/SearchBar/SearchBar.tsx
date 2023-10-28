
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

        // empty validation errors
        setValidatorErrors([]);
        // Call onTextChange callback
        onTextChange(value);

    }, [onTextChange, validator, onValidatorFail, trim])

    return (
        <div className={styles.container}>
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