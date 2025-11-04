import type { PossibilityGroup } from '../types';
import { DIGITS, EXCLUDED_VARIANT, INCLUDED_VARIANT } from '../utilities/constants'

const getCellClass = (digit: number, excludedDigits: number[], includedDigits: number[]) => {
    if (excludedDigits.includes(digit)) return "table-" + EXCLUDED_VARIANT;
    if (includedDigits.includes(digit)) return "table-" + INCLUDED_VARIANT;
    return "";
}

type Props = {
    results: PossibilityGroup[]
    excludedDigits: number[]
    includedDigits: number[]
}

export default function ResultsList({ results, excludedDigits, includedDigits }: Props) {
    const dividerBorders = "border-dark border-1";
    return (
        <table className="table table-striped table-borderless text-center mt-2">
            <thead>
                <tr>
                    <th></th>
                    {DIGITS.map(d =>
                        <th key={d} className={getCellClass(d, excludedDigits, includedDigits)}>
                            {d}
                        </th>
                    )}
                </tr>
            </thead>
            <tbody className={dividerBorders + " border-bottom"}>
                {results.map(group =>
                    group.possibilities.map((p, index) =>
                        <tr key={p.join("")} className={index === 0 ? dividerBorders + " border-top" : ""}>
                            <td className="table-light">{group.sum}</td>
                            {DIGITS.map(d =>
                                <td key={d} className={getCellClass(d, excludedDigits, includedDigits)}>
                                    {p.includes(d) ? d : ""}
                                </td>
                            )}
                        </tr>
                    )
                )}
            </tbody>
        </table>
    )
}
