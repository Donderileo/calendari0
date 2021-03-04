import { NextApiRequest, NextApiResponse } from 'next';
import { useContext } from 'react';
import { connectToDatabase } from '../../../utils/mongodb';
import { LoginContext } from '../../contexts/LoginContext'
import { getSession } from 'next-auth/client'


interface ResponseType {
    message: string;
}

interface SucessoType {
    titulo: string;
    dateMes: string;
    dateDia: string;
    horaInicio: string;
    horaFim: string;
    descricao: string;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType | SucessoType>
): Promise<void> => {
    const { titulo, data, horaInicio, horaFim, descricao, participantes }: {
        titulo: string;
        data: string;
        horaInicio: string;
        horaFim: string;
        descricao: string;
        participantes: string;
    } = req.body;


    if (req.method === 'GET') {
        const session = await getSession({ req })

        if (session == null) {
            return res.status(400).json({ message: 'Por favor, faça login primeiro' });

        }
        const convidados = session.user.email;

        if (!convidados) {
            return res.status(400).json({ message: "Você deve estar logado para acessar essa página" });
        }

        const { db } = await connectToDatabase();
        const response = await db.collection('eventos').find({ convidados }).toArray();

        if (response.length == 0) {
            return res.status(400).json({ message: "Participante sem eventos cadastrados" });
        }
        else {
            return res.status(200).json(response);
        }
    }
    else {
        return res.status(400).json({ message: "Metodo errado" })
    }
}