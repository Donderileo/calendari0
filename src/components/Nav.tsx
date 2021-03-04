import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext';


export function Nav() {
    const session = useContext(LoginContext);

    return (
        <nav>
            <ul className="sm:flex sm:justify-between items-center px-8 py-3 sm:py-6  bg-purple-200">
                <li className="justify-center flex">
                    <Link href="/">
                        <a className=" text-blue-900 no-underline text-2xl ">Meus Eventos</a>
                    </Link>
                </li>
                <ul className="flex justify-between items-center mt-5 sm:mt-1 sm:space-x-5 sm:space-x-10">
                    <li>
                        <Link href="/create">
                            <a className="bg-blue-400 p-2  sm:p-3 text-md sm:text-xl rounded-3xl text-white no-underline hover:bg-blue-900 duration-200">Novo Evento</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/convites">
                            <a className="bg-blue-400 p-2  sm:p-3 text-md sm:text-xl rounded-3xl text-white no-underline hover:bg-blue-900 duration-200">Convites</a>
                        </Link>
                    </li>
                    <li>
                        {!session &&
                            <button className="bg-green-300 p-1  sm:p-3 rounded-3xl text-white no-underline hover:bg-green-400 duration-200 text-md sm:text-xl" onClick={() => signIn('auth0')}>Log in</button>
                        }
                        {session &&
                            <button className="bg-red-300 p-1  sm:p-3 rounded-3xl text-white no-underline hover:bg-red-400 duration-200 text-md sm:text-xl" onClick={() => signOut()}>Log out</button>
                        }
                    </li>
                </ul>
            </ul>
        </nav>
    )
}