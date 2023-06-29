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



// export const getServerSideProps = async (context)=>{

//   const myCookie = context.req?.cookies || "";

//   if (myCookie.token !== process.env.TOKEN) {
//     return {
//       redirect: {
//         destination:"/",
//         permanent: false,
//       },
//       props:{
//         clubs:[]
//       }
//     };
//   }


// }