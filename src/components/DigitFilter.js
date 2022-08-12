import React from 'react'
import { DIGITS } from '../utilities/constants'

export default function DigitFilter({ name, value, onChange, variant = "primary" }) {

    const onCheckChanged = (digit) => {
        const newValue = (value.includes(digit)) ? value.filter(d => d !== digit) : [...value, digit]
        onChange(name, newValue)
    }

    const clearDigits = () => {
        onChange(name, [])
    }

    console.log("rerendering with value", value)

    return (
        <div className="btn-group flex-wrap font-monospace" role="group" aria-label={name}>
            {DIGITS.map(digit =>
                <React.Fragment key={digit}>
                    <input type="checkbox"
                        className="btn-check"
                        checked={value.includes(digit)}
                        id={"btn-check-" + name + digit}
                        onChange={() => onCheckChanged(digit)}
                        autoComplete="off" />
                    <label 
                        className={"btn flex-grow-0 btn-outline-" + variant}
                        htmlFor={"btn-check-" + name + digit}> 
                            {digit} 
                    </label>
                </React.Fragment>
            )}
            <button 
                className={"btn flex-grow-0 btn-outline-" + variant}
                type="button"
                onClick={clearDigits}>
                X
            </button>
        </div>
    )
}
