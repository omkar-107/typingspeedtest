// reducers/typingReducer.js
const initialState = {
    wordsCorrect: 0,
  };
  
  const typingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_WORDS_CORRECT':
        return {
          ...state,
          wordsCorrect: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default typingReducer;
  