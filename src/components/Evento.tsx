import axios from "axios";
import { useState } from "react"

interface EventoProps {
    titulo: string;
    data: string;
    horaInicio: string;
    horaFim: string;
    descricao: string;
    _id: string
}


export function Evento(props: EventoProps) {

    function handleRemove() {
        axios.delete(`/api/remove/${props._id}`);
        window.location.replace('/');

    }

    const dataFormatada = props.data.split('-')


    return (
        <div className="
            bg-white max-w-md max-h-96 p-8 rounded-lg shadow-xl w-11/12
            grid grid-cols-2 grid-rows-5 sm:gap-1 grid-flow-row 
            justify-items-center relative border-4 border-purple-200 opacity-70 hover:opacity-100
        ">
            <button className="absolute top-0 right-1 p-2 md:m-2 lg:m-3 focus:outline-none hover:bg-red-300 rounded-md" onClick={handleRemove}>X</button>
            <button className="absolute top-0 right-8 p-2 md:m-2 lg:m-3 focus:outline-none hover:bg-yellow-300 rounded-md">
                <img className="w-4 h-4" src="/images/edit.png" alt="" />
            </button>
            <p className="col-span-2 text-xl mt-4 sm:text-2xl text-center">{props.titulo}</p>
            <p className="col-span-2 mt-9">{dataFormatada[2]} / {dataFormatada[1]} / {dataFormatada[0]} </p>
            <div className="mt-2 col-span-2 flex flex-row space-x-5">
                <p className="flex text-center">{props.horaInicio}</p>
                <p className="flex text-center">- -</p>
                <p className="flex text-center">{props.horaFim}</p>
            </div>

            <p className="mt-10 sm:mt-2 col-span-2 row-span-2 text-center overflow-auto">
                {props.descricao}
            </p>
        </div >
    )
}

