import { useEffect, useState } from 'react'
import SignIn from './pages/auth/sign-in'
import SignUp from './pages/auth/sign-up'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Settings from './pages/settings'
import AccountPage from './pages/account-page'
import Transactions from './pages/transactions'
import { useStore } from 'zustand'
import { setAuthToken } from './libs/apiCall'
import { Toaster } from 'sonner'

const RootLayout = ()=>{
  const user  = useStore((state)=>state)
  setAuthToken(user?.token || '')
  console.log(user);
  
  // const user = null

  return !user ? (
  <Navigate to="sign-in" replace={true} />
):(
  <>
<Navbar />
  <div className='min-h-[cal(h-screen-100px)]'>
<Outlet />
  </div>
  </>
)
}

function App() {
  // const [count,setCount] = useState(0)
  const {theme} = useStore((state)=>state);

  useEffect(()=>{
    if(theme==="dark"){
      document.body.classList.add('dark')
    }else{
      document.body.classList.remove('dark')
      // document.body.classList.add('dark')

    }
  },[theme])


  return (
    <main>
      <div className='w-full min-h-screen px-6 bg-gray-100 md:px-20 dark:bg-slate-900'>
        <Routes>
          <Route element={<RootLayout />}>
          <Route path="/" element={<Navigate to="/overview"/>}/>
          <Route path="/overview" element={<Dashboard/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/account" element={<AccountPage/>}/>
          <Route path="/transactions" element={<Transactions/>}/>
          </Route>

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        
        </Routes>
      </div>
      < Toaster richColors position="top-center"/>
         </main>
  )
}

export default App
