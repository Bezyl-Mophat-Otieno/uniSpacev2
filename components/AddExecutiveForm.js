import React from 'react'
import styles from '@/styles/SetPassword.module.css'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import Alert from './Alert'
import { useSelector } from 'react-redux'


function AddExecutiveForm() {
  const [name,setName]= useState("")
  const [title,setTitle]= useState("")
  const [regNo,setRegNo]= useState("")
  const [phoneNo,setPhoneNo]= useState("")
  const [executives,setExecutives]= useState([])
  const [requestBody , setRequestBody] = useState(null)
  const [success,setSuccess]= useState(null)
  const [error,setError]= useState(null)
  const router = useRouter()
  const {user} = useSelector(state=>state.user)

  const handleChange = (e)=>{
    setRequestBody({...requestBody,[e.target.name]:e.target.value,clubId:user._id})

  }



  const handleAdd = async()=>{
    
    try {
      await axios.put(`http://localhost:3000/api/org/add-exec/${user._id}`,requestBody)
    
       
      setSuccess(true)
      setError(false)
    
    } catch (error) {
      alert(error)

      setSuccess(false)
      setError(true)
      
      
    }


  }
  useEffect(() => {
    if (success) {
      router.push('/user/dashboard');
      socket.emit("addExecutive","I am a new executive")
      socket.on("addExecutive",(message)=>{
        alert("I am the server I have recieved your message")
      })
  
    }
  }, [success]);
  useEffect(() => {
    if (error) {
      router.push('/user/dashboard/add-exec');
    }
  }, [error]);

  useEffect(()=>{

  },[])

  return (
    <div className={styles.formContainer}>
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>Add Executive Officials</h3>
        { success && <Alert message={'Executive Added Sucessfully'} color={'alert-success'} />}
        { error && <Alert message={'Something went wrong , Executive not added successfully '} color={'alert-warning'} />}
      </div>
      <div className={styles.cardBody}>
        <form>
{       
     <>
            <div className={styles.formGroup}>
            <input type="text" className={styles.input} name={'name'}id="Executive" placeholder={'Enter Executive`s Name'} onChange={(e)=>handleChange(e)}/>
            </div>
            <div className={styles.formGroup}>
            <input type="text" className={styles.input} name={'title'}id="title" placeholder="Enter Office Title Held" onChange={(e)=>handleChange(e)}/>
            </div>
            <div className={styles.formGroup}>
            <input type="text" className={styles.input} name={'regNo'}id="regNo" placeholder="Enter Registration Number" onChange={(e)=>handleChange(e)} />
            
            </div>
            <div className={styles.formGroup}>
            <input type="number" className={styles.input} name={'phoneNo'}id="phone" placeholder="Enter Phone Number" onChange={(e)=>handleChange(e)} />
            { 
               <Button className='w-100 mt-4' onClick={handleAdd}  > Add </Button>
               
                }
            
            </div>
            
     </>
          
          }

        </form>
      </div>
    </div>

    </div>
  )
}

export default AddExecutiveForm