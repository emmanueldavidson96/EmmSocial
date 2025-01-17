import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { CustomButton, Loading, TextInput } from '../components';

const ResetPassword = () => {
  const [errMsg, setErrMsg] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: {errors},

  } = useForm({
    mode: "onChange",
  })
  const onSubmit = async (data) => {
  }

  
  return (
    <div className='w-full h-[100vh] bg-black flex items-center justify-center p-6'>
      <div className='w-full md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg bg-gray-800'>
        <p className='text-white text-lg font-semibold'>Email Address</p>
        <span className='text-sm text-white'>
          Enter email address used during registration
        </span>
        <form onSubmit={handleSubmit(onSubmit)}
          className='py-4 flex flex-col gap-5' 
        >
          <TextInput 
            name=""
            placeholder="email@example.com"
            type="email"
            register={register("email", {
              required: "Email Address is required!",
            })}
            styles="w-full rounded-lg"
            labelStyle="ml-2"
            error={errors.email ? errors.email.message : ""}
          />
          {
            errMsg?.message && (
              <span
                role="alert"
                className={`text-sm ${
                  errMsg?.status === "failed"
                  ? "text-red-500"
                  : "text-green-500"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )
          }

          {
            isSubmitting ? 
            (
              <Loading />
            )
            : 
            (
              <CustomButton 
                type="submit"
                containerStyles={`inline-flex justify-center rounded-md bg-green-500 px-8 py-3 text-sm font-medium text-white outline-none`}
                title="Submit"
              />
            )
          }

        </form>
      </div>
    </div>
  )
}

export default ResetPassword