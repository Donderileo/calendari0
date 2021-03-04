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
    const { titulo, data, horaInicio, horaFim, descricao, participantes, convidados }: {
        titulo: string;
        data: string;
        horaInicio: string;
        horaFim: string;
        descricao: string;
        participantes: string;
        convidados: string;
    } = req.body;



    if (req.method === 'POST') {
        const session = await getSession({ req })

        if (!session) {
            res.status(400).json({ message: 'Por favor, faça login primeiro' });
            return;
        }
        if (!titulo || !data || !horaInicio || !horaFim) {
            res.status(400).json({ message: "Parametros errados" })
            return;
        }

        const participantes = session.user.email;

        const { db } = await connectToDatabase();
        const response = await db.collection('eventos').insertOne({
            titulo,
            data,
            horaInicio,
            horaFim,
            descricao: descricao || "",
            participantes,
            convidados,
        })
        res.status(200).json(response.ops[0]);
    }

    else if (req.method === 'GET') {
        const session = await getSession({ req })

        if (session == null) {
            res.status(400).json({ message: 'Por favor, faça login primeiro' });
            return;
        }
        const participantes = session.user.email;

        if (!participantes) {
            res.status(400).json({ message: "Você deve estar logado para acessar essa página" });
            return;
        }

        const { db } = await connectToDatabase();
        const response = await db.collection('eventos').find({ participantes }).sort({ data: -1, horaInicio: 1 }).toArray();
        if (response.length == 0) {
            res.status(400).json({ message: "Participante sem eventos cadastrados" });
        }
        return res.status(200).json(response);
    }

    else {
        return res.status(400).json({ message: "Metodo errado" })
    }
}