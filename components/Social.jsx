import Image from 'next/image'
import React from 'react'

const Social = () => {
  return (
    <div className='flex flex-row gap-2 items-center justify-center'>
        <button type="button" className="bg-pinky h-10 w-10 flex items-center justify-center p-2 rounded-full">
            <Image
                src={'/svgs/facebook.svg'}
                alt='button'
                width={12}
                height={12}
                className='object-contain'
            />
        </button>
        <button type="button" className="bg-pinky h-10 w-10 flex items-center justify-center p-2 rounded-full">
            <Image
                src={'/svgs/google.svg'}
                alt='button'
                width={20}
                height={20}
                className='object-contain'
            />
        </button>
        <button type="button" className="bg-pinky h-10 w-10 flex items-center justify-center p-2 rounded-full">
            <Image
                src={'/svgs/apple.svg'}
                alt='button'
                width={20}
                height={20}
                className='object-contain'
            />
        </button>
    </div>
  )
}

export default Social