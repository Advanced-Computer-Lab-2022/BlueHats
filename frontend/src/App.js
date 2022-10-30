import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Instructor from './pages/Instructor';
import Preview from './pages/Preview';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Navbar></Navbar>
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={<Home/>}
            />
            <Route
              path="/instructor"
              element={<Instructor/>}
            />
             <Route
              path="/course/preview"
              element={<Preview/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
