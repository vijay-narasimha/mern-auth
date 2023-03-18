import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [username, setUsername] = useState(undefined);
  const [id, setId] = useState(undefined);

  async function profile() {
    await axios.get('/api/profile').then((response) => {
      setId(response.data.id);
      setUsername(response.data.name);
    });
  }

  useEffect(() => {
    profile();
  
  }, []);

console.log(username,'context')

  return (
    <>
    
      <UserContext.Provider value={{ username, id }}>
        {children}
      </UserContext.Provider>

    </>
  );
}
