import { useEffect, useState } from 'react'
import { Project, Task, trabalhandoService } from './services/trabalhando-service';
import './App.css'
import Navbar from './Navbar';

function App() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    trabalhandoService.getProjects().then((projects) => setProjects(projects))
  }, [])

  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex flex-col space-y-4 items-center mt-4">
        {projects.map(p => (
          <>
            <div key={p.id} className="w-3/4 px-8 py-4 space-y-2 bg-emerald-400 rounded-lg cursor-pointer">
              <div className="w-full flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">{p.name}</h1>
                <h2 className="text-xl font-bold text-white">10 hours last 2 weeks</h2>
              </div>
              <div className="w-full flex items-center justify-between">
                <div>
                  <p className="text-lg">9 tasks in progress</p>
                  <p className="text-lg">2 tasks pending</p>
                </div>
                <p className="text-lg">Hourly value: ${p.hour_value}</p>
              </div>
            </div>
            <div className='w-1/2 space-y-2 cursor-pointer'>
              {p.tasks.map(t => (
                <div className={`${getTaskBg(t)} rounded px-8 py-4`}>
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-white">{p.name}</h1>
                    <h2 className="text-xl font-bold text-white">Status: {t.status}</h2>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">10 hours spent so far</h2>
                    <p>Click for details</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ))
        }
      </div >
    </>
  )
}

function getTaskBg(task: Task) {
  switch (task.status) {
    case 'doing':
      return 'card-doing'
    case 'done':
      return 'card-done'
    case 'todo':
      return 'card-todo'
  }
}

export default App
