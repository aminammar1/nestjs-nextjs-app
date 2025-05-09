'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6'
import { signupSchema } from '@/lib/signupSchema'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Toast from '@/components/custom/Toast'
import { ClipLoader } from 'react-spinners'
import { signup } from '@/actions/auth'

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toastData, setToastData] = useState(null)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  })

  const onSubmit = async (data) => {
    setLoading(true)

    const result = await signup(data)

    if (result.success) {
      setToastData({
        status: 'success',
        message: result.message || 'Signup successful!',
      })
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/sign-in')
      }, 2000)
    } else {
      setToastData({
        status: 'error',
        message: result.message || 'Signup failed',
      })
    }

    setTimeout(() => {
      setToastData(null)
    }, 3000)

    setLoading(false)
  }

  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md mx-auto">
      <h2 className="text-xl font-semibold text-center text-gray-900">
        Sign up for EL Boutique
      </h2>
      <p className="text-center text-gray-500 mb-4">
        Create an account to get started
      </p>

      {/* Show Toast if there is a message */}
      {toastData && (
        <Toast status={toastData.status} message={toastData.message} />
      )}

      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            {...register('name')}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-black"
            placeholder="Enter your full name"
          />
          <p className="text-red-500 text-xs">{errors.name?.message}</p>
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register('email')}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-black"
            placeholder="Enter your email"
          />
          <p className="text-red-500 text-xs">{errors.email?.message}</p>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-black"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          <p className="text-red-500 text-xs">{errors.password?.message}</p>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-black"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          <p className="text-red-500 text-xs">
            {errors.confirmPassword?.message}
          </p>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('terms')}
            className="h-4 w-4 text-black border-gray-300 rounded accent-black"
          />
          <label className="ml-2 text-sm text-gray-700">
            I agree to the Terms & Conditions
          </label>
        </div>
        <p className="text-red-500 text-xs">{errors.terms?.message}</p>

        {/* Signup Button with Spinner */}
        <button
          className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800 flex justify-center items-center"
          type="submit"
          disabled={loading}
        >
          {loading ? <ClipLoader color="#fff" size={20} /> : 'Sign up →'}
        </button>
      </form>

      {/* Already have an account? */}
      <p className="text-center text-gray-500 mt-4">
        Already have an account?{' '}
        <Link href="/sign-in" className="text-gray-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
