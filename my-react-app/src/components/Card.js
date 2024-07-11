import React from 'react';

const Card = ({ res }) => {
    
    return (<div className='bg-zinc-800 size-80 rounded-lg shadow-xl '>
        
        {res.type === 'artist' ? (
            <>
              <h2>{res.name}</h2>
              <p>ID: {res.id}</p>
              <p>Release Date: {res.release_date}</p>
              <img src={res.images.url} alt={res.name} style={{ width: '100px', height: '100px' }} />
              {/* Renderize outras propriedades de artistas conforme necessário */}
            </>
          ) : (
            <>
              <h2>{res.name}</h2>
              <p>ID: {res.id}</p>
              <p>Release Date: {res.release_date}</p>
              <img src={res.images.url} alt={res.name} style={{ width: '100px', height: '100px' }} />
              {/* Renderize outras propriedades de álbuns conforme necessário */}
            </>
          )}
          </div>
    );
    
};

export default Card;