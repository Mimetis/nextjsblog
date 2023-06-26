import { AiOutlineHome, AiOutlineSetting, AiFillTwitterCircle, AiFillPlusCircle, AiFillGithub } from 'react-icons/ai';
import './globals.css'
import Toaster from '@/components/toaster';
import Link from 'next/link';
import SearchRecipe from '@/components/searchRecipe';
import ActiveLink from '@/components/activeLink';

export const metadata = {
  title: 'Sample',
  description: 'Sample',
}

export default function RootLayout({ children }) {
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
          <div className="flex flex-col">
            <div className="flex bg-gray-800 text-gray-300 " >
              <div className='flex flex-row items-center gap-4'>

                <ActiveLink href="/" 
                  className="flex border rounded text-xl text-white  hover:text-slate-300 border-gray-800"
                  activeClassName='text-gray-100 font-bold'>
                  <AiOutlineHome className='mr-2' size={28} /> <span className='max-md:hidden ml-2'>Home</span>
                </ActiveLink>
                <ActiveLink href={`/settings`}
                  className="flex border rounded text-xl text-white  hover:text-slate-300 border-gray-800"
                  activeClassName='text-gray-100 font-bold'>
                  <AiOutlineSetting className='mr-2' size={28} /><span className='max-md:hidden ml-2'>Settings</span>
                </ActiveLink>
              </div>
              <div className='ml-auto mr-auto w-3/5 md:w-80 lg:w-[450px] xl:w-[600px]'>
                <SearchRecipe />
              </div>
              <div className='flex items-center gap-4 '>
                <Link href={`/recipes/new`} className="flex border rounded text-xl text-white  hover:text-slate-300 border-gray-800">
                  <AiFillPlusCircle className='mr-2' size={28} /><span className='max-md:hidden ml-2'>Add</span>
                </Link>
                <Link href={`https://www.github.com/mimetis`} target='_blank'
                  className="max-md:hidden border rounded text-xl text-white  hover:text-slate-300 border-gray-800">
                  <AiFillGithub size={28} />
                </Link>
                <Link href={`https://www.twitter.com/sebpertus`} target='_blank'
                  className="max-md:hidden rounded text-xl text-white  hover:text-slate-300 border-gray-800">
                  <AiFillTwitterCircle size={30} />
                </Link>

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
