import axios from "axios";
import { useState } from "react"
import {mutate} from 'swr'

interface EventoProps {
    titulo: string;
    data: string;
    horaInicio: string;
    horaFim: string;
    descricao: string;
    id: string;
    convidados: string;
}


export function Evento(props: EventoProps) {

    const [edit, setEdit] = useState(false);
    const [excluded, setExcluded] = useState(false);
    const [edited, setEdited] = useState(false);


    const [titulo, setTitulo] = useState(props.titulo);
    const [data, setData] = useState(props.data);
    const [horaInicio, setHoraInicio] = useState(props.horaInicio);
    const [horaFim, setHoraFim] = useState(props.horaFim);
    const [descricao, setDescricao] = useState(props.descricao);
    const [convidados, setConvidados] = useState('');
    const [id, setID] = useState(props.id);

    function handleRemove() {
        axios.delete(`/api/remove/${props.id}`);
        setExcluded(true);
    }

    function handleEdit(){
        setEdit(!edit);
    }

    const handleConfirmEdit = async (event: React.ChangeEvent<HTMLFormElement>) => {
            event.preventDefault();
    

            const EventoEditado = {
                titulo,
                data,
                horaInicio,
                horaFim,
                descricao,
                id,
                convidados: convidados.split(',').map(item => item.trim())
            }

            try {
                const response = await axios.put(`/api/eventos`, EventoEditado);
                handleEdit();
                if(response){
                    setEdited(true); 
                }
            } catch (err) {
                alert(err.data.error);
            }
    }

    
    function handleCancelEdit(){
        setEdit(false);
    }


    function dataAtualFormatada() {
        var data = new Date(),
            dia = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0' + dia : dia,
            mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0' + mes : mes,
            anoF = data.getFullYear();

        return anoF + "-" + mesF + "-" + diaF;
    }


    const dataFormatada = props.data.split('-')
    const dataHoje = dataAtualFormatada();


    return (
        <>
            
        {!edit && !excluded && !edited && (
            <div className="
            bg-white max-w-md max-h-96 p-8 rounded-lg shadow-xl w-11/12
            grid grid-cols-2 grid-rows-5 sm:gap-1 grid-flow-row 
            justify-items-center relative border-4 border-purple-200 sm:opacity-70 hover:opacity-100
            ">
            <button className="absolute top-0 right-0 p-2 md:m-2 lg:m-3 focus:outline-none hover:bg-red-300 rounded-md" onClick={handleRemove}>
                <img className="w-4 h-4" src="/images/close.png" alt="" />
            </button>
            <button className="absolute top-0 right-7 p-2 md:m-2 lg:m-3 focus:outline-none hover:bg-yellow-300 rounded-md" onClick={handleEdit}>
                <img className="w-4 h-4" src="/images/edit.png" alt="" />
            </button>
            <p className="col-span-2 text-xl mt-4 sm:text-2xl text-center">{props.titulo}</p>
            <p className="mt-10 sm:mt-2 col-span-2 row-span-2 text-center  text-gray-700 overflow-auto">
                {props.descricao}
            </p>
            {props.data == dataHoje && (
                <p className="mt-16 col-span-2 text-xl text-blue-700 subpixel-antialiased">Hoje</p>
            )}
            {props.data != dataHoje && (
                <p className="mt-16 col-span-2 ">{dataFormatada[2]} / {dataFormatada[1]} / {dataFormatada[0]} </p>
            )}
            
            <div className="mt-8 col-span-2 flex flex-row space-x-5">
                <p className="flex text-center">{props.horaInicio}</p>
                <p className="flex text-center">---</p>
                <p className="flex text-center">{props.horaFim}</p>
            </div>

        </div >   
        )}
        {edit && (
                <div className="
                bg-white max-w-md max-h-96 p-8 rounded-lg shadow-xl w-11/12
                grid grid-cols-2 grid-rows-5 sm:gap-1 grid-flow-row 
                justify-items-center relative border-4 border-purple-200 sm:opacity-70 hover:opacity-100
                ">
                 <form onSubmit={handleConfirmEdit} className="col-span-2 flex-col text-center">

                     <input autoComplete="on" className="text-center mb-2 flex sm:ml-8" type="text" value={titulo} onChange={(e) => { setTitulo(e.target.value) }} placeholder="Titulo do Evento" required />
                     <div className="flex self-center">
                         <input className="self-center ml-14 sm:ml-20 mb-4" type="date" value={data} onChange={(e) => { setData(e.target.value) }} required />
                     </div>
                     <div className="grid grid-cols-2 sm:grid-cols-4">
                         <p className="text-center text-sm py-1">Inicio</p>
                         <input className=" text-center " type="time" placeholder="Hora Inicio" value={horaInicio} onChange={(e) => { setHoraInicio(e.target.value) }} required />
                         <p className="text-center text-sm py-1">Fim</p>
                         <input className=" text-center" type="time" placeholder="Hora Termino" value={horaFim} onChange={(e) => { setHoraFim(e.target.value) }} required />
                     </div>
                     <input className=" text-center mt-4" type="text-long" placeholder="Descrição" value={descricao} onChange={(e) => { setDescricao(e.target.value) }} />
                     <p className="text-center mt-8 text-sm ">Convidados</p>
                     <p className="text-center mb-3 text-sm ">Separe os e-mails por vírgula</p>

                     <input className="text-center" autoComplete="on" type="text" value={convidados} onChange={(e) => { setConvidados(e.target.value) }} placeholder="E-mail convidados" />
                     <div className="grid grid-cols-2 gap-2 sm:gap-8">
                     <button className="bg-green-300 mt-5 rounded-xl p-2 px-5  self-center hover:bg-green-400 duration-200" type="submit">Confirmar</button>
                     <button className="bg-red-300 mt-5 rounded-xl  p-2 px-5  self-center hover:bg-red-400 duration-200" onClick={handleCancelEdit}>Cancelar</button>
                     </div>

                 </form>
             </div>
        )}
        {excluded && (
            <>
            </>
        )}
        {edited && !edit && !excluded && (
            <div className="
                bg-white max-w-md max-h-96 p-8 rounded-lg shadow-xl w-11/12
                grid grid-cols-2 grid-rows-5 sm:gap-1 grid-flow-row 
                justify-items-center relative border-4 border-purple-200 sm:opacity-70 hover:opacity-100
                ">
                <button className="absolute top-0 right-0 p-2 md:m-2 lg:m-3 focus:outline-none hover:bg-red-300 rounded-md" onClick={handleRemove}>
                    <img className="w-4 h-4" src="/images/close.png" alt="" />
                </button>
                <button className="absolute top-0 right-7 p-2 md:m-2 lg:m-3 focus:outline-none hover:bg-yellow-300 rounded-md" onClick={handleEdit}>
                    <img className="w-4 h-4" src="/images/edit.png" alt="" />
                </button>
                <p className="col-span-2 text-xl mt-4 sm:text-2xl text-center">{titulo}</p>
                <p className="mt-10 sm:mt-2 col-span-2 row-span-2 text-center  text-gray-700 overflow-auto">
                    {descricao}
                </p>
                {data == dataHoje && (
                    <p className="mt-16 col-span-2 text-xl text-blue-700 subpixel-antialiased">Hoje</p>
                )}
                {data != dataHoje && (
                    <p className="mt-16 col-span-2 ">{dataFormatada[2]} / {dataFormatada[1]} / {dataFormatada[0]} </p>
                )}
                
                <div className="mt-8 col-span-2 flex flex-row space-x-5">
                    <p className="flex text-center">{horaInicio}</p>
                    <p className="flex text-center">---</p>
                    <p className="flex text-center">{horaFim}</p>
                </div>

            </div >   
        )} 
        </>
    )
}

