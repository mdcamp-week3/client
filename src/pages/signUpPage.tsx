'use client';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Talktic_logo.png';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div
        className="w-full max-w-md rounded-2xl shadow-md p-8 sm:p-10"
        style={{ borderColor: 'rgba(255, 110, 117, 0.8)', borderWidth: '5px' }}
      >
        {/* 로고 */}
        <div className="flex flex-col items-center justify-center mb-6 space-y-1">
          <img
            src={logo}
            alt="로고"
            className="w-[80vw] max-w-[300px] h-auto object-contain"
          />
        </div>

        {/* 폼 */}
        <form className="space-y-2">
          {/* 이름 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 pl-2 mb-1 text-left">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              //defaultValue="robert.langster@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E75]"
            />
          </div>

          {/* 이메일 */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 pl-2 mb-1 text-left">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E75]"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 pl-2 mb-1 text-left">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E75]"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 pl-2 mb-1 text-left">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E75]"
            />
          </div>

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            className="w-full bg-[#FF6E75] text-white py-2 rounded-md hover:bg-[#e35763] transition"
          >
            Sign Up
          </button>

          {/* 로그인 링크 */}
          <p className="text-sm text-center text-gray-600 mt-2">
            Already have an account?{' '}
            <span
              onClick={handleLoginClick}
              className="text-[#FF6E75] font-medium cursor-pointer hover:underline"
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
