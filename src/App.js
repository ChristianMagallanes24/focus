
import './App.css';
import Pomodoro from './components/Pomodoro';
import TodoList from './components/TodoList';


function App() {
  return (
    <div className="App">
      <TodoList/>
      <Pomodoro />
    </div>
  );
}

export default App;
