import React, { useEffect, useState  } from 'react';
import { useParams } from 'react-router-dom';
import Card from './components/Card'
const Result = () => {
    const [result, setResult] = useState({});
    const {query} = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/search?query=${query}`)
          .then(response => response.json())
          .then(data => {
            if (data.data) {
                
                const parsedData = JSON.parse(data.data);
                console.log(parsedData);
                setResult(parsedData); // Assume que 'data.data' é um objeto com informações do artista
            } else {
              console.error('Data does not contain expected structure:', data);
              setResult({}); // Define como um objeto vazio para evitar erros
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setResult({}); // Define como um objeto vazio para evitar erros
          });
      }, [query]);

    return (
        <div className='flex flex-row w-full h-screen'>
          <div className='basis-1/4'></div>
          <div className='basis-2/4 '>
            <div className='flex flex-col  h-full items-center px-4 bg-zinc-900'>
              <div className='flex w-full justify-item items-center h-14 '>
                <h1 className='text-white font-sans text-2xl'>Results</h1>
              </div>
              <div className=' flex w-full h-full grid justify-items-center items-center'>
              {result.length > 0 ? (
                  <ul>
                    <div className='grid grid-cols-2 gap-20'> 
                    {result.map((res, index) => (
                      <li key={index}>
                        <Card res={res} />
                      </li>
                    ))}
                    </div>
                  </ul>
                  
                
              ) : (
                <p>Nenhum resultado encontrado</p>
              )}
              </div>
              </div>
          </div>
          <div className='basis-1/4'></div>
      </div>
      );
}

export default Result;