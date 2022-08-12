import { generatePossibilities } from "./generator"

describe("generatePossibilities", () => {
    it("works with 1 square", () => {
        expect(generatePossibilities(1, 1)).toEqual([[1]])
        expect(generatePossibilities(5, 1)).toEqual([[5]])
        expect(generatePossibilities(9, 1)).toEqual([[9]])
    })
    
    it("works with 2 squares", () => {
        expect(generatePossibilities(3, 2)).toEqual([[1,2]])
        expect(generatePossibilities(7, 2)).toEqual([[1,6],[2,5],[3,4]])
        expect(generatePossibilities(10, 2)).toEqual([[1,9],[2,8],[3,7],[4,6]])
        expect(generatePossibilities(15, 2)).toEqual([[6,9],[7,8]])
        expect(generatePossibilities(17, 2)).toEqual([[8,9]])
    })

    it("works with 3 squares", () => {
        expect(generatePossibilities(6, 3)).toEqual([[1,2,3]])
        expect(generatePossibilities(11, 3)).toEqual([[1,2,8],[1,3,7],[1,4,6],[2,3,6],[2,4,5]])
        expect(generatePossibilities(15, 3)).toEqual([[1,5,9],[1,6,8],[2,4,9],[2,5,8],[2,6,7],[3,4,8],[3,5,7],[4,5,6]])
        expect(generatePossibilities(23, 3)).toEqual([[6,8,9]])
        expect(generatePossibilities(24, 3)).toEqual([[7,8,9]])
    })

    it("works with 4 squares", () => {
        expect(generatePossibilities(10, 4)).toEqual([[1,2,3,4]])
        expect(generatePossibilities(17, 4)).toEqual([[1,2,5,9],[1,2,6,8],[1,3,4,9],[1,3,5,8],[1,3,6,7],[1,4,5,7],[2,3,4,8],[2,3,5,7],[2,4,5,6]])
        expect(generatePossibilities(25, 4)).toEqual([[1,7,8,9],[2,6,8,9],[3,5,8,9],[3,6,7,9],[4,5,7,9],[4,6,7,8]])
        expect(generatePossibilities(29, 4)).toEqual([[5,7,8,9]])
    })

    it("works with 5 squares", () => {
        expect(generatePossibilities(16, 5)).toEqual([[1,2,3,4,6]])
        expect(generatePossibilities(31, 5)).toEqual([[1,6,7,8,9],[2,5,7,8,9],[3,4,7,8,9],[3,5,6,8,9],[4,5,6,7,9]])
    })

    it("works with 6 squares", () => {
        expect(generatePossibilities(24, 6)).toEqual([[1,2,3,4,5,9],[1,2,3,4,6,8],[1,2,3,5,6,7]])
        expect(generatePossibilities(39, 6)).toEqual([[4,5,6,7,8,9]])
    })

    it("works with 7 squares", () => {
        expect(generatePossibilities(30, 7)).toEqual([[1,2,3,4,5,6,9],[1,2,3,4,5,7,8]])
        expect(generatePossibilities(38, 7)).toEqual([[1,2,5,6,7,8,9],[1,3,4,6,7,8,9],[2,3,4,5,7,8,9]])
    })

    it("works with 8 squares", () => {
        expect(generatePossibilities(36, 8)).toEqual([[1,2,3,4,5,6,7,8]])
        expect(generatePossibilities(41, 8)).toEqual([[1,2,3,5,6,7,8,9]])
    })

    it("works with 9 squares", () => {
        expect(generatePossibilities(45, 9)).toEqual([[1,2,3,4,5,6,7,8,9]])
    })

    it("returns an empty array for impossible scenarios", () => {
        expect(generatePossibilities(54, 10)).toEqual([])
        expect(generatePossibilities(9, 4)).toEqual([])
        expect(generatePossibilities(36, 5)).toEqual([])
        expect(generatePossibilities(1, 0)).toEqual([])
        expect(generatePossibilities(-20, 4)).toEqual([])
        expect(generatePossibilities(5, -6)).toEqual([])
    })
    
    it("works with excluded digits", () => {
        expect(generatePossibilities(10, 2, [3])).toEqual([[1,9],[2,8],[4,6]])
        expect(generatePossibilities(15, 2, [1])).toEqual([[6,9],[7,8]])
        expect(generatePossibilities(17, 4, [1,5])).toEqual([[2,3,4,8]])
        expect(generatePossibilities(16, 5, [1])).toEqual([])
        expect(generatePossibilities(38, 7, [0,20])).toEqual([[1,2,5,6,7,8,9],[1,3,4,6,7,8,9],[2,3,4,5,7,8,9]])
    })
    
    it("works with included digits", () => {
        expect(generatePossibilities(9, 1, [], [3])).toEqual([])
        expect(generatePossibilities(7, 2, [], [4])).toEqual([[3,4]])
        expect(generatePossibilities(17, 4, [], [1,8])).toEqual([[1,2,6,8],[1,3,5,8]])
        expect(generatePossibilities(24, 6, [], [8])).toEqual([[1,2,3,4,6,8]])
    })
    
    it("works with included and excluded digits", () => {
        expect(generatePossibilities(7, 2, [3], [4])).toEqual([])
        expect(generatePossibilities(17, 4, [6], [1,8])).toEqual([[1,3,5,8]])
        expect(generatePossibilities(38, 7, [0,20], [1])).toEqual([[1,2,5,6,7,8,9],[1,3,4,6,7,8,9]])
    })
})