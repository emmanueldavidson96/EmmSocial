import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { NoProfile } from '../assets';
import { UpdateProfile } from '../redux/userSlice';
import {LiaEditSolid} from "react-icons/lia";
import { BsBriefcase, BsInstagram, BsPersonFillAdd } from 'react-icons/bs';
import {CiLocationOn} from "react-icons/ci";
import moment from 'moment';
import {FaTwitterSquare} from "react-icons/fa";
import {BsFacebook} from "react-icons/bs";

const ProfileCard = ({user}) => {
    const {
        user: data, edit
    } = useSelector((state) => state.user)
    const dispatch = useDispatch();

  return (
    <div className='w-full bg-gray-800 flex flex-col items-center shadow-sm rounded-xl px-6 py-4 '>
        <div className='w-full flex items-center justify-between border-b pb-5 border-[#66666645]'>
            <Link to={"/profile/"+user?._id} className='flex gap-2'>
                <img 
                    src={user?.profileUrl ?? NoProfile} 
                    alt={user?.email} 
                    className='w-14 h-14 object-cover rounded-full'/>  
                    <div className='flex flex-col justify-center'>
                        <p className='text-lg font-medium text-white'>
                            {user?.firstName} {user?.lastName}
                        </p>
                        <span className='text-white'>
                            {user?.profession ?? "No Profession"}
                        </span>

                    </div>          
            </Link>

            <div className=''>
                {user?._id === data?._id ? (
                    <LiaEditSolid 
                        size={22}
                        className="text-blue cursor-pointer"
                        onClick={() => dispatch(UpdateProfile(true))}
                    />
                )
                : (
                    <button
                        className='bg-green-200 text-sm text-white p-1 rounded'
                        onClick={() => {}}
                    >
                        <BsPersonFillAdd size={20} className='text-green-400'/>
                    </button>
                )            
            }
            </div>
        </div>

        <div className='w-full flex flex-col gap-2 py-4 border-b border-green-400'>
            <div className='flex gap-2 items-center text-white'>
                <CiLocationOn className="text-xl text-white"/>
                <span>{user?.location ?? "Add Location"}</span>

            </div>

            <div className='flex gap-2 items-center text-white'>
                <BsBriefcase className='text-lg text-white'/>
                <span>
                    {
                        user?.profession ?? "Add Profession"
                    }
                </span>
            </div>
        </div>

        <div className='w-full flex flex-col gap-2 py-4 border-b border-green-400'>
            <p className='text-xl text-white font-semibold'>
                {
                    user?.friends?.length
                } Friends
            </p>
            <div className='flex items-center justify-between'>
                <span className='text-gray-500'>
                    Who viewed your profile?
                </span>
                <span className='text-white text-lg'>
                    {
                        user?.views?.length
                    }
                </span>
            </div>
            <span className='text-base text-green-400'>
                {
                    user?.verified ? "Verified Account" : "Not Verified"
                }
            </span>

            <div className='flex items-center justify-between'>
                <span className='text-white'>
                    Joined
                </span>
                <span className='text-white text-base'>
                    {moment(user?.createdAt).fromNow()}
                </span>
            </div>
        </div>

        <div className='w-full flex flex-col gap-4 py-4 pb-6'>
            <p className='text-white text-lg font-semibold'>Social Profile</p>

            <div className='flex gap-2 items-center text-white'>
                <BsInstagram className='text-xl text-white'/>
                <span>Instagram</span>
            </div>

            <div className='flex gap-2 items-center text-white'>
                <FaTwitterSquare className="text-xl text-white"/>
                <span>Twitter</span>
            </div>

            <div className='flex gap-2 items-center text-white'>
                <BsFacebook className="text-xl text-white"/>
                <span>Facebook</span>
            </div>

        </div>

        

    </div>
  )
}

export default ProfileCard