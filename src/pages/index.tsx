import { GetServerSideProps } from 'next'
import { signIn, signOut, useSession } from 'next-auth/client'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { Evento } from '../components/Evento'
import { Nav } from '../components/Nav'
import { LoginContext } from '../contexts/LoginContext'
import { connectToDatabase } from '../../utils/mongodb'
import useSWR from 'swr'
import api from '../../utils/api'

export default function Index({ eventos }) {

  const {session, loading} = useContext(LoginContext);
  const { data, error, isValidating } = useSWR(`/api/eventos/`, api);

  return (
    <div>
      {session && data &&
        (
          <div className="bg-gray-100 min-h-screen">
            <p className="flex-1 p-6 text-2xl text-gray-900">Bem vindo {session.user.name}</p>
            <div className="
              grid grid-cols-1 gap-y-10
              sm:grid-cols-2 sm:gap-6 
              lg:grid-cols-3 md:gap-8
              justify-items-center">

              {data.data.map((evento, index) => (

                <Evento key={evento._id}
                  id={evento._id}
                  titulo={evento.titulo}
                  data={evento.data}
                  horaInicio={evento.horaInicio}
                  horaFim={evento.horaFim}
                  descricao={evento.descricao}
                  convidados={evento.convidados}
                />
              ))}

            </div>
          </div>
        )
      }
      {session && !data && !loading && !isValidating &&
        (
          <div className="bg-gray-100 p-14 h-screen flex flex-col relative">
            <p className="text-center text-2xl">Opa, parece que você não tem eventos ainda...</p>
            <p className="text-center text-2xl mt-5">Porque não criar um agora mesmo?</p>
            <div className="grid grid-cols-1 px-5 py-2 gap-x-4 max-w-md self-center">
              <a href="/create" className="bg-green-300 p-4 mt-5 rounded-xl self-center hover:bg-green-400 duration-200">
                Vamos lá
                </a>
            </div>
          </div>
        )
      }
      {!session && !isValidating && (
          <div className="bg-gray-100 p-14 h-screen flex justify-center relative">
            <p className="text-center text-2xl">Faça login para ver seus eventos!</p>
          </div>
        )
      }
      {isValidating &&(
        <div className="bg-gray-100 h-screen ">
      </div>

      )}


    </div >


  )
}
