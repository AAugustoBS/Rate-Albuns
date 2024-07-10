import React from 'react';
import { useAuth } from './AuthContext';
function Main() {
    const { token, userName, logout } = useAuth();
    return (
        <div>
          {token ? (
            <div>
              <p>Bem-vindo, {userName}!</p>
            </div>
          ) : (
            <p>Você não está logado.</p>
          )}
        </div>
      );
}

export default Main;