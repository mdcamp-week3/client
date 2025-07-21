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

  return (
    <div className="w-full min-h-screen bg-white overflow-y-auto">
      {/* 로고는 고정 크기 */}
      <div className="pl-5 w-[300px]">
        <Header />
      </div>
      
      
      {/* 메인 콘텐츠 */}
      <div className="flex flex-col items-center w-full pt-[2vh] px-[5vw] pb-[10vh] overflow-y-auto">
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
        
        </div>

        <div className="relative w-[60vw] max-w-[500px] mx-auto mt-[3vh]">
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
            </div>

        {/* Action Button - 화면 크기에 비례 */}
        {/* 👇 버튼 3개 한 줄 */}
            <div className="flex justify-center items-center gap-[2vw] mt-[2vh]">
            <Button 
                variant="primary" 
                size="xs" 
                className="px-[2vw] py-[1vh] text-[1.1vw] h-[80px] font-semibold"
                onClick={() => console.log('다시 추천')}
            >
                다시 추천
            </Button>

            <Button 
                variant="gray" 
                size="xs" 
                className="px-[2vw] py-[1vh] text-[1.1vw] h-[80px] font-semibold"
                onClick={() => console.log('복사하기')}
            >
                복사하기
            </Button>

            <Button 
                variant="gray" 
                size="xs" 
                className="px-[2vw] py-[1vh] text-[1.1vw] h-[80px] font-semibold"
                onClick={() => console.log('저장하기')}
            >
                저장하기
            </Button>
            </div>

      </div>
    </div>
  );
};

export default RecommendFlow;