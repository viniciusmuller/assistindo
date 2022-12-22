import { BsFillHouseDoorFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

interface BreadcrumbProps {
  children: React.ReactNode
}

export function Breadcrumb(props: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-2">
        {props.children}
      </ol>
    </nav>
  )
}

interface BreadcrumbItemProps {
  children: React.ReactNode
}

export function BreadcrumbItem(props: BreadcrumbItemProps) {
  return (
    <li className="inline-flex items-center text-sm font-medium text-gray-500 space-x-1">
      {props.children}
    </li>
  )
}

export function BreadcrumbHome() {
  return (
    <BreadcrumbItem>
      <Link to="/" className='flex space-x-1 items-center' >
        <BsFillHouseDoorFill />
        <span>Projects</span>
      </Link>
    </BreadcrumbItem>
  )
}
