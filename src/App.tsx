import FiltersInput from './components/FiltersInput/FiltersInput';
import SudokuIcon from './components/SudokuIcon';
import ResultsList from './components/ResultsList';
import { TabBar, useTabBar } from './components/TabBar';
import type { Filters, TabData } from './types';
import { generatePossibilities } from './utilities/generator';

const getInitialTabData = (): TabData => ({
    filters: {
        numSquares: 2,
        sumString: "10",
        sums: [10],
        excludedDigits: [],
        includedDigits: [],
    },
    results: [{ sum: 10, possibilities: generatePossibilities(10, 2, [], []) }]
})

function App() {
    const { currentData, setCurrentData, tabBarProps } = useTabBar(getInitialTabData)

    const updateFilters = (filters: Filters) => {
        const results = !filters.sums ? [] : filters.sums.map(sum => ({
            sum: sum,
            possibilities: generatePossibilities(
                sum,
                filters.numSquares,
                filters.excludedDigits,
                filters.includedDigits
            )
        }))
        setCurrentData({ filters, results })
    }

    return (
        <div className="container-fluid container-lg">
            <div className="row">
                <div className="col">
                    <h1 className="display-2 my-4 d-flex align-items-center">
                        <SudokuIcon variant="success" size="4" />
                        <span className="d-inline-block ms-4">Sudoku Helper</span>
                    </h1>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 col-md-5 col-lg-4">
                    <FiltersInput values={currentData.filters} onChange={updateFilters} />
                </div>
                <div className="col">
                    <TabBar
                        {...tabBarProps}
                        makeTitle={(tab) => tab.data.filters.sumString + " in " + tab.data.filters.numSquares} />
                    <ResultsList
                        results={currentData.results}
                        excludedDigits={currentData.filters.excludedDigits}
                        includedDigits={currentData.filters.includedDigits} />
                </div>
            </div>
        </div>
    );
}

export default App;
