import React, { useState } from 'react'
import {TbSocial} from "react-icons/tb"
import { CustomButton, Loading, TextInput } from '../components'
import {useForm} from "react-hook-form" 
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { BgImage } from '../assets'
import {BsShare} from "react-icons/bs"
import {ImConnection} from "react-icons/im";
import {AiOutlineInteraction} from "react-icons/ai";

const Login = () => {
  const {register, handleSubmit, formState:{errors},} = useForm({mode: "onChange"});
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch()

  const onSubmit = async () => {


  }

  return (
    <div className='bg-black w-full h-[100vh] flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-gray-900 rounded-xl overflow-hidden shadow-xl'>
        {/* LEFT */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center'>
          <div className='w-full flex gap-2 items-center mb-6'>
            <div className='p-2 bg-green-600 rounded text-white'>
              <TbSocial color='white'/>
            </div>   
            <span className='text-2xl font-bold text-green-500'>EmmSocials</span>        
          </div>
          <p className='font-semibold text-base text-white'>
            Log In to your account
          </p>
          <span className='text-sm mt-2 text-white'>
            Welcome back!
          </span>
          <form className='py-8 flex flex-col gap-5 w-full' onSubmit={handleSubmit(onSubmit)}>
            <TextInput 
              name="email"
              placeholder="email@example.com"
              label="Email Address"
              type="email"
              register={
                register("email", {
                  required: "Email Address is required"
                })
              }
              styles="w-full rounded-full"
              labelStyle="ml-2"
              error={errors.email ? errors.email.message : ""}
            />

            <TextInput 
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
              register={
                register("password", {
                  required: "Password is required!"
                })
              }
              styles="w-full rounded-full"
              labelStyle="ml-2"
              error={errors.password ? errors.password.message : ""}
            />

            <Link
              to="/reset-password"
              className='text-sm text-right text-blue-400 font-semibold'
            >
              Forgot Password ?
            </Link>
            {
              errMsg?.message && (
                <span className={`text-sm ${errMsg?.status == "failed"? "text-red-500" : "text-green-500"} mt-0.5`}>
                  {errMsg?.message}
                </span>
              )
            }
            {
              isSubmitting 
              ? 
              <Loading /> 
              : 
              <CustomButton 
                type="submit"
                containerStyles={`inline-flex justify-center rounded-md bg-green-600 px-8 py-3 text-sm font-medium text-white outline-none`}
                title="Login"
              />
            }
          </form>

          <p className='text-white text-sm text-center'>
            Don't have an account?
            <Link
              to="/register"
              className='text-green-500 font-semibold ml-2 cursor-pointer '
            >
              Create Account 
            </Link>
          </p>
        </div>
        {/* RIGHT */}
        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-green-500'> 
          <div className='relative w-full flex items-center justify-center'>
            <img
              src={BgImage}
              alt='Background Image'
              className='w-[48%] 2xl:w-[300px] h-full 2xl:h-[300px] rounded-full object-cover' 
            /> 

            <div className='absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full'>
              <BsShare size={14}/>
              <span className='text-xs font-medium'>Share</span>
            </div>

            <div className='absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full'>
              <ImConnection size={14} />
              <span className='text-xs font-medium'>Connect</span>
            </div>

            <div className='absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full'>
              <AiOutlineInteraction size={14} />
              <span className='text-xs font-medium'>Interact</span> 
            </div>
          </div>



        </div>

      </div>
    </div>
  )
}

export default Login