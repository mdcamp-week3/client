import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import speechBubble from '../assets/bubble.png';

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

    const handleFlowPick = () => {
    navigate('/recommendflow');
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-y-auto">
      {/* 로고는 고정 크기 */}
      <div className="pl-5 w-[300px]">
        <Header />
      </div>
      
      
      {/* 메인 콘텐츠 */}
      <div className="flex flex-col items-center w-full pt-[0vh] px-[5vw] pb-[10vh] overflow-y-auto">
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
              className="px-[2vw] py-[1vh] text-[30px] font-pretendard"
            >
              직접 주제 고르기
            </Button>
            <Button 
              variant="gray-outline" 
              size="sm"
              onClick={handleFlowPick}
              className="px-[2vw] py-[1vh] text-[30px] font-pretendard"
            >
              대화 흐름 이어가기
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRandomPick}
              className="px-[2vw] py-[1vh] text-[30px] font-pretendard"
            >
              랜덤 대화 주제
            </Button>
          </div>
        
        </div>

        <div className="relative w-[60vw] max-w-[600px] mx-auto mt-[3vh]">
            {/* 말풍선 이미지 */}
            <img
                src={speechBubble}
                alt="말풍선"
                className="w-full h-auto"
            />

            {/* 말풍선 안 텍스트 */}
            <div className="absolute inset-0 px-[10%] flex flex-col items-center">
                {/* 위에서 약간 떨어진 "밸런스게임" */}
                <p className="mt-[8%] text-[1.7vw] font-regular font-yspotlight">밸런스게임</p>

                {/* 아래쪽에서 중앙보다 약간 내려간 위치에 메인 텍스트 */}
                <div className="flex-grow flex items-center justify-center">
                <p className="text-[1.3vw] text-black font-regular font-yspotlight whitespace-pre-line leading-tight mt-[-5vh]">
                    많이 먹어도 살 안 찌기{"\n"}vs{"\n"}잘 안 자도 멀쩡하기
                </p>
                </div>
            </div>

        {/* Action Button - 화면 크기에 비례 */}
        {/* 👇 버튼 3개 한 줄 */}
            <div className="flex justify-center space-x-[2vw] w-full px-[20vw] mt-[2vh]">
            <Button 
                variant="primary" 
                size="xs"
                onClick={() => console.log('다시 추천')}
                className="flex-1 h-[8vh] text-[1.7vw] font-semibold !text-left"
            >
                <div className="flex items-center justify-center space-x-[1vw] w-full">
                    {/* 다시 추천 아이콘 */}
                    <svg 
                        className="w-[2vw] h-[2vw]" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                        />
                    </svg>
                    <span>다시 추천</span>
                </div>
            </Button>

            <Button 
                variant="gray" 
                size="xs"
                onClick={() => console.log('복사하기')}
                className="flex-1 h-[8vh] text-[1.7vw] font-semibold !text-left"
            >
                <div className="flex items-center justify-center space-x-[1vw] w-full">
                    {/* 복사 아이콘 */}
                    <svg 
                        className="w-[2vw] h-[2vw]" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2" stroke="currentColor" fill="none"/>
                        <rect x="3" y="3" width="13" height="13" rx="2" ry="2" strokeWidth="2" stroke="currentColor" fill="none"/>
                    </svg>
                    <span>복사하기</span>
                </div>
            </Button>

            <Button 
                variant="gray" 
                size="xs"
                onClick={() => console.log('저장하기')}
                className="flex-1 h-[8vh] text-[1.7vw] font-semibold !text-left"
            >
                <div className="flex items-center justify-center space-x-[1vw] w-full">
                    {/* 저장 아이콘 */}
                    <svg 
                        className="w-[2vw] h-[2vw]" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 5v16l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" 
                        />
                    </svg>
                    <span>저장하기</span>
                </div>
            </Button>
            </div>

      </div>
    </div>
  );
};

export default RecommendFlow;