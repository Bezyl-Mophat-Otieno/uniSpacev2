import SetPasswordForm from '@/components/SetPasswordForm'
import styles from '../../../../styles/AddClubPage.module.css'
import UserNav from '@/components/UserNav'

function AddClubPage() {
  return (
    <>
    <UserNav/>
    <div className={styles.container}>
    <SetPasswordForm/>
    </div>
    </>
  )
}

export default AddClubPage

