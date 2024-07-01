import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ProfileCard, Topbar, FriendsCard, CustomButton, TextInput, Loading, PostCard } from '../components'
import { friends, requests, suggest, posts } from '../assets/data';
import { Link } from 'react-router-dom';
import { NoProfile } from '../assets';
import { BsPersonFillAdd, BsFiletypeGif } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import {BiImages, BiSolidVideo} from "react-icons/bi";



const Home = () => {
  const {user} = useSelector(state => state.user)
  const {theme} = useSelector(state => state.theme)
  const [friendRequest, setFriendRequest] = useState(requests)
  const [suggestedFriends, setSuggestedFriends] = useState(suggest);
  const [errMsg, setErrMsg] = useState("")
  const {register, handleSubmit, formState:{errors}} = useForm(); 
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);


  const handlePostSubmit = async (data) => {

  }

  console.log(theme)
  return (
    <div className={`w-full px-0 lg:px-10 pb-20 2xl:px-40 ${theme === 'light' ? "bg-white" : "bg-black"} lg:rounded-lg h-screen overflow-hidden`}>
      <Topbar />
      <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
        {/* LEFT */}
        <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto  '>
          <ProfileCard user={user}/>
          <FriendsCard friends={user?.friends} />
        </div>

        {/* CENTER */}
        <div className='flex-1 h-full bg-gray-800 px-4 flex flex-col gap-6 overflow-y-auto rounded-lg'>
          <form
            className='bg-gray-800 px-6 rounded-lg '
            onSubmit={handlePostSubmit(handlePostSubmit)}
          >
            <div className='w-full flex items-center gap-2 py-4 border-b border-green-600'>
              <img 
                src={user?.profileUrl ?? NoProfile}
                alt='User Image'
                className='w-14 h-14 rounded-full object-cover'
                
              />
              <TextInput styles="w-full rounded-full py-5 "
                placeholder="What's on your mind..."
                name="description"
                register={register("description", {
                  required: "Write something about post",
                })}
                error={errors.description ? errors.description.message : ""}
              />
            </div>
            {
              errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm ${errMsg?.status === "failed" ? "text-red-500" : "text-green-500"} mt-0.5`}                
                >
                  {errMsg?.message}
                </span>
              )
            }
            <div className='flex items-center justify-between py-4'>
              <label htmlFor='imgUpload'
                className='flex items-center gap-1 text-base text-white hover:text-green-600 cursor-pointer'
              >
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className='hidden'
                  id="imgUpload"
                  data-max-size="5120"
                  accept=".jpg, .png, .jpeg" 
                />

                <BiImages />
                Image
              </label>

              <label htmlFor='videoUpload'
                className='flex items-center gap-1 text-base text-white hover:text-green-600 cursor-pointer'
              >
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className='hidden'
                  id="videoUpload"
                  data-max-size="5120"
                  accept=".mp4, .wav" 
                />

                <BiSolidVideo/>
                Video
              </label>

              <label htmlFor='vgifUpload'
                className='flex items-center gap-1 text-base text-white hover:text-green-600 cursor-pointer'
              >
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className='hidden'
                  id="vgifUpload"
                  data-max-size="5120"
                  accept=".gif" 
                />

                <BsFiletypeGif />
                Gif
              </label>

              <div>
                {
                  posting ? (
                    <Loading /> 
                  ) : (
                    <CustomButton 
                      type="submit"
                      title="Post"
                      containerStyles="bg-green-600 text-white py-1 px-6 rounded-full font-semibold text-sm"
                    />
                  )
                }
              </div>          
            </div>
          </form>

          {
            loading ? (
              <Loading />
            ) :            
              posts?.length > 0 ? (
                posts?.map((post) => (
                  <PostCard key={post?._id} post={post}
                    user={user}
                    delete={() => {}}
                    likePost ={() => {}}
                  />
                ))
              ) : (
                 <div className="flex w-full h-full items-center justify-center">
                  <p className="text-lg text-white">No Post Available</p>                 
                 </div>
              )            
          }
        </div>

        {/* RIGHT */}
        <div className='hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto '>
          {/* FRIEND REQUEST */}
          <div className='w-full bg-gray-800 shadow-sm rounded-lg px-6 py-5 '>
            <div className='flex items-center justify-between text-xl text-white pb-2 border-b border-green-400'>
              <span>Friend Request</span>
              <span>
                {
                  friendRequest?.length
                }
              </span>
            </div>

            <div className='w-full flex flex-col gap-4 pt-4'>
              {
                friendRequest?.map(({_id, requestFrom:from}) => (
                  <div key={_id} className='flex items-center justify-between'>
                    <Link to={`/profile/` +from._id} className='w-full flex gap-4 items-center cursor-pointer'>
                      <img 
                        src={from?.profileUrl ?? NoProfile}
                        alt={from?.firstName}
                        className='w-10 h-10 object-cover rounded-full'
                      />
                      <div className='flex-1'>
                        <p className='text-base font-medium text-white'>
                          {from?.firstName} {from?.lastName}
                          
                        </p>
                        <span className='text-sm text-white'>
                          {from?.profession ?? "No Profession"}
                        </span>
                      </div>                    
                    </Link>

                    <div className='flex gap-1 '>
                      <CustomButton 
                        title="Accept"
                        containerStyles="bg-green-600 text-xs text-white px-1.5 py-1 rounded-full"
                      />

                      <CustomButton 
                        title="Deny"
                        containerStyles="border border-green-600 text-xs text-white px-1.5 py-1 rounded-full"
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          {/* SUGGESTED FRIENDS */}
          <div className='w-full bg-gray-800 shadow-sm rounded-lg px-5 py-5'>
            <div className='flex items-center justify-between text-lg text-white border-green-600'>
              <span>
                Friend Suggestion
              </span>
            </div>
            <div className='w-full flex flex-col gap-4 pt-4'>
              {
                suggestedFriends?.map((friend) => (
                  <div className='flex items-center justify-between' key={friend._id}>
                    <Link to={`/profile/`+friend?._id}
                      key={friend?._id}
                      className='w-full flex gap-4 items-center cursor-pointer'
                    >
                      <img 
                        src={friend?.profileUrl ?? NoProfile}
                        alt={friend?.firstName}
                        className='w-10 h-10 object-cover rounded-full'
                      />
                      <div className='flex-1'>
                        <p className='text-base font-medium text-white'>
                          {
                            friend?.firstName
                          } {friend?.lastName}
                        </p>
                        <span className='text-sm text-white'>{friend?.profession ?? "No Profession"}</span>
                      </div>                    
                    </Link>

                    <div className='flex gap-1'>
                      <button
                        className='bg-green-600 text-sm text-white p-1 rounded'
                        onClick={() => {}}
                      >
                        <BsPersonFillAdd size={20} className='text-green-200'/>

                      </button>

                    </div>

                  </div>
                ))
              }

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home