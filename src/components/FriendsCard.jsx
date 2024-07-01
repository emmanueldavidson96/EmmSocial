import React from 'react'
import { NoProfile } from '../assets'
import { Link } from 'react-router-dom'
const FriendsCard = ({friends}) => {
  return (
    <div className=''>
        <div className='w-full bg-gray-800 shadow-sm rounded-lg px-6 py-5'>
            <div className='flex items-center justify-between text-white pb-2 border-b border-green-400'>
                <span>Friends</span>
                <span>{friends?.length}</span>
            </div>

            <div className='w-full flex flex-col gap-4 pt-4'>
                {
                    friends?.map((friends) => (
                        <Link to={`/profile/`+friends?._id} key={friends?._id} className="w-full flex gap-4 items-center cursor-pointer">
                            <img src={friends?.profileUrl ?? NoProfile} alt={friends?.firstName} className='w-10 h-10 object-cover rounded-full'/>
                            <div className='flex-1'>
                                <p className='text-base font-medium text-white'>
                                    {
                                        friends?.firstName 
                                    }
                                    {
                                        friends?.lastName
                                    }
                                </p>
                                <span className='text-sm text-white'>
                                    {
                                        friends?.profession ?? "No Profession"
                                    }
                                </span>
                            </div>                        
                        </Link>
                    ))
                }

            </div>

        </div>

    </div>
  )
}

export default FriendsCard