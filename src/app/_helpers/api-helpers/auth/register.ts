import config from "../config";

const register = async (requestBody : {name: string, email: string, password: string})=> {
 const endpoint = config.apiUrl + '/register'

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
       throw new Error(errorData.error);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    let message = 'Unknown error';

    if(error instanceof Error) message = error.message;

    throw new Error(message);
  }
}

export default register;
