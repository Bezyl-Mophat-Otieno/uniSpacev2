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

// export const getServerSideProps = async (context)=>{

//   const myCookie = context.req?.cookies || "";

//   if (myCookie.token !== process.env.TOKEN) {
//     return {
//       redirect: {
//         destination:"/",
//         permanent: false,
//       },
//     };
//   }


// }


