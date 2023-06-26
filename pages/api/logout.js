import cookie from "cookie"

export default async function handler (req,res){
    if(req.method ==="GET"){

     try {

      res.setHeader("Set-Cookie",cookie.serialize("token",process.env.TOKEN,
      {maxAge:0,sameSite:"strict",path:"/"}))
      res.status(200).json("admin logged out successfully")
     } catch (error) {
      console.log(error.message)
      res.status(500).json(error.message)
     }

}
}