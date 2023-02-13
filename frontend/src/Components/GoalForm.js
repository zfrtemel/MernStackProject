import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'

export const GoalForm = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        head: '',
        desc: '',
        // deadline: '',
    })

    const SubmitCreateGoal = (e) => {
        e.preventDefault()
        console.log('submit');
        dispatch(createGoal(formData))
        setFormData({
            head: '',
            desc: '',
            // deadline: '',
        })
    }

    return (
        <form className="w-full flex justify-center" onSubmit={SubmitCreateGoal}>
            <div className=' flex flex-col justify-center'>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="head_item">
                        Goal Head
                    </label>
                    <input id='head_item' className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="new Goal Head"
                        onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                        value={formData.head}
                    />
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="desc_item">
                        Goal desc
                    </label>
                    <textarea
                        id='desc_item'
                        value={formData.desc}
                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="new Goal Desc" />
                </div>
                {/* <div className="flex flex-wrap -mx-3 mb-6">
                    <div className=" relative form-floating mb-3 xl:w-96" >
                        <label htmlFor="deadline_item" className="text-gray-700">SELECT A DATE</label>
                        <input type="date"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id='deadline_item'
                            placeholder="DD/MM/YYYY"
                            value={formData.deadline}
                            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        />
                    </div>
                </div> */}
                <button type="submit" className=" text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2 ">
                    Create Goal
                </button>
            </div>
        </form>
    )
}
