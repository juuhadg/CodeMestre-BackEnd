import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

export const validarGoogleToken = (handler : NextApiHandler) => 
 async (req : NextApiRequest, res: NextApiResponse) => {

try{
    
    const { OAuth2Client } = require('google-auth-library');
    const { GOOLE_CLIENT_ID } = process.env

if(req.method !=='OPTIONS'){
        const client = new OAuth2Client(GOOLE_CLIENT_ID)

        const ticket = await client.verifyIdToken({
            idToken: req.body.tokenGoogle,
            audience: GOOLE_CLIENT_ID,
          });

          const payload = ticket.getPayload();
          req.body.googleTokenResponse = {valid: true, user: payload}

}

} catch(e) {
    console.log(e);
    return res.status(401).json({ valid: false, error: 'Token inválido' })
}


return handler(req, res);

}