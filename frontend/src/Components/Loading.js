import React from 'react'

export const Loading = (props) => {
    return (
        <div className='w-full h-full p-72'>
            <div className="flex justify-center items-center">
                <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                    <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-28 w-28">
                      {console.log(props)}
                    </div>
                </div>
            </div>
        </div>
    )
}
