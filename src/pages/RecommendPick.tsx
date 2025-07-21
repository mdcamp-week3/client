import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Header from '../components/common/Header';

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
      
      {/* 메인 콘텐츠 - 헤더와 간격 더 줄임 */}
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

          <p className="text-[1.5vw] text-black font-yspotlight mt-[5vh]">
            먼저, 대화 상황에 어울리는 카테고리를 골라주세요
          </p>
        </div>



        {/* ✅ 정확한 스크린샷과 같은 레이아웃 */}
        <div className="w-[150vw] max-w-[600px] mt-[5vh] flex flex-wrap items-start">
          {[
            "장난스럽게", "너에 대해 더 알고 싶어", "설렘이 필요할 때",
            "취향 공유하기", "과거 이야기", "은근히 떠보기",
            "가벼운 농담", "연애 가치관", "일상 공유형", "이상형 토크",
            "연애 밸런스 게임", "티나는 호감 표현", "TMI 폭격 !"
          ].map((text, index) => (
            <div
          key={index}
          className="inline-block px-4 py-2 mr-2 mb-2 rounded-[10px] bg-white border border-gray-300 whitespace-nowrap 
                    text-[30px] font-pretendard font-semibold text-[#8A898ECC]"
        >
          {text}
        </div>

          ))}
        </div>
        

        {/* Action Button - 화면 크기에 비례 */}
        <div className="w-full mt-[5vh]">
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => console.log('분석 시작')}
            className="h-[8vh] text-[1.7vw] font-semibold px-[5vw] mx-auto block"
          >
            선택하기
          </Button>
        </div>

      </div>
    </div>
  );
};

export default RecommendFlow;