import {useState,useEffect} from 'react';
import {FaUser} from 'react-icons/fa';
import {useSelector,useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {register,reset} from '../features/auth/authSlice.js'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  });


  const {name,email,password,password2} = formData;
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
        if(password !== password2){
          toast.error('Password do not match')
        }
        else{
          const userData ={
            name,email,password
          }
          dispatch(register(userData))
        }
  }


  if(isLoading){
    <Spinner></Spinner>
  }

  return (
   
   <>
    <section className='heading'>
        <h1><FaUser/>Register</h1>
        <p>Please Create a account</p>
    </section>
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="text" className='form-control' id='name' 
                name='name' value={name} placeholder='Enter Your Name' onChange={onChange} />
                <input type="email" className='form-control' id='email' 
                name='email' value={email} placeholder='Enter Your Email' onChange={onChange} />
                <input type="password" className='form-control' id='password' 
                name='password' value={password} placeholder='Enter Your password' onChange={onChange} />
                <input type="password" className='form-control' id='password2' 
                name='password2' value={password2} placeholder='Confirm Password' onChange={onChange} />
            </div>
            <div className="form-group">
                <button type='submit' className='btn btn-block'>Submit</button>
            </div>
        </form>
    </section>
   </>

  );
}

export default Register;
