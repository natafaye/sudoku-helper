export type Filters = {
    sumString: string
    sums?: number[] | null
    numSquares: number
    excludedDigits: number[]
    includedDigits: number[]
}

export type PossibilityGroup = {
    sum: number
    possibilities: number[][]
}

export type TabData = {
    filters: Filters,
    results: PossibilityGroup[]
}