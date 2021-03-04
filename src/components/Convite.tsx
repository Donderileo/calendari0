import { useState } from "react"

interface EventoProps {
    titulo: string;
    data: string;
    horaInicio: string;
    horaFim: string;
    descricao: string;
}


export function Convite(props: EventoProps) {


    return (
        <div className="
            bg-white max-w-md max-h-96 p-8 rounded-lg shadow-xl w-11/12
            grid grid-cols-2 grid-rows-5 sm:gap-1 grid-flow-row 
            justify-items-center relative border-4 border-purple-200
        ">


            <p className="col-span-2 text-gray-900 text-xl sm:text-2xl">{props.titulo}</p>
            <p className="col-span-2 ">{props.data}</p>
            <div className=" col-span-2 flex space-x-5 justify-items-center">
                <p>{props.horaInicio}</p>
                <p>- -</p>
                <p>{props.horaFim}</p>
            </div>


            <p className="col-span-2 row-span-2 text-gray-700 text-center">
                {props.descricao}
            </p>
        </div >
    )
}