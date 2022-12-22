import { GiWarPick } from 'react-icons/gi'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-3 shadow">
      <div className="flex items-center flex-shrink-0 mr-6">
        <div className="flex space-x-1 items-center">
          <GiWarPick size={20} />
          <Link className='font-semibold text-xl tracking-tight' to="/">
            Trabalhando
          </Link>
        </div>
      </div>
    </nav >
  )
}

export default Navbar
