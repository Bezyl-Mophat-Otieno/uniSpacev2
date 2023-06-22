import AdminNav from '@/components/AdminNav'
import RegisterForm from '@/components/RegisterForm'
import styles from '../../../../styles/AddClubPage.module.css'

function AddClubPage() {
  return (
    <>
    <AdminNav/>
    <div className={styles.container}>
    <RegisterForm/>
    </div>
    </>
  )
}

export default AddClubPage

