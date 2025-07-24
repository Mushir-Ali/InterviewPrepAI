import React, { useRef, useState } from 'react'
import {LuUser,LuUpload,LuTrash} from 'react-icons/lu';



const ProfilePhotoSelector = ({
    image,
    setImage,
    preview,
    setPreview
}) => {

    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // update the image state
            setImage(file);
            // generate a preview URL
            const preview = URL.createObjectURL(file);
            if(setPreview){
                setPreview(preview);
            }
            // update the preview URL state
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        // clear the image state
        setImage(null);
        // clear the preview URL state
        setPreviewUrl(null);
        // clear the preview state
        if(setPreview){
            setPreview(null);
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

  return <div className='flex justify-center mb-6'>
    <input type='file'
    accept='image/*'
    ref={inputRef}
    onChange={handleImageChange}
    className='hidden'
    />

    {!image ? (
        <div className='w-20 h-20 flex justify-center items-center bg-orange-50 rounded-full relative cursor-pointer'>
            <LuUser className=' text-4xl text-orange-500' />

            <button
              type='button'
              onClick={onChooseFile}
              className=' w-8 h-8 flex justify-center items-center bg-linear-to-r from-orange-500/50 to-orange-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
            >
                <LuUpload className='' />
            </button>
        </div>
    ):(
        <div className='relative'>
            <img src={preview || previewUrl} 
            alt="Profile Photo" 
            className='w-20 h-20 object-cover rounded-full'
            />
            <button type='button'
            className=' w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
            onClick={handleRemoveImage}>
                <LuTrash />
            </button>
        </div>
    )}
  </div>
}

export default ProfilePhotoSelector