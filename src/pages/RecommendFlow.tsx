import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import thinkBubble from '../assets/thinkbubble.png';

const RecommendFlow: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    console.log('Dropped files:', files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      console.log('Selected files:', files);
    }
  };

  const handleIconClick = () => {
    setShowHeart(!showHeart);
  };

  const handleDirectPick = () => {
    navigate('/recommendpick');
  };

  const handleRandomPick = () => {
    navigate('/recommendrandom');
  };

  return (
    <div className="w-full h-screen bg-white overflow-hidden">
      {/* 로고는 고정 크기 */}
      <div className="pl-5 w-[300px]">
        <Header />
      </div>
      
      {/* 메인 콘텐츠 - 헤더와 간격 더 줄임 */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-220px)] w-full">
        {/* Page Title - 화면 크기에 비례 */}
        <div className="text-center mb-[1vh] w-full px-[8vw]">
          <div className="flex items-center justify-center space-x-[1.2vw]">
          <span className="text-[3vw] font-yspotlight text-custom-pink">왛</span>
            <h1 className="text-[4vw] font-yspotlight text-black">
              대화 주제를 추천해줄게요
            </h1>
            <span className="text-[3vw] font-yspotlight text-custom-pink">왛</span>
          </div>
          
          {/* 옵션 버튼들 */}
          <div className="flex justify-center space-x-[2vw] mt-[2vh]">
            <Button 
              variant="gray-outline" 
              size="sm"
              onClick={handleDirectPick}
              className="px-[2vw] py-[1vh] text-[1.18vw] font-pretendard"
            >
              직접 주제 고르기
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="px-[2vw] py-[1vh] text-[1.18vw] font-pretendard"
            >
              대화 흐름 이어가기
            </Button>
            <Button 
              variant="gray-outline" 
              size="sm"
              onClick={handleRandomPick}
              className="px-[2vw] py-[1vh] text-[1.18vw] font-pretendard"
            >
              랜덤 대화 주제
            </Button>
          </div>
          
          {/* 말풍선 아이콘 - 화면 크기에 비례 */}
          <div className="flex justify-center mt-[2vh]">
            <img 
              src={thinkBubble} 
              alt="Think Bubble" 
              className="w-[8vw] h-[8vw] object-contain"
            />
          </div>
        </div>

        {/* Upload Area - 화면 크기에 비례 */}
        <div className="w-full px-[25vw] mb-[4vh]">
          <div
            className={`border-2 border-dashed border-gray-400 rounded-lg p-[2vw] text-center transition-colors bg-gray-100 ${
              isDragOver ? 'border-custom-pink bg-gray-200' : 'border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-[1vh]">
              {/* Upload Icon - 화면 크기에 비례 */}
              <div className="w-[3vw] h-[3vw] flex items-center justify-center">
                <svg 
                  className="w-[3vw] h-[3vw] text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                  />
                </svg>
              </div>
              
              {/* Upload Text - 화면 크기에 비례 */}
              <div>
                <p className="text-[1.3vw] font-pretendard text-black">
                  카톡 대화 캡처 장면을 업로드하세요.
                </p>
              </div>
              
              {/* File Input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-custom-pink hover:text-custom-pink80 font-medium text-[1.1vw]"
              >
                파일 선택하기
              </label>
            </div>
          </div>
        </div>

        {/* Action Button - 화면 크기에 비례 */}
        <div className="text-center w-full px-[40vw]">
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => console.log('주제 추천받기')}
            className="w-full h-[8vh] text-[1.7vw] font-semibold"
          >
            주제 추천받기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendFlow;