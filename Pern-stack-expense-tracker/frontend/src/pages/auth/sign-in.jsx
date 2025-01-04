import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { data } from 'autoprefixer'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle,CardFooter } from '../../components/ui/card'
import useStore from '../../store'
// import {Separator} from '../../components/Separator'
import {zodResolver} from '@hookform/resolvers/zod'
import { SocialAuth } from '../../components/social-auth'
import  Input  from "../../components/ui/input"
import { Button } from '../../components/ui/button'
import { BiLoader } from 'react-icons/bi'
import Separator from '../../components/Separator'


const LoginSchema = z.object({
  email:z
  .string({required_error:"Email is required"})
  .email({message:"Invalid email address"}),
  password:z
  .string({required_error:"Password is required"})
  .min(1,"Password is required")
})

const SignIn = () => {
  const {user} = useStore((state)=>state)
  const{
    register,handleSubmit,
    formState:{errors},
  }=useForm({
    resolver:zodResolver(LoginSchema),
  })
  const navigate = useNavigate();
  const[loading,setLoading] = useState()
  useEffect(()=>{
    user && navigate("/")
  },[user]);

  const onSubmit = async(data)=>{
    try {
     setLoading(true)
     const {data:res}= await api.post("/auth/sign-in",data);
     if(res?.user){
       toast.success(res?.message)

       const userInfo = {...res?user.token:res.token}
       localStorage.setItem("user",JSON.stringify(userInfo))
       setCredentials(userInfo)

       setTimeout(()=>{
         navigate("/overview")
       },1500)
     }
     
     console.log(data);
    } catch (error) {
     console.log(error);
     toast.error(error.response?.data?.message||error.message)
    }finally{
     setLoading(false)
   }
    
   }

  return (
    <div className='flex items-center justify-center w-full min-h-screen py-10'>
      <Card className={"w-[400px] bg-white dark:bg-black/20 shadow-md overflow-hidden"}>
      <div className='p-6 md:8'>
        <CardHeader className="py-0">
          <CardTitle className="mb-8 text-center dark:text-white">
           sign In
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
<div className='mb-8 space-y-16'>
  <SocialAuth isLoading={loading} setLoading={setLoading} />
  <Separator />

  <Input
  disabled={loading}
  id="firstName"
  label="Name"
  name="firstName"
  placeholder="Enter your name"
  type="text"
  error={errors?.firstName?.message}
  {...register("email")}
  className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray-700  dark:text-gray-400 dark:outline-none"
  />
  <Input
  disabled={loading}
  id="password"
  label="Password"
  name="password"
  placeholder="Your password"
  type="email"
  error={errors?.email?.message}
  {...register("password")}
  className="text-sm border dark:border-gray-800 dark:bg-transparent dark:placeholder:text-gray-700  dark:text-gray-400 dark:outline-none"
  />

</div>
<Button type="Submit"
className="w-full bg-violet-800"
disabled={loading}>
  {loading ?
  (<BiLoader className="text-2xl text-white animate-spin" />)
  :
  ("Sign in")
  }


</Button>
</form> 
 </CardContent>
     </div> 

     <CardFooter className="justify-center gap-2">
      <p className='text-sm text-gray-600'>Dont have an account? </p>
        <Link to="/Sign-up" className="text-sm font-semibold text-violet-600 hover:underline">
        sign in
        </Link>
     </CardFooter>
     </Card>
      
    </div>
  )
}

export default SignIn
