import SetPasswordForm from '@/components/SetPasswordForm'
import styles from '../../../../styles/AddClubPage.module.css'
import UserNav from '@/components/UserNav'
import AddExecutiveForm from '@/components/AddExecutiveForm'

import { useEffect } from 'react'

function AddClubPage() {

  return (
    <>
    <UserNav/>
    <div className={styles.container}>
    <AddExecutiveForm/>
    </div>
    </>
  )
}

export default AddClubPage

