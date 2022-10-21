import {useState,useEffect} from 'react';
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {login,reset} from '../features/auth/authSlice.js'
import Spinner from '../components/Spinner'
function Login() {
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  });
  const {email,password} = formData;


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user,isLoading,isError,isSuccess,message} = useSelector((state)=>state.auth)

  const onChange = (e) => {
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
    }))
  }

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      navigate('/')
    }

    dispatch(reset())

  },[user,isError,isSuccess,message,navigate,dispatch])

  const onSubmit = (e) => {
        e.preventDefault()
        const userdata = {
          email,
          password
        }
        dispatch(login(userdata))
  }

  if(isLoading){
    <Spinner></Spinner>
  }

  return (
   
   <>
    <section className='heading'>
        <h1><FaSignInAlt/>Login</h1>
        <p>Please Login to set your Goals</p>
    </section>
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
               
                <input type="email" className='form-control' id='email' 
                name='email' value={email} placeholder='Enter Your Email' onChange={onChange} />
                <input type="password" className='form-control' id='password' 
                name='password' value={password} placeholder='Enter Your password' onChange={onChange} />
               
            </div>
            <div className="form-group">
                <button type='submit' className='btn btn-block'>Login</button>
            </div>
        </form>
    </section>
   </>

  );
}

export default Login;