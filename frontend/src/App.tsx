import './App.css'
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import Index from './Index';
import ProjectPage from './ProjectPage';
import TaskPage from './TaskPage';
import { Toaster } from 'react-hot-toast';
import CreateTaskPage from './CreateTaskPage';

function NoMatch() {
  return (
    <h1 className='text-3xl font-bold p-3'>Not found</h1>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route index element={<Index />} />
        <Route path="projects/:projectId" element={<ProjectPage />} />
        <Route path="projects/:projectId/tasks/new" element={<CreateTaskPage />} />
        <Route path="projects/:projectId/tasks/:taskId" element={<TaskPage />} />

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  )
}

export default App
