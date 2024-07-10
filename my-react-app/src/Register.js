import {React,useState}from 'react';
import {  Link, useNavigate } from 'react-router-dom'
const Register = () => {

  const navigate = useNavigate();
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [serverError, setServerError] = useState(''); 
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        // Verifica se a senha tem pelo menos 6 caracteres
         if (confirmPassword && newPassword !== confirmPassword) {
            // Se já houver uma senha de confirmação, verifica se elas são iguais
            setPasswordError('Passwords do not match.');
        } else {
            setPasswordError('');
        }
    };

      const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (password !== e.target.value) {
          setPasswordError('Passwords do not match.');
        } else {
          setPasswordError('');
        }
      };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
          // Aqui você coleta os valores dos campos do formulário
          username: event.target.username.value,
          email: event.target.email.value,
          password: event.target.password.value,
          // Adicione outros campos conforme necessário
        };
        const username = event.target.username.value;

    // Verifica se o username tem pelo menos 5 caracteres
    if (username.length < 5) {
      setUsernameError('Username must be at least 5 characters long.');
      return; // Interrompe a execução da função se o username for inválido
    } 
    if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters long.');
        return; // Interrompe a execução da função se o username for inválido
      }
      if (!/^[A-Za-z]/.test(username)) {
        setUsernameError('Username must start with a letter.');
        return; // Interrompe a execução da função se o username não começar com uma letra
      }
    else {
      setUsernameError(''); // Limpa a mensagem de erro se o username for válido
    }
    
        // Aqui você faz a chamada para o backend
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }).then(response => {
          if (!response.ok) {
              throw new Error('User or Email already exists!');
          }
          return response.json();
      })
      .then(data => {
          // Trate a resposta de sucesso aqui
          console.log(data);
          navigate('/');
      })
      .catch(error => {
          setServerError(error.message);
      });
      };

    return (
        <div className="flex flex-row w-full h-screen ">
            <div className="basis-2/4"></div>
            <div className="basis-2/4 ">
                <div className='flex flex-col h-full'>
                    <div className=" flex h-14"></div>
                    <div className="flex flex-col bg-stone-900 flex-1 rounded shadow-xl h-full">
                        <div className="flex h-14 items-center justify-center">
                            <h1 className="text-white font-sans text-2xl">Sign Up</h1>
                        </div>
                        <div className="flex-1 gap-8 flex items-center justify-center">
                            <form className="flex flex-col w-full h-full gap-12 px-24 pt-12" onSubmit={handleSubmit}>
                                <input type="text" name="username"  placeholder="Username" className="w-full text-white px-4 py-2 border-b border-gray-300 bg-transparent rounded-none focus:outline-none focus:border-gray-500 focus:border-t-0" />{usernameError && <div className="text-red-500 text-sm">{usernameError}</div>}
                                <input type="email" name="email" placeholder="Email" className="w-full text-white px-4 py-2 border-b border-gray-300 bg-transparent rounded-none focus:outline-none focus:border-gray-500 focus:border-t-0" />
                                <input type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} className="w-full text-white px-4 py-2 border-b border-gray-300 bg-transparent rounded-none focus:outline-none focus:border-gray-500 focus:border-t-0" />
                                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} className="w-full text-white px-4 py-2 border-b border-gray-300 bg-transparent rounded-none focus:outline-none focus:border-gray-500 focus:border-t-0" />
                                {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}
                                {serverError && <div style={{color: 'red'}}>{serverError}</div>}
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</button>
                            </form>
                        </div>
                        <div className="flex h-14 items-center justify-center">
                            <h2 className="text-white ">Already has an account? <Link to="/login"><a href='/login' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign In!</a></Link></h2>
                        </div>
                    </div>
                    <div className="h-14"></div>
                </div>
            </div>
            <div className="basis-2/4"></div>
        </div>
    );
};

export default Register;