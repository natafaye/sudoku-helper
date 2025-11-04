import type { PossibilityGroup } from '../types';
import { DIGITS, EXCLUDED_VARIANT, INCLUDED_VARIANT } from '../utilities/constants'

type Props = {
    results: PossibilityGroup[]
    excludedDigits: number[]
    includedDigits: number[]
}

export default function ResultsList({ results, excludedDigits, includedDigits }: Props) {
    const getCellClass = (digit: number) => {
        if (excludedDigits.includes(digit)) return "table-" + EXCLUDED_VARIANT;
        if (includedDigits.includes(digit)) return "table-" + INCLUDED_VARIANT;
        return "";
    }

    return (
        <table className="table table-striped table-borderless text-center mt-2">
            <thead>
                <tr>
                    <th></th>
                    {DIGITS.map(d =>
                        <th key={d} className={getCellClass(d)}>
                            {d}
                        </th>
                    )}
                </tr>
            </thead>
            <tbody className={"border-dark border-bottom"}>
                {results.map(group =>
                    group.possibilities.map((p, index) =>
                        <tr key={p.join("")} className={index === 0 ? "border-dark border-top" : ""}>
                            <td className="table-light">{group.sum}</td>
                            {DIGITS.map(d =>
                                <td key={d} className={getCellClass(d)}>
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
