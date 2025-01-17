import React from 'react'
import { TbSocial } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import TextInput from './TextInput'
import CustomButton from './CustomButton'
import { useForm } from 'react-hook-form'
import { BsMoon, BsSunFill } from 'react-icons/bs'
import {IoMdNotificationsOutline} from "react-icons/io"
import { SetTheme } from '../redux/theme';
import { Logout } from '../redux/userSlice'

export default function Topbar() {
    const {theme} = useSelector(state => state.theme)
    const {user} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const {
        register, 
        handleSubmit, 
        formState:{errors}
    } = useForm()

    const handleSearch = async (data) => {}
    const handleTheme = () => {
        const themeValue = theme === "light" ? "dark" : "light";
        dispatch(SetTheme(themeValue));
    };
    console.log(theme)

  return (
    <div className='w-full flex items-center justify-between py-3 md:py-6 px-4 bg-gray-800'>
        <Link to="/" className='flex gap-2 items-center w-fit h-fit'>
            <div className='p-1 md:p-2 bg-green-600 rounded text-white'>
                <TbSocial/>
            </div>        
            <span className='text-xl md:text-2xl text-white font-semibold'>
                EmmSocials
            </span>
        </Link>

        <form onSubmit={handleSubmit(handleSearch)} className='hidden md:flex items-center justify-center'>
            <TextInput
                placeholder="Search..."
                styles="w-[18rem] lg:w-[38rem] rounded-l-full py-3"
                register={register("search")} 
            /> 
            <CustomButton
                title="Search"
                type="submit"
                containerStyles="bg-green-600 text-white px-6 py-2.5 mt-2 rounded-r-full"
            />
        </form>

        <div className='flex gap-4 items-center text-white text-md md:text-xl'>
            <button onClick={() => handleTheme()}>
                {theme ? <BsMoon/> : <BsSunFill />  }
            </button>
            <div className='hidden lg:flex'>
                <IoMdNotificationsOutline />
            </div>  
            <div>
                <CustomButton
                    onClick={() => dispatch(Logout())}
                    title="Log Out"
                    containerStyles="text-sm text-white px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"               
                />
            
            </div>          
        </div>

    </div>
  )
}
