import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState('');
  const [id, setId] = useState("");

  async function profile() {
    await axios.get('/api/profile').then((response) => {
      setId(response.data.id);
      setUsername(response.data.name);
    });
  }

  useEffect(() => {
    profile();
  
  }, []);



  return (
    <>
    
      <UserContext.Provider value={{ username, id }}>
        {children}
      </UserContext.Provider>

    </>
  );
}
