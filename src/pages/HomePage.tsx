import React from 'react';
import { useNavigate } from 'react-router-dom';
import phoneImage from '../assets/phone.png';
import logo from '../assets/Talktic_logo.png';
import Button from '../components/common/Button';


const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleUpload = () => {
    navigate('/upload');
  };

  const handleRecommendPick = () => {
    navigate('/RecommendPick');
  };

  
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden px-[5vw] ">
      {/* 상단 - 핸드폰 이미지 + 로고 */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-[5vh] lg:space-y-0 lg:space-x-[5vw] h-[100vh]">
        {/* 핸드폰 이미지 */}
        <img
          src={phoneImage}
          alt="핸드폰"
          className="object-contain 
    self-end
    w-full
    max-w-[400px] 
    sm:max-w-[300px] 
    md:max-w-[400px] 
    lg:max-w-[450px] 
    xl:max-w-[500px]
    h-auto"
        />

        {/* 로고 + 버튼들 */}
        <div className="flex flex-col items-center">
          {/* 로고 */}
          <img
            src={logo}
            alt="로고"
            className="w-[60vw] max-w-[600px] h-auto object-contain mb-[2vh]"
          />

          {/* 버튼 1 */}
          <div className="w-[60vw] max-w-[450px] mb-[2vh]">
            <Button variant="primary" size="lg" onClick={handleUpload} className="w-full text-[1.5vw] lg:text-[1.2vw]">
              
              대화 분석하기
            </Button>
          </div>

          {/* 버튼 2 */}
          <div className="w-[60vw] max-w-[450px]">
            <Button variant="outline" size="lg" onClick={handleRecommendPick} className="w-full text-[1.5vw] lg:text-[1.2vw]">
              연애 코칭받기
            </Button>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            <span
              className="text-[#FF6E75] text-[18px] cursor-pointer hover:underline mr-3"
              onClick={() => navigate('/login')}
            >
              로그인
            </span>
            |
            <span
              className="text-[#FF6E75] text-[18px] cursor-pointer hover:underline ml-3"
              onClick={() => navigate('/signup')}
            >
              회원가입
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 