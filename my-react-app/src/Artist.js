import React, { useEffect, useState  } from 'react';
import { useParams,useLocation  } from 'react-router-dom';
function Artist() {
    const {artistName} = useParams();
    let location = useLocation();
    let { artist, id,img } = location.state || {};
    const [result, setResult] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/artist?id=${id}&name=${encodeURIComponent(artistName)}`)
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
      }, [artistName]);

    return (
        <div>
            <h1 className='text-red'>{artistName}</h1>
            <p className='text-zinc-500'>Artista</p>
            <h1 className='text-red'>{id}</h1>
            <img src={img} alt={artist} className="shadow-md rounded-full" style={{ width: '250px', height: '250px' }}/>
        </div>
      );
}

export default Artist;