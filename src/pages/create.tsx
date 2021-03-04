import { Session } from 'inspector'
import { signIn, signOut, useSession } from 'next-auth/client'
import Head from 'next/head'
import { FormEvent, useContext, useState } from 'react'
import { Convite } from '../components/Convite'
import { Evento } from '../components/Evento'
import { Nav } from '../components/Nav'
import { LoginContext } from '../contexts/LoginContext'
import axios from 'axios';

export default function Convites(props) {

    const session = useContext(LoginContext);
    const [titulo, setTitulo] = useState('');
    const [data, setData] = useState(dataAtualFormatada());
    const [horaInicio, setHoraInicio] = useState('00:00');
    const [horaFim, setHoraFim] = useState('23:59');
    const [descricao, setDescricao] = useState('');
    const [convidados, setConvidados] = useState('')

    function dataAtualFormatada() {
        var data = new Date(),
            dia = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0' + dia : dia,
            mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0' + mes : mes,
            anoF = data.getFullYear();

        return anoF + "-" + mesF + "-" + diaF;
    }

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();


        const NovoEvento = {
            titulo,
            data,
            horaInicio,
            horaFim,
            descricao,
            convidados: convidados.split(',').map(item => item.trim())
        }


        try {
            const response = await axios.post(`/api/eventos`, NovoEvento);
        } catch (err) {
            alert(err.response.data.error);
        }
    }

    function replaceToHome() {
        window.location.replace('/');
    }

    return (
        <div>
            {session &&
                (
                    <div className="bg-gray-100 h-screen">
                        <div className="flex justify-center p-10">
                            <form onSubmit={handleSubmit} className="
                                max-h-screen p-8 rounded-lg shadow-xl w-min-xl
                                flex flex-col gap-3 bg-white
                                justify-items-center relative border-4 border-purple-200
                                ">

                                <input autoComplete="on" className="text-center mb-1" type="text" value={titulo} onChange={(e) => { setTitulo(e.target.value) }} placeholder="Titulo do Evento" required />
                                <div className="flex self-center">
                                    <input className="ml-10 mb-4" type="date" value={data} onChange={(e) => { setData(e.target.value) }} required />
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4">
                                    <p className="text-center text-sm py-1">Inicio</p>
                                    <input className=" text-center " type="time" placeholder="Hora Inicio" value={horaInicio} onChange={(e) => { setHoraInicio(e.target.value) }} required />
                                    <p className="text-center text-sm py-1">Fim</p>
                                    <input className=" text-center" type="time" placeholder="Hora Termino" value={horaFim} onChange={(e) => { setHoraFim(e.target.value) }} required />
                                </div>
                                <input className=" text-center mt-4" type="text-long" placeholder="Descrição" value={descricao} onChange={(e) => { setDescricao(e.target.value) }} />
                                <p className="text-center mt-10 text-sm ">Convidados</p>
                                <p className="text-center -mt-3 text-sm ">Separe os e-mails por vírgula</p>

                                <input className="text-center" autoComplete="on" type="text" value={convidados} onChange={(e) => { setConvidados(e.target.value) }} placeholder="E-mail convidados" />
                                <button className="bg-green-300 mt-5 rounded-xl p-2 px-7  self-center hover:bg-green-400 duration-200" type="submit" onClick={replaceToHome}>Criar!</button>
                            </form>
                        </div>
                    </div>
                )
            }

            {
                !session &&
                (

                    <div className="bg-gray-100 p-14 h-screen flex justify-center relative">
                        <p className="text-center text-2xl">Faça login para criar seu primeiro evento!</p>
                    </div>
                )
            }


        </div >
    )
}


