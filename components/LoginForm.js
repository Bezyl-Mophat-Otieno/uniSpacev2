import React from 'react'
import styles from '@/styles/Home.module.css'
function LoginForm() {
  return (
    <div className={styles.formContainer}>
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>Organization Login</h3>
      </div>
      <div className={styles.cardBody}>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="orgName" className={styles.label}>Organization Name</label>
            <input type="text" className={styles.input} id="orgName" placeholder="Enter organization name" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="passkey" className={styles.label}>Passkey</label>
            <input type="password" className={styles.input} id="passkey" placeholder="Enter passkey" />
          </div>
        </form>
          <div className={styles.btnGroup}>
          <button type="submit" className={styles.buttonLog}>Login</button>
          <button type="submit" className={styles.buttonAdm}>Admin</button>
          </div>
      </div>
    </div>

    </div>
  )
}

export default LoginForm
