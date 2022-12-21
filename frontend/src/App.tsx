import { useEffect, useState } from 'react'
import { Project, trabalhandoService, WorkSpan } from './services/trabalhando-service';
import './App.css'

function App() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    trabalhandoService.getProjects().then((projects) => setProjects(projects))
  }, [])

  return (
    <div className="app">
      {projects.map(p => (
        <p key={p.id}>{p.name}</p>
      ))}
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  )
}

export default App
