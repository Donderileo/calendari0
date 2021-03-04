import { NextApiRequest, NextApiResponse } from 'next';
import { useContext } from 'react';
import { connectToDatabase } from '../../../../utils/mongodb';
import { LoginContext } from '../../../contexts/LoginContext'
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
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType | SucessoType>
): Promise<void> => {
    const id = req.query.id as string;
    if (req.method == 'DELETE') {
        if (!id) {
            return res.status(400).json({ message: 'Missing event ID on request body' });
            
        }

        let _id: ObjectID;
        try {
            _id = new ObjectID(id);
        } catch {
            return res.status(400).json({ message: 'Wrong objectID' });
            
        }

        const { db } = await connectToDatabase();
        const response = await db.collection('eventos').findOne(_id);

        if (!response) {
            return res.status(400).json({ message: `Event with ID ${_id} not found` });
        }

        db.collection('eventos').deleteOne(response);
        return res.status(200).json({ message: `Evento ${response.titulo} removido` })

    }
    else {
        return res.status(400).json({ message: 'Método errado' });

    }

}

