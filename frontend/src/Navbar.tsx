import { GiWarPick } from 'react-icons/gi'

function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-3 shadow">
      <div className="flex items-center flex-shrink-0 mr-6">
        <div className="flex space-x-1 items-center">
          <GiWarPick size={20} />
          <span className="font-semibold text-xl tracking-tight">
            Trabalhando
          </span>
        </div>
      </div>
    </nav >
  )
}

export default Navbar
