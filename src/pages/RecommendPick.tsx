import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Button from '../components/common/Button';

const RecommendPick: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    console.log('선택된 카테고리:', category);
    // 나중에 TopicRecommendPage로 이동하는 로직 추가
  };

  return (
    <div className="w-full h-screen bg-white overflow-hidden">
      {/* 로고는 고정 크기 */}
      <div className="pl-5 w-[300px]">
        <Header />
      </div>
      
      {/* 메인 콘텐츠 */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-220px)] w-full">
        {/* Page Title */}
        <div className="text-center mb-[2vh] w-full px-[8vw]">
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
              variant="outline" 
              size="sm"
              className="px-[2vw] py-[1vh] text-[30px] font-pretendard"
            >
              직접 주제 고르기
            </Button>
            <Button 
              variant="gray-outline" 
              size="sm"
              onClick={() => navigate('/recommendflow')}
              className="px-[2vw] py-[1vh] text-[30px] font-pretendard"
            >
              대화 흐름 이어가기
            </Button>
            <Button 
              variant="gray-outline" 
              size="sm"
              onClick={() => navigate('/recommendrandom')}
              className="px-[2vw] py-[1vh] text-[30px] font-pretendard"
            >
              랜덤 대화 주제
            </Button>
          </div>
          
          {/* 서브 헤딩 */}
          <p className="text-[1.5vw] font-yspotlight text-gray-600 mt-[2vh]">
            먼저, 대화 상황에 어울리는 카테고리를 골라주세요
          </p>
        </div>

        {/* 카테고리 그리드 - 정확히 4줄로 배치 */}
        <div className="w-full px-[8vw] mb-[4vh]">
          {/* 첫 번째 줄 - 3개 (각각 더 넓게) */}
          <div className="flex gap-[1.5vw] mb-[1.2vw] justify-center">
            <button
              onClick={() => handleCategoryClick("컨텐츠 공유형")}
              className="border border-gray-300 rounded-lg p-[1.5vw] text-center hover:border-custom-pink hover:bg-gray-50 transition-colors w-[16vw] h-[6vh] flex items-center justify-center"
            >
              <span className="text-[1.2vw] font-pretendard text-gray-700">컨텐츠 공유형</span>
            </button>
            <button
              onClick={() => handleCategoryClick("너에 대해 더 알고 싶어")}
              className="border border-gray-300 rounded-lg p-[1.5vw] text-center hover:border-custom-pink hover:bg-gray-50 transition-colors w-[16vw] h-[6vh] flex items-center justify-center"
            >
              <span className="text-[1.2vw] font-pretendard text-gray-700">너에 대해 더 알고 싶어</span>
            </button>
            <button
              onClick={() => handleCategoryClick("설렘이 필요할 때")}
              className="border border-gray-300 rounded-lg p-[1.5vw] text-center hover:border-custom-pink hover:bg-gray-50 transition-colors w-[16vw] h-[6vh] flex items-center justify-center"
            >
              <span className="text-[1.2vw] font-pretendard text-gray-700">설렘이 필요할 때</span>
            </button>
          </div>
          
          {/* 두 번째 줄 - 3개 (각각 더 넓게) */}
          <div className="flex gap-[1.5vw] mb-[1.2vw] justify-center">
            <button
              onClick={() => handleCategoryClick("취향 공유하기")}
              className="border border-gray-300 rounded-lg p-[1.5vw] text-center hover:border-custom-pink hover:bg-gray-50 transition-colors w-[16vw] h-[6vh] flex items-center justify-center"
            >
              <span className="text-[1.2vw] font-pretendard text-gray-700">취향 공유하기</span>
            </button>
            <button
              onClick={() => handleCategoryClick("과거 이야기")}
              className="border border-gray-300 rounded-lg p-[1.5vw] text-center hover:border-custom-pink hover:bg-gray-50 transition-colors w-[16vw] h-[6vh] flex items-center justify-center"
            >
              <span className="text-[1.2vw] font-pretendard text-gray-700">과거 이야기</span>
            </button>
            <button
              onClick={() => handleCategoryClick("은근히 떠보기")}
              className="border border-gray-300 rounded-lg p-[1.5vw] text-center hover:border-custom-pink hover:bg-gray-50 transition-colors w-[16vw] h-[6vh] flex items-center justify-center"
            >
              <span className="text-[1.2vw] font-pretendard text-gray-700">은근히 떠보기</span>
            </button>
          </div>
          
          {/* 세 번째 줄 - 4개 (각각 더 좁게) */}
          <div className="flex gap-[1.5vw] mb-[1.2vw] justify-center">
            <button
              onClick={() => handleCategoryClick("만약에 시리즈")}
              className="border border-gray-300 rounded-lg p-[1.5vw] text-center hover:border-custom-pink hover:bg-gray-50 transition-colors w-[11.6vw] h-[6vh] flex items-center justify-center"
            >
              <span className="text-[1.2vw] font-pretendard text-gray-700">만약에 시리즈</span>
            </button>
            <button
              onClick={() => handleCategoryClick("연애 가치관")}
              className="border border-gray-300 rounded-lg p-[1.5vw] text-center hover:border-custom-pink hover:bg-gray-50 transition-colors w-[11.6vw] h-[6vh] flex items-center justify-center"
            >
              <span className="text-[1.2vw] font-pretendard text-gray-700">연애 가치관</span>
            </button>
            <button
              onClick={() => handleCategoryClick("일상 공유형")}
              className="border border-gray-300 rounded-lg p-[1.5vw] text-center hover:border-custom-pink hover:bg-gray-50 transition-colors w-[11.6vw] h-[6vh] flex items-center justify-center"
            >
              <span className="text-[1.2vw] font-pretendard text-gray-700">일상 공유형</span>
            </button>
            <button
              onClick={() => handleCategoryClick("이상형 토크")}
              className="border border-gray-300 rounded-lg p-[1.5vw] text-center hover:border-custom-pink hover:bg-gray-50 transition-colors w-[11.6vw] h-[6vh] flex items-center justify-center"
            >
              <span className="text-[1.2vw] font-pretendard text-gray-700">이상형 토크</span>
            </button>
          </div>
          
          {/* 네 번째 줄 - 3개 (각각 더 넓게) */}
          <div className="flex gap-[1.5vw] justify-center">
            <button
              onClick={() => handleCategoryClick("연애 밸런스 게임")}
              className="border border-gray-300 rounded-lg p-[1.5vw] text-center hover:border-custom-pink hover:bg-gray-50 transition-colors w-[16vw] h-[6vh] flex items-center justify-center"
            >
              <span className="text-[1.2vw] font-pretendard text-gray-700">연애 밸런스 게임</span>
            </button>
            <button
              onClick={() => handleCategoryClick("티나는 호감 표현")}
              className="border border-gray-300 rounded-lg p-[1.5vw] text-center hover:border-custom-pink hover:bg-gray-50 transition-colors w-[16vw] h-[6vh] flex items-center justify-center"
            >
              <span className="text-[1.2vw] font-pretendard text-gray-700">티나는 호감 표현</span>
            </button>
            <button
              onClick={() => handleCategoryClick("TMI 폭격!")}
              className="border border-gray-300 rounded-lg p-[1.5vw] text-center hover:border-custom-pink hover:bg-gray-50 transition-colors w-[16vw] h-[6vh] flex items-center justify-center"
            >
              <span className="text-[1.2vw] font-pretendard text-gray-700">TMI 폭격!</span>
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center w-full px-[40vw]">
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => navigate('')}
            className="w-full h-[8vh] text-[1.7vw] font-semibold"
          >
            선택하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendPick;