import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';


const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  const login = async(username, password) => {
    const success = handleInputErrors(username, password)
        if(!success) return;

    setLoading(true);
    try {
        const res = await fetch('api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        });
        const data = await res.json();
        if(data.error)
            throw new Error(data.error);    
        localStorage.setItem('chat-user', JSON.stringify(data));
        setAuthUser(data);
    }
    catch(error){
        toast.error(error.message)
    }
    finally{
        setLoading(false);
    }
  }

  return {login, loading};
}

export default useLogin


function handleInputErrors(username, password){
    if(!username || !password ){
        toast.error('PLease Fill All the Fields');
        return false;
    }
    if(password.length < 6){
        toast.error("Password should be atleast 6 characters long");
        return false;
    }

    return true;
}