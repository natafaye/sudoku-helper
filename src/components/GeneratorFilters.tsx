import { useState, type ChangeEvent, type MouseEvent } from 'react'
import { parseNumberInput } from '../utilities/parser';
import { EXCLUDED_VARIANT, INCLUDED_VARIANT, INITIAL_NUM_SQUARES, INITIAL_SUM } from '../utilities/constants'
import DigitFilter from './DigitFilter'
import { type FiltersParsed } from '../types';

type Props = {
    onSubmitFilters: (filters: FiltersParsed) => void
}

export default function GeneratorFilters({ onSubmitFilters }: Props) {
    const [parseError, setParseError] = useState(false);
    const [filterData, setFilterData] = useState({
        numSquares: INITIAL_NUM_SQUARES.toString(),
        sumString: INITIAL_SUM,
        excludedDigits: [],
        includedDigits: []
    })

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFilterData({ ...filterData, [event.target.name]: event.target.value })
    }

    const onDigitFilterChange = (name: string, value: number[]) => {
        setFilterData({ ...filterData, [name]: value })
    }

    const onSubmit = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        // Parse from a string to an array of numbers
        const parsedSums = parseNumberInput(filterData.sumString);
        
        let parseError = true;

        if(parsedSums) {
            parseError = false;
            onSubmitFilters({
                ...filterData,
                numSquares: parseInt(filterData.numSquares),
                sums: parsedSums,
                includedDigits: filterData.includedDigits.map(d => parseInt(d)),
                excludedDigits: filterData.excludedDigits.map(d => parseInt(d))
            })
        }

        setParseError(parseError);
    }

    return (
        <form className="mt-2 me-3 mb-5">
            <div className="row">
                <div className="col mb-3">
                    <label className="form-label"># of Squares</label>
                    <input type="number"
                        className="form-control form-control-lg"
                        name="numSquares"
                        value={filterData.numSquares}
                        onChange={onChange} />
                </div>
                <div className="col mb-3">
                    <label className="form-label">Sum</label>
                    <input type="text"
                        className={"form-control form-control-lg " + ((parseError) ? "border-danger" : "")}
                        name="sumString"
                        value={filterData.sumString}
                        onChange={onChange}
                        placeholder="ex: 10, 12-14" />
                </div>
            </div>
            <div className="row">
                <div className="col mb-3">
                    <label className="form-label">Included</label>
                    <DigitFilter variant={INCLUDED_VARIANT}
                        name="includedDigits"
                        value={filterData.includedDigits}
                        onChange={onDigitFilterChange} />
                </div >
                <div className="col mb-3">
                    <label className="form-label">Excluded</label>
                    <DigitFilter variant={EXCLUDED_VARIANT}
                        name="excludedDigits"
                        value={filterData.excludedDigits}
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
