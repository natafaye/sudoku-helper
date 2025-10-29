export type Filters = {
    sumString: string
    numSquares: number
    excludedDigits: number[]
    includedDigits: number[]
}

export type FiltersParsed = Filters & {
    sums: number[]
}

export type PossibilityGroup = {
    sum: number
    possibilities: number[][]
}

export type TabData = {
    filters: Filters,
    possibilityGroups: PossibilityGroup[]
}