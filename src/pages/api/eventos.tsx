import { NextApiRequest, NextApiResponse } from 'next';
import { useContext } from 'react';
import { connectToDatabase } from '../../../utils/mongodb';
import { LoginContext } from '../../contexts/LoginContext'
import { getSession } from 'next-auth/client'
import { ObjectID } from 'mongodb';



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
    id: string;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType | SucessoType>
): Promise<void> => {
    const { titulo, data, horaInicio, horaFim, descricao, participantes, convidados, id }: {
        titulo: string;
        data: string;
        horaInicio: string;
        horaFim: string;
        descricao: string;
        participantes: string;
        convidados: string;
        id: string;
    } = req.body;



    if (req.method === 'POST') {
        const session = await getSession({ req })

        if (!session) {
            return res.status(400).json({ message: 'Por favor, faça login primeiro' });
            
        }
        if (!titulo || !data || !horaInicio || !horaFim) {
            return res.status(400).json({ message: "Parametros errados" })
            
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
        return res.status(200).json(response.ops[0]);
    }

    else if (req.method === 'GET') {
        const session = await getSession({ req })

        if (session == null) {
            return res.status(400).json({ message: 'Por favor, faça login primeiro' });
            
        }
        const participantes = session.user.email;

        if (!participantes) {
            return res.status(400).json({ message: "Você deve estar logado para acessar essa página" });
            
        }

        const { db } = await connectToDatabase();
        const response = await db.collection('eventos').find({ participantes }).sort({ data: -1, horaInicio: 1 }).toArray();
        if (response.length == 0) {
            return res.status(400).json({ message: "Participante sem eventos cadastrados" });
        }
        return res.status(200).json(response);
    }
    else if (req.method === 'PUT') {
        const session = await getSession({ req })
        
        if (!session) {
            return res.status(400).json({ message: 'Por favor, faça login primeiro' });
            
        }
        if (!titulo || !data || !horaInicio || !horaFim) {
            return res.status(400).json({ message: "Parametros errados" })
            
        }
        
        const participantes = session.user.email;
        
        let _id: ObjectID;
        try {
            _id = new ObjectID(id);
            
        } catch {
            return res.status(400).json({ message: 'Wrong objectID' });
            
        }

        const { db } = await connectToDatabase();
        
        const response = await db.collection('eventos').updateOne(
            {"_id": _id}, 
            {$set:
                {
                    "titulo": titulo,
                    "data": data,
                    "horaInicio": horaInicio,
                    "horaFim": horaFim,
                    "descricao": descricao || "",
                    "participantes": participantes,
                    "convidados": convidados
                }
            }
        )

        return res.status(200).json(response);

    }
    else {
        return res.status(400).json({ message: "Metodo errado" })
    }
}