import { useReducer, useState } from 'react';
import { INITIAL_NUM_SQUARES, INITIAL_SUM } from './utilities/constants';
import { initialTabState, SET_CURRENT_TAB_DATA, tabReducer, type Tab } from './utilities/tabReducer';
import { generatePossibilities } from './utilities/generator';
import GeneratorFilters from './components/GeneratorFilters';
import PossibilitiesList from './components/PossibilitiesList';
import SudokuIcon from './components/SudokuIcon';
import TabBar from './components/TabBar';
import type { PossibilityGroup, Filters, FiltersParsed } from './types';

const initialFilters = (): Filters => ({
    numSquares: INITIAL_NUM_SQUARES,
    sumString: INITIAL_SUM,
    excludedDigits: [],
    includedDigits: [],
})

const getInitialTabData = () => ({
    filters: initialFilters(),
    possibilityGroups: []
})

function App() {
    const [tabState, tabDispatch] = useReducer(tabReducer, initialTabState(getInitialTabData))
    const [filters, setFilters] = useState(initialFilters)
    const [possibilityGroups, setPossibilityGroups] = useState<PossibilityGroup[]>([]);

    const updateFilters = (newFilters: FiltersParsed) => {
        const groups = newFilters.sums.map(sum => ({
            sum: sum,
            possibilities: generatePossibilities(
                sum,
                newFilters.numSquares,
                newFilters.excludedDigits,
                newFilters.includedDigits
            )
        }))

        setFilters(newFilters)
        setPossibilityGroups(groups);
        
        tabDispatch({ type: SET_CURRENT_TAB_DATA, payload: {
            filters: newFilters,
            possibilityGroups: groups
        }})
    }

    const onTabSelect = (tab: Tab) => {
        setFilters(tab.data.filters);
        setPossibilityGroups(tab.data.possibilityGroups);
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
                    <GeneratorFilters onSubmitFilters={updateFilters} />
                </div>
                <div className="col">
                    <TabBar 
                        state={tabState} 
                        dispatch={tabDispatch}
                        onTabSelect={onTabSelect}
                        makeTitle={(tab) => tab.data.filters.sumString + " in " + tab.data.filters.numSquares} />
                    <PossibilitiesList
                        possibilityGroups={possibilityGroups}
                        excludedDigits={filters.excludedDigits}
                        includedDigits={filters.includedDigits} />
                </div>
            </div>
        </div>
    );
}

export default App;
