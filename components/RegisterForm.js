import React from 'react'
import styles from '@/styles/Register.module.css'
import { useEffect,useState } from 'react'
import axios from 'axios'
import Alert from './Alert'

function RegisterForm() {
  const [name,setName]= useState("")
  const [role,setRole]= useState("")
  const [success,setSuccess]= useState("")
  const [error,setError]= useState("")
  const [registeredUser , setRegisteredUser] = useState(null)
  const handleRegister = async()=>{
    const requestBody = {
      name,role
    }

    try {
      const res = await axios.post('http://localhost:3000/api/admin/register',requestBody)
      setRegisteredUser(res.data)

      setSuccess(true)
      setError(false)
      setName("")
      setRole("")


      
    } catch (error) {
      setError(true)
      setSuccess(false)
      setName("")
      setRole("")
    }

  }
  return (
    <div className={styles.formContainer}>
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>Perticipant's Registration Window</h3>
        { success && <Alert message={'Registration Successful'} color={'alert-success'} />}
        { error && <Alert message={'Something went wrong .'} color={'alert-warning'} />}
      </div>
      <div className={styles.cardBody}>
        <form>
{       
     !registeredUser && <>
            <div className={styles.formGroup}>
            <label htmlFor="orgName" className={styles.label}>Name</label>
            <input type="text" className={styles.input} id="orgName" placeholder="Enter organization name" onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
            <label htmlFor="orgName" className={styles.label}>Role</label>
            <input type="text" className={styles.input} id="orgName" placeholder="Enter Role [user || admin]" onChange={(e)=>setRole(e.target.value)} />
            </div>
            </>
          
          }

{  registeredUser && <div className={styles.formGroup}>
            <label htmlFor="passkey" className={styles.label}>Passkey</label>
            <input disabled type="password"  className={styles.input} id="passkey" placeholder={registeredUser.passkey} />
          </div>}
        </form>
          <div className={styles.btnGroup}>
          <button type="submit" className={styles.buttonLog} onClick={handleRegister} >Register</button>
          {/* <button type="submit" className={styles.buttonAdm}>Admin</button> */}
          </div>
      </div>
    </div>

    </div>
  )
}

export default RegisterForm
