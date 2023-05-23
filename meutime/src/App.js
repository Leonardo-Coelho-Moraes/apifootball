import React, { useState } from 'react';
import axios from 'axios';
import MeuTime from './Components/MeuTime';
import { FiKey } from "react-icons/fi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chave, setChave] = useState('');

  const verificarChave = async (chave) => {
    setLoading(true);

    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/timezone',
      headers: {
        'X-RapidAPI-Key': chave,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setLoading(false);
      setLoggedIn(true);
      setChave(chave); // Atualiza o estado da chave
      console.log(response.data);
    } catch (error) {
      setLoading(false);
      setLoggedIn(false);
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const chave = event.target.chave.value;
    verificarChave(chave);
  };

  return (
    <>

      {loggedIn ? (
        <MeuTime chave={chave} />
      ) : (
        <div className='login'>
          {loading ? (
            <>

              <section className="bloco1">
                <div className="formularios loading">
                </div>
                <div className="sobre loading">
                </div>
              </section>
              <section className="bloco2">
                <div className="grafico loading">
                </div>
                <div className="jogos loading">
                </div>
                <div className="formacao loading">

                </div>
              </section>
              <section className="bloco3 ">
                <div className="jogadores loading">

                </div>
              </section>
            </>
          ) : (
            <form onSubmit={handleSubmit} className='formlogin' autoComplete='on'>
              <input type="text" name="chave" placeholder='Insira a Chave' required />
              <button type="submit"><FiKey /></button>
            </form>
          )}
        </div>
      )}
    </>
  );
}

export default App;
