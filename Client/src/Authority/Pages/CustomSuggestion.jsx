import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { WorkContext } from '../../ContextAPI/WorkContext';
import CustomApplicant from '../Components/CustomApplicant';
import PageNav from '../../Global/Components/PageNav';

const CustomSuggestion = () => {
  const { getCustomSuggestion, customSuggestions,setCustomSuggestions } = useContext(WorkContext);
  const { '*': queryParam } = useParams();
  const [key, value] = queryParam?.split('=') || [];


  const [currentSuggestionPage, setCurrentSuggestionPage] = useState(1);
  const suggestionsPerPage = 2;
    const suggestionEntries = Array.isArray(customSuggestions) ? customSuggestions : [];
  const indexOfLastSuggestion = currentSuggestionPage * suggestionsPerPage;
  const indexOfFirstSuggestion = indexOfLastSuggestion - suggestionsPerPage;
  const currentSuggestions = suggestionEntries.slice(indexOfFirstSuggestion, indexOfLastSuggestion);
  const totalSuggestionPages = Math.ceil(suggestionEntries.length / suggestionsPerPage);

  // Fetch new suggestions when URL param changes
  useEffect(() => {
    if (key && value) {
      getCustomSuggestion(`${key}=${value}`);
    }
  }, [key, value]);


  // Reset page when new data arrives
  useEffect(() => {
    setCustomSuggestions(customSuggestions);
    setCurrentSuggestionPage(1);
  }, [customSuggestions]);



  return (
    <div className='w-[90%] mx-auto py-6 z-0'>
      {currentSuggestions.length > 0 ? (
        currentSuggestions.map((item, index) => (
          <CustomApplicant key={index} data={item} />
        ))
      ) : (
        <p className="text-center text-white mt-5">No matching applicants found.</p>
      )}

      {totalSuggestionPages > 1 && (
        <div className='py-2 bg-gray-900 mt-5 rounded-xl'>
          <PageNav
            currentPage={currentSuggestionPage}
            totalPages={totalSuggestionPages}
            incrementer={setCurrentSuggestionPage}
          />
        </div>
      )}
    </div>
  );
};

export default CustomSuggestion;
