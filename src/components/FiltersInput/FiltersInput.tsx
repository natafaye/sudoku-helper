import { useState } from 'react'
import { parseNumberInput } from '../../utilities/parser';
import { EXCLUDED_VARIANT, INCLUDED_VARIANT } from '../../utilities/constants'
import DigitFilter from './DigitFilter'
import { type Filters } from '../../types';

type Props = {
    values: Filters
    onChange: (filters: Filters) => void
}

export default function FiltersInput({ values, onChange }: Props) {
    const [parseError, setParseError] = useState(false);

    const onFilterChange = (name: string, value: number[] | string) => {
        let sums = values.sums
        // Parse sums from a string to an array of numbers
        if(name === "sumString" && typeof value === "string") {
            sums = parseNumberInput(value);
            setParseError(!sums)
        }
        onChange({ ...values, [name]: value, sums })
    }

    return (
        <form className="mt-2 me-3 mb-5">
            <div className="row">
                <div className="col mb-3">
                    <label className="form-label"># of Squares</label>
                    <input type="number"
                        className="form-control form-control-lg"
                        name="numSquares"
                        value={values.numSquares}
                        onChange={(event) => onFilterChange(event.target.name, event.target.value)} />
                </div>
                <div className="col mb-3">
                    <label className="form-label">Sum</label>
                    <input type="text"
                        className={"form-control form-control-lg " + ((parseError) ? "border-danger" : "")}
                        name="sumString"
                        value={values.sumString}
                        onChange={(event) => onFilterChange(event.target.name, event.target.value)}
                        placeholder="ex: 10, 12-14" />
                </div>
            </div>
            <div className="row">
                <div className="col mb-3">
                    <label className="form-label">Included</label>
                    <DigitFilter variant={INCLUDED_VARIANT}
                        name="includedDigits"
                        value={values.includedDigits}
                        onChange={onFilterChange} />
                </div >
                <div className="col mb-3">
                    <label className="form-label">Excluded</label>
                    <DigitFilter variant={EXCLUDED_VARIANT}
                        name="excludedDigits"
                        value={values.excludedDigits}
                        onChange={onFilterChange} />
                </div>
            </div>
        </form >
    )
}
