import React from 'react'
import MusicPlayer from './MusicPlayer';

const MainSection = () => {
  return (
    <div className='w-4/5 pt-4 bg-gradient-to-b from-red-900 to-black ml-[20%]'>
      <div className="flex justify-around">
        <div className="flex justify-center items-center gap-6 cursor-pointer">
            <span>Music</span>
            <span>Prdcast</span>
            <span>Live</span>
            <span>Radio</span>
        </div>
        <div className="flex p-2 px-6 bg-[rgb(44,0,0)] rounded-3xl cursor-pointer">
            <input type="text" value={"Michael Jackson"} className='bg-[rgb(44,0,0)] mr-10' />
            <img src="Vector4.png" alt="" className='w-6' />
        </div>
      </div>
      <div className="flex justify-center items-center mt-10">
        <img src="Artist.png" alt="" className='w-[80%]' />
      </div>
      <div className="popular">
        <MusicPlayer/>
      </div>
    </div>
  )
}

export default MainSection;
