import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../Components/Loading'
import { GoalItem } from '../Components/GoalItem'
import { GoalForm } from '../Components/GoalForm'
import { getGoals, reset } from '../features/goals/goalSlice'
export const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth.user)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals.goals
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className='content'>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-white   uppercase bg-gray-900  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Head
                </th>
                <th scope="col" className="px-6 py-3">
                  Desc
                </th>
                <th scope="col" className="px-6 py-3">
                  Created Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Deadline
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {goals && goals.map((goal) => (
                <GoalItem key={goal._id} goal={goal} />
              ))}


            </tbody>
          </table>
        </div>

      </section>
    </>

  )
}
