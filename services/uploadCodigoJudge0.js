const axios = require('axios')

  


const uploadCodigoJudge0 = async (req) => {

    const {
        X_RAPIDAPI_KEY,
        X_RAPIDAPI_HOST
      }  = process.env

      
      

    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/?base64_encoded=true&wait=true',
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': X_RAPIDAPI_KEY ,
          'X-RapidAPI-Host': X_RAPIDAPI_HOST
        },data: {
            language_id: req.body.language_id,
            source_code: req.body.codigo,
            
            
          }
      };
        
   

      try {
        const response = await axios.request(options);
        console.log(response.data)
        return response.data;
      } catch (error) {
       // console.error(error);
      }

      


}

export default uploadCodigoJudge0;