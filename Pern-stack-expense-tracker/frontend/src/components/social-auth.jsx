import {
GithubAuthProvider,
GoogleAuthProvider,
signInWithPopup,
}from "firebase/auth";
import React,{ useEffect, useffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../libs/apiCall";
import { auth } from "../libs/firebaseConfig";
import useStore from "../store";
import { Button } from "./ui/button";

export const SocialAuth = ({ isLoading, setLoading }) => {
const [user] = useAuthState(auth);
const [selectedProvider, setSelectedProvider] = useState("google");
const { setCredentails } = useStore((state) => state);
const navigate = useNavigate ();

const signInWithGoogle = async () => {
const provider = new GoogleAuthProvider();
setSelectedProvider ("google");
try {
const res = await signInWithPopup(auth, provider);
} catch (error) {
console.error ("Error signing in with Google", error);
}
}


const signInWithGithub = async () => {
  const provider = new GithubAuthProvider();
  setSelectedProvider ("github");
  try {
    const res = await signInWithPopup(auth, provider);
    } catch (error) {
      console.error ("Error signing in with Github", error);
      }
      }
      useEffect(()=>{
        const saveUserToDb=async()=>{
          try {
            const userData = {
              email: user.email,
              name: user.displayName,
              uid: user.uid,
              provider:selectedProvider,
            }
            setLoading(true);
            const {data:res} = await api.post("/api/sign-in", userData);
            console.log(res);
            if (res?.user) {
              toast.success(res?.message);
              const userInfo = {...res?.user,token:res?.token};
              localStorage.setItem("user",JSON.stringify(userInfo))
              setCredentails(userInfo);
              
              setTimeout(() => {
                navigate("/overview")

              }, 1500);
            }
          } catch (error) {
            console.error("Something is wrong",error);
            toast.error(error?.response?.data?.message||error.message);
            
          }finally{
            setLoading(false)
          }
        }
        if(user){
          saveUserToDb();
        }
      },[user?.uid]);
      return (
        <div className="flex justify-center items-center gap-2">
          <Button 
          onClick={signInWithGoogle}
          disabled={isLoading}
          variant="outline"
          className="w-full text-sm font-normal dark:bg-transparent dark:border-gray-800 dark:text-gray-400"
          type="button"
          >
          <FcGoogle className="mr-2 size-5"/>
          Sign in with Google

          </Button>

          <Button 
          onClick={signInWithGithub}
          disabled={isLoading}
            variant="outline"
          className="w-full text-sm font-normal dark:bg-transparent dark:border-gray-800 dark:text-gray-400"
          type="button"
          >
          <FaGithub className="mr-2 size-5"/>
          Sign in with Github
          </Button>
        </div>
      )
        }