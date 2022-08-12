import React, { useState } from 'react';
import { generatePossibilities } from './utilities/generator';
import GeneratorFilters from './components/GeneratorFilters';
import PossibilitiesList from './components/PossibilitiesList';
import SudokuIcon from './components/SudokuIcon';

function App() {
  const [possibilities, setPossibilities] = useState([]);
  const [excludedDigits, setExcludedDigits] = useState([]);
  const [includedDigits, setIncludedDigits] = useState([]);

  const showPossibilities = (filters) => {
    setPossibilities(generatePossibilities(
      filters.sum - filters.includedDigits.reduce((t, d) => t + d, 0), 
      filters.numSquares - filters.includedDigits.length, 
      [...filters.excludedDigits, ...filters.includedDigits],
    ).map(p => [...p, ...filters.includedDigits].sort((a, b) => a - b)));
    setExcludedDigits(filters.excludedDigits);
    setIncludedDigits(filters.includedDigits);
  }

  return (
    <div className="container-fluid container-lg">
      <div className="row">
        <div className="col">
          <h1 className="display-2 my-4 d-flex align-items-center">
            <SudokuIcon variant="success" size="4"/>
            <span className="d-inline-block ms-4">Sudoku Helper</span>
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-md-5 col-lg-4">
          <GeneratorFilters onSubmitFilters={showPossibilities}/>
        </div>
        <div className="col">
          <PossibilitiesList 
            possibilities={possibilities} 
            excludedDigits={excludedDigits}
            includedDigits={includedDigits} />
        </div>
      </div>
    </div>
  );
}

export default App;
