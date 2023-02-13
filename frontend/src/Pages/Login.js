import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import { Loading } from '../Components/Loading'
export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (password === null || email === null) {
      alert('Lütfen boş alan bırakmayınız')
    } else {
      const userData = {
        email,
        password,
      }
      dispatch(login(userData))
    }
  }

  if (isLoading) {
    return <Loading />
  }
  return (

    <section className='p-24'>
      <section className='heading mb-5 flex-col flex gap-5'>
        <h1 className='text-2xl'>
          Giriş Yap
        </h1>
        <p>Lütfen giriş bilgilerinizi giriniz.</p>
      </section>
      <form className='flex flex-col gap-6' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 '
            id='email'
            name='email'
            value={email}
            placeholder='Email adresinizi giriniz'
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 '
            id='password'
            name='password'
            value={password}
            placeholder='Şifrenizi giriniz'
            onChange={onChange}
          />
        </div>

        <div className='form-group'>
          <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            Giriş Yap
          </button>
        </div>
      </form>
    </section>

  )
}
