import { CakeIcon, Cog6ToothIcon, StarIcon } from '@heroicons/react/24/outline'
import ActiveLink from '../components/activeLink'
import './globals.css'
import Toaster from '@/components/toaster';


export const metadata = {
  title: 'Sample',
  description: 'Sample',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <>
          <header
            className="h-64 bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1536620363087-5fe8dd6c30d8?ixid=Mnw0MzY1MTd8MHwxfHNlYXJjaHw4fHxtdWx0aXBsZXMlMjBjYWtlc3xlbnwwfDB8fHwxNjgxNTk2NjI1&ixlib=rb-4.0.3&w=1200&h=600&q=40&fit=crop)` }}>
            <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
              <h1 className="text-5xl text-white font-bold">Cake Recipes</h1>
            </div>
          </header>
          <div className="flex flex-col md:flex-row">
            <div className="bg-gray-800 text-gray-300 md:max-w-fit md:pr-10" >
              <nav className="md:block hidden">
                <ul className="py-4">
                  <li className="px-6 py-3">
                    <ActiveLink href='/'><CakeIcon className=' mr-3 h-5 w-5 shrink-0 stroke-2 lg:h-6 lg:w-6' />Home</ActiveLink>
                  </li>
                  <li className="px-6 py-3">
                    <ActiveLink href='/favorites'><StarIcon className='mr-3 h-5 w-5 shrink-0 stroke-2 lg:h-6 lg:w-6' />Favorites</ActiveLink>
                  </li>
                  <li className="px-6 py-3">
                    <ActiveLink href='/settings'><Cog6ToothIcon className='mr-3 h-5 w-5 shrink-0 stroke-2 lg:h-6 lg:w-6' />Settings</ActiveLink>
                  </li>
                  <li className="px-6 py-3">
                    <ActiveLink href='/ssg/1'>SSG 1</ActiveLink>
                  </li>
                  <li className="px-6 py-3">
                    <ActiveLink href='/ssg/2'>SSG 2</ActiveLink>
                  </li>
                </ul>
              </nav>
              <div className="md:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-800 hover:text-white">
                  <svg
                    className="h-3 w-3 fill-current"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  </svg>
                  <span className="ml-2 font-medium">Menu</span>
                </button>
              </div>
            </div>
            <div className="bg-gray-200 md:flex-1">
              <div className="container mx-auto p-4">
                {children}
              </div>
            </div>
          </div>
          <Toaster />
        </>
      </body>
    </html>
  )
}
