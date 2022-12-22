import './App.css'
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import Index from './Index';
import ProjectPage from './ProjectPage';
import TaskPage from './TaskPage';

function NoMatch() {
  return (
    <h1>not found</h1>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
          <Route index element={<Index />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/task/:id" element={<TaskPage />} >
            {/* <Route path="about" element={<About />} /> */}
            {/* <Route path="dashboard" element={<Dashboard />} /> */}

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
      </Routes>
    </>
  )
}

export default App
