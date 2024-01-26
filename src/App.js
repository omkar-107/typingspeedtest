import logo from './logo.svg';
import './App.css';
import TypingTest from './Typing';
import { Provider } from 'react-redux';
import store from './Store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <TypingTest/>
      </Provider>
    
    </div>
  );
}

export default App;
