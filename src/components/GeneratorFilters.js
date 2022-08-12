import React, { useState } from 'react'
import { EXCLUDED_VARIANT, INCLUDED_VARIANT } from '../utilities/constants'
import { parseNumberInput } from '../utilities/parser';
import DigitFilter from './DigitFilter'

export default function GeneratorFilters({ onSubmitFilters }) {
    const [error, setError] = useState(false);
    const [filters, setFilters] = useState({
        numSquares: 2,
        sums: "10, 12-14",
        excludedDigits: [],
        includedDigits: [],
    })

    const onChange = (event) => {
        setFilters({ ...filters, [event.target.name]: event.target.value })
    }

    const onDigitFilterChange = (name, value) => {
        setFilters({ ...filters, [name]: value })
    }

    const onSubmit = (event) => {
        event.preventDefault()

        // Parse from a string to an array of numbers
        const parsedSums = parseNumberInput(filters.sums);

        // If it doesn't parse correctly, don't sumit
        if(!parsedSums) {
            setError(true);
            return;
        }

        setError(false);
        onSubmitFilters({
            numSquares: filters.numSquares,
            sums: parsedSums,
            excludedDigits: filters.excludedDigits.map(d => parseInt(d)),
            includedDigits: filters.includedDigits.map(d => parseInt(d))
        })
    }

    return (
        <form className="mt-2 me-3 mb-5">
            <div className="row">
                <div className="col mb-3">
                    <label className="form-label"># of Squares</label>
                    <input type="number"
                        className="form-control form-control-lg"
                        name="numSquares"
                        value={filters.numSquares}
                        onChange={onChange} />
                </div>
                <div className="col mb-3">
                    <label className="form-label">Sum</label>
                    <input type="text"
                        className={"form-control form-control-lg " + ((error) ? "border-danger" : "")}
                        name="sums"
                        value={filters.sums}
                        onChange={onChange}
                        placeholder="ex: 10, 12-14" />
                </div>
            </div>
            <div className="row">
                <div className="col mb-3">
                    <label className="form-label">Included</label>
                    <DigitFilter variant={INCLUDED_VARIANT}
                        name="includedDigits"
                        value={filters.includedDigits}
                        onChange={onDigitFilterChange} />
                </div >
                <div className="col mb-3">
                    <label className="form-label">Excluded</label>
                    <DigitFilter variant={EXCLUDED_VARIANT}
                        name="excludedDigits"
                        value={filters.excludedDigits}
                        onChange={onDigitFilterChange} />
                </div>
            </div>
            <div className="mt-4">
                <button className="btn btn-lg btn-success" onClick={onSubmit}>
                    Show Possiblities
                </button>
            </div>
        </form >
    )
}
