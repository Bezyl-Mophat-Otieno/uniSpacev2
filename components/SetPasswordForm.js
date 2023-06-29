import React from 'react'
import styles from '@/styles/SetPassword.module.css'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import Alert from './Alert'
import { useSelector } from 'react-redux'

function SetPasswordForm() {
  const [password , setPassword] = useState("")
  const [confirmPassword , setConfirmPassword] = useState("")
  const [passwordMatch , setPasswordMatch] = useState(null)
  const [typing , setTyping] = useState(false)
  const [success,setSuccess]= useState(null)
  const [error,setError]= useState(null)
  const router = useRouter()
  const {user} = useSelector(state=>state.user)
 
  const handleSetPasskey =async ()=>{
    try {
      const requestBody = {passkey:confirmPassword}

      await axios.put(`http://localhost:3000/api/admin/register/${user._id}`, requestBody)
      setSuccess(true)
      setError(false)
      
    } catch (error) {

      setSuccess(false)
      setError(true)
      
    }


  }

  const handleConfirmPassword = (e)=>{
    setTyping(true)
    setConfirmPassword(e.target.value)
    if(password === confirmPassword){
      setPasswordMatch(true)
    }else{
      setPasswordMatch(false)
    }

  }

  useEffect(()=>{
    if(password === confirmPassword){
      setPasswordMatch(true)
    }else{
      setPasswordMatch(false)
    }
  },[confirmPassword,password])



  useEffect(() => {
    if (success) {
      router.push('/user/dashboard');
    }
  }, [success]);
  useEffect(() => {
    if (error) {
      router.push('/user/dashboard/setPasskey');
    }
  }, [error]);

  return (
    <div className={styles.formContainer}>
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>Set Passkey</h3>
        { success && <Alert message={'Passkey set successfully'} color={'alert-success'} />}
        { error && <Alert message={'Something went wrong , the passkey was not reset '} color={'alert-warning'} />}
      </div>
      <div className={styles.cardBody}>
        <form>
{       
     <>
            <div className={styles.formGroup}>
            <label htmlFor="orgName" className={styles.label}>Current Passkey</label>
            <input type="text" className={styles.input} id="orgName" placeholder={user.passkey} disabled/>
            </div>

            <div className={styles.formGroup}>
            <input type="password" className={styles.input} id="passkey" placeholder="Enter Your Preferred Passkey" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className={styles.formGroup}>
            <input type="password" className={styles.input} id="passkey" placeholder="Confirm Your Passkey" onChange={(e)=>handleConfirmPassword(e)} />
            {  typing ? (passwordMatch ? <Button className='w-100 mt-4' onClick={handleSetPasskey}> Set Passkey </Button> : <span className='text-center text-danger '> Passkey do not Match</span>) : "" }
            
            </div>
     </>
          
          }

        </form>
      </div>
    </div>

    </div>
  )
}

export default SetPasswordForm
