import React, { useEffect, useState  } from 'react';
import { useParams,useLocation  } from 'react-router-dom';
import Card from './components/Card'
const Artist = () => {
    const {artistName} = useParams();
    let location = useLocation();
    let { artist, id,img } = location.state || {};
    const [result, setResult] = useState({});
    const [fontSizeClass, setFontSizeClass] = useState('text-5xl'); 
    
    useEffect(() => {
        fetch(`http://localhost:5000/artist?id=${id}&name=${encodeURIComponent(artistName)}`)
          .then(response => response.json())
          .then(data => {
            if (data.data) {
                console.log("teste");
                const parsedData = JSON.parse(data.data);
                
                setResult(parsedData); 
                const fontSizeClass = adjustFontSizeClass(artistName);
            
                setFontSizeClass(fontSizeClass);
              
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setResult({}); // Define como um objeto vazio para evitar erros
          });
      }, [artistName]);

      const adjustFontSizeClass = (name) => {
        
        if (name.length > 15) {
          return 'text-5xl'; // Usa uma fonte menor se o nome for muito longo
        } else if (name.length > 10) {
          return 'text-5xl'; // Usa um tamanho médio para nomes moderadamente longos
        } else {
          return 'text-base'; // Usa uma fonte maior para nomes curtos
        }
      };
    return (
        <div className='flex absolute flex-row w-screen h-screen overflow-hidden relative'>
          <div className='basis-1/4'></div>
            <div className='basis-2/4 bg-stone-900'>
            <div className='flex flex-col whitespace-nowrap h-full'>
                <div className='flex flex-row bg-gradient-to-r from-black p-4'>
                  <div className='basis-1/4'>
                  <img src={img} alt={artist} className="shadow-md rounded-full " style={{ width: '220px', height: '220px' }}/>
                  </div>
                  <div className='basis-3/4 flex justify-center self-center'>
                  <h1 className={`text-white ${fontSizeClass}`}>{artistName}</h1>
                  </div>
                </div>
                <div className=' flex w-full h-[calc(100vh-5.75rem)] flex-nowrap overflow-hidden'>
                  <div className='h-full w-full overflow-y-auto overflow-x-hidden whitespace-nowrap  justify-items-center items-center'>
                  {result.length > 0 ? (
                  <ul>
                    <div className='grid grid-cols-3 justify-stretch gap-4 '> 
                    {result.map((res, index) => (
                      <li key={index} className='size-1/24 '>
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
            
            </div>
        </div>
      );
}

export default Artist;