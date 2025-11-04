import { DIGITS } from '../../utilities/constants'
import "./DigitFilter.css"

type Props = {
    name: string
    value: number[]
    onChange: (name: string, newValue: number[]) => void
    variant: "primary" | "success" | "warning" | "info" | "danger"
}

export default function DigitFilter({ name, value, onChange, variant = "primary" }: Props) {

    const onCheckChanged = (digit: number) => {
        const newValue = (value.includes(digit)) ? value.filter(d => d !== digit) : [...value, digit]
        onChange(name, newValue)
    }

    const clearDigits = () => {
        onChange(name, [])
    }

    return (
        <div className="btn-group flex-wrap font-monospace" role="group" aria-label={name}>
            {DIGITS.map(digit =>
                <div key={digit}>
                    <input type="checkbox"
                        className="btn-check"
                        checked={value.includes(digit)}
                        id={"btn-check-" + name + digit}
                        onChange={() => onCheckChanged(digit)}
                        autoComplete="off"
                    />
                    <label
                        className={"btn flex-grow-0 btn-outline-" + variant}
                        htmlFor={"btn-check-" + name + digit}
                    >
                        {digit}
                    </label>
                </div>
            )}
            <div>
                <button
                    className={"btn flex-grow-0 btn-outline-" + variant}
                    type="button"
                    onClick={clearDigits}
                >
                    X
                </button>
            </div>
        </div>
    )
}
