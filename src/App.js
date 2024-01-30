
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from "./TodoList";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TodoList />} />
            </Routes>
        </Router>
    );
}
export default App;
