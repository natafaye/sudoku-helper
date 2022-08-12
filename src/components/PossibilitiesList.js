import React from 'react'
import { DIGITS, EXCLUDED_VARIANT, INCLUDED_VARIANT } from '../utilities/constants'

const getCellClass = (digit, excludedDigits, includedDigits) => {
    if(excludedDigits.includes(digit)) return "table-" + EXCLUDED_VARIANT;
    if(includedDigits.includes(digit)) return "table-" + INCLUDED_VARIANT;
    return "";
}

export default function PossibilitiesList({ possibilities, excludedDigits, includedDigits }) {
  return (
    <>
        <table className="table table-striped">
            <thead>
                <tr>
                    { DIGITS.map(d => 
                        <th key={d} className={getCellClass(d, excludedDigits, includedDigits)}>
                            {d}
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                { possibilities.map(p =>
                    <tr key={p.join("")}>
                        { DIGITS.map(d => 
                            <td key={d} className={getCellClass(d, excludedDigits, includedDigits)}>
                                { p.includes(d) ? d : ""}
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    </>
  )
}
