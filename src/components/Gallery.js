import React from 'react'
import GalleryBody from './GalleryBody'


const Gallery = () => {
  return (
    <div className='bg-slate-200 rounded-lg w-100'>
        <div className="body px-4 py-4">
          {/* Show all the imnages  */}
            <GalleryBody />
        </div>   

    </div>
  )
}

export default Gallery