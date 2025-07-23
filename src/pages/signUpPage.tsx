'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Talktic_logo.png';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        localStorage.setItem('userId', data.userId);
        setError(data.message || '회원가입 실패');
        setLoading(false);
        return;
      }

      // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/login');
    } catch (err) {
      setError('서버 오류');
      setLoading(false);
    }
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
        <form className="space-y-2" onSubmit={handleSubmit}>
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
            disabled={loading}
          >
            {loading ? '회원가입 중...' : 'Sign Up'}
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
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
