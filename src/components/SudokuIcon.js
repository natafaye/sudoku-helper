import React from 'react'

export default function SudokuIcon({ variant = "primary", size = 4 }) {
    return (
        <div style={{ borderRadius: "5% 50% 5% 50%" }} className={"text-white p-3 fs-" + size + " bg-" + variant}>
            <div className="d-flex text-nowrap overflow-hidden">
                <div>1</div>
                <div className={"text-" + variant}>----.</div>
            </div>
            <div className="d-flex text-nowrap overflow-hidden">
                <div className={"text-" + variant}>----.</div>
                <div>9</div>
            </div>
        </div>
    )
}
