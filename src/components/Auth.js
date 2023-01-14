import {useState, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
 
const Auth = () => {
    const [register, setRegister] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    


   const authCtx = useContext(AuthContext)
 
   const submitHandler = e => {
       e.preventDefault()


        const body = {
            username,
            password
        }

        axios.post(register ? `/register` : `/login`, body)
        .then((res) => {
            authCtx.login(res.data.token, res.data.exp, res.data.userId)
            console.log('AFTER AUTH', res.data)
        })
        .catch(err => {
            setPassword('')
            setUsername('')
        }) 
    //    console.log('submitHandler called')
   }
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={elem => setUsername(elem.target.value)}
                    className='form-input'
                />

               <input
                    type='text'
                    placeholder='Password'
                    value={password}
                    onChange={elem => setPassword(elem.target.value)}
                    className='form-input'
                />

               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button className='form-btn' onClick={() => setRegister(!register)}>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth