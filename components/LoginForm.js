import React from 'react'
import styles from '@/styles/Login.module.css'
import { useState } from 'react'
import Alert from './Alert'
import { useRouter } from 'next/router'
import { loginStart ,logout ,loginSuccess , loginFailure } from '@/redux/userSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useSelector } from 'react-redux'
import QRCodeGenerator from './QRCodeGenerator'
import { Spinner } from 'react-bootstrap'
function LoginForm() {
  const [name , setName] = useState("")
  const [passkey , setPasskey] = useState("")
  const [success,setSuccess]= useState("")
  const [error,setError]= useState("")
  const router = useRouter()
  const dispatch = useDispatch()
  const {loading} = useSelector(state=>state.user)

  const handleLogin = async()=>{
    const requestBody = {
       name , passkey
    }
    try {
      dispatch(loginStart())
      const res = await axios.post('http://localhost:3000/api/org/login',requestBody)
      setSuccess(true)
      setError(false)   
      dispatch(loginSuccess(res.data))   
      if(await res.data.role === 'user'){
        router.push('/user/dashboard')
      }
      if(await res.data.role === 'admin'){
        router.push('/admin/dashboard')

      }

    } catch (error) {
      setSuccess(false)
      setError(true)
      dispatch(loginFailure())
      
    }


    

  }
  return (
    <div className={styles.formContainer}>
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>Login</h3>
        { success && <Alert message={'Login Successful'} color={'alert-success'} />}
        { error && <Alert message={'Something went wrong .'} color={'alert-warning'} />}
      </div>
      <div className={styles.cardBody}>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="orgName" className={styles.label}>Organization Name</label>
            <input type="text" className={styles.input} id="orgName" placeholder="Enter organization name" onChange={(e)=>{setName(e.target.value)}} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="passkey" className={styles.label}>Passkey</label>
            <input type="password" className={styles.input} id="passkey" placeholder="Enter passkey"  onChange={(e)=>{setPasskey(e.target.value)}}  />
          </div>
        </form>
          <button type="submit" className={styles.buttonLog} onClick={handleLogin}>Login</button>
          <div className={'d-flex justify-content-center flex-row text-center'}>
          {/* <QRCodeGenerator/> */}
            { loading && ( <Spinner  animation='border' variant='primary'  />)}
          </div>
      </div>
    </div>

    </div>
  )
}

export default LoginForm
