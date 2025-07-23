'use client';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Talktic_logo.png'; // 실제 경로에 맞게 조정하세요

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md  rounded-2xl shadow-md p-8 sm:p-10"
      style={{ borderColor: 'rgba(255, 110, 117, 0.8)', borderWidth: '5px' }}>
        {/* 로고 */}
        <div className="flex flex-col items-center justify-center mb-6 space-y-2">
          <img
            src={logo}
            alt="로고"
            className="w-[80vw] max-w-[300px] h-auto object-contain"
          />
        </div>

        {/* 폼 */}
        <form className="space-y-6">
          {/* 이메일 */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium pl-2 text-left text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              //defaultValue="robert.langster@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E75]"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label htmlFor="password" className="block text-sm text-left pl-2 font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              //defaultValue="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6E75]"
            />
          </div>

          {/* 옵션 */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox accent-[#FF6E75]" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-[#8E8E8E] hover:underline">
              Forgot password?
            </a>
          </div>

          {/* 버튼 */}
          <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4 mt-4">
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-[#FF6E75] text-white py-2 rounded-md hover:bg-[#e35763] transition"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleSignUpClick}
              className="w-full sm:w-1/2 border border-[#FF6E75] text-[#FF6E75] py-2 rounded-md hover:bg-[#ffe9ea] transition"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
