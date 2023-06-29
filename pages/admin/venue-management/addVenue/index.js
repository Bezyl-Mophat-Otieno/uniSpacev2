import RegisterVenue from '@/components/RegisterVenue'
import styles from '../../../../styles/addVenuePage.module.css'

import React from 'react'
import AdminNav from '@/components/AdminNav'

function AddVenuePage() {
  return (
    <>
    <AdminNav/>
    <div className={styles.container}>
    <RegisterVenue/>   
    </div>
    </>
  )
}

export default AddVenuePage


// export const getServerSideProps = async (context)=>{

//   const myCookie = context.req?.cookies || "";

//   if (myCookie.token !== process.env.TOKEN) {
//     return {
//       redirect: {
//         destination:"/",
//         permanent: false,
//       },
//       props:{
//         venues:[]
//       }
      
//     };
//   }



// }
