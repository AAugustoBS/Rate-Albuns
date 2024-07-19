import React from 'react';
import { useNavigate  } from 'react-router-dom'
const Card = ({ res }) => {
  const navigate = useNavigate();

  const routeArtistChange = (artistName) => {
          navigate(`/artist/${artistName}`);
  }
    return (<div className='flex flex-col  flex  items-center   size-80 rounded-lg shadow-xl max-w-80 hover:bg-zinc-700 transition-colors duration-300'>
        
        

        {res.type === 'artist' ? (
            <>
            <button onClick={() => navigate(`/artist/${res.name}`,{ state: { artist: res.name, id: res.id, img: res.images.url }})}>
                <img src={res.images.url} alt={res.name} className="shadow-md rounded-full" style={{ width: '250px', height: '250px' }}/>
                
            
              <h2 className='text-white'>{res.name}</h2>
              <p className='text-zinc-300'>Artist</p>  
              </button>         
              {/* Renderize outras propriedades de artistas conforme necessário */}
            </>
          ) : (
            <>
            <button >
            <img src={res.images.url} alt={res.name} className="shadow-md justify-center rounded-lg" style={{ width: '250px', height: '250px'}} />
            
           
              <h2 className='text-white'>{res.name.length > 30 ? `${res.name.substring(0, 27)}...` : res.name}</h2>
              <p className='text-zinc-300'>{res.artist}</p>
              <p className='text-zinc-300'>{res.release_date.slice(0, 4)}</p>
              </button>
              {/* Renderize outras propriedades de álbuns conforme necessário */}
            </>
          )}
          </div>
    );
    
};

export default Card;