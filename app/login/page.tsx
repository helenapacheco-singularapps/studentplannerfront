"use client"
import { useRouter } from "next/navigation"
import { Montserrat, Poppins } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"]
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function LoginPage() {
  const router = useRouter()

  function handleLogin() {
    router.push("/dashboard")
  }

  return (
    <div style={{ background:"#f2f2f2", minHeight:"100vh" }}>
      
      {/* Topbar */}
      <div
        className={montserrat.className}
        style={{
          background:"#FADADD",
          padding:"6px 40px",
          display:"flex",
          alignItems:"center"
        }}
      >
        <img 
          src="/logo.h.png" 
          alt="Student Planner"
          style={{ height:"100px", width:"150px" }}
        />
      </div>

      <div style={{
        display:"flex",
        justifyContent:"center",
        marginTop:"100px"
      }}>
        <div style={{ width:"350px" }}>
          <h1
            className={montserrat.className}
            style={{
              textAlign:"center",
              marginBottom:"40px",
              fontSize:"40px"
            }}
          >
            Sign in
          </h1>

          <label className={poppins.className}>E-mail</label>
          <input
            type="email"
            placeholder="Type your E-mail"
            style={inputStyle}
          />

          <label className={poppins.className}>Password</label>
          <input
            type="password"
            placeholder="Type your password"
            style={inputStyle}
          />

          <button
            onClick={handleLogin}
            className={montserrat.className}
            style={enterButton}
          >
            Enter
          </button>

          <button
            className={montserrat.className}
            style={registerButton}
          >
            Register
          </button>

        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width:"100%",
  padding:"12px",
  marginTop:"6px",
  marginBottom:"20px",
  border:"none",
  background:"#eee"
}

const enterButton = {
  width:"100%",
  padding:"12px",
  background:"#E85A8A",
  color:"white",
  border:"none",
  borderRadius:"6px",
  fontWeight:"bold",
  marginTop:"10px",
  cursor:"pointer"
}

const registerButton = {
  width:"100%",
  padding:"12px",
  marginTop:"10px",
  background:"white",
  color:"#E85A8A",
  border:"1px solid #E85A8A",
  borderRadius:"6px",
  fontWeight:"bold",
  cursor:"pointer"
}