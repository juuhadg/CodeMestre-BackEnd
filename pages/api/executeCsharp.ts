import type { NextApiRequest, NextApiResponse } from 'next';


const executeCsharp = async(req:NextApiRequest, res: NextApiResponse) => {

    if(req.method === 'POST') {
            const { code } = req.body.code;

          return res.status(200).json(code);

    }

}





export default executeCsharp;