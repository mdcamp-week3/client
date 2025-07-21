import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import Button from '../components/common/Button';

const TopicDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSnackbar, setShowSnackbar] = useState(false);
  
  // URL 파라미터나 state에서 주제 정보를 받아올 수 있음
  const topicName = location.state?.topicName || "저녁 약속";
  const examples = location.state?.examples || [
    "저녁에 약속 없으면 밥 같이 먹을래?",
    "오늘 저녁 뭐 먹을지 고민 중인데 추천해줘",
    "저녁 메뉴 정하는 게 항상 어려워"
  ];

  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // 스낵바 표시
      setShowSnackbar(true);
      // 3초 후 스낵바 숨기기
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  const handleSelectAnotherTopic = () => {
    navigate('/recommendflow');
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
        </div>

        {/* 주제 예시 섹션 */}
        <div className="w-full px-[15vw] mb-[4vh]">
          <div className="bg-white p-[3vw]">
            {/* 서브 헤딩 */}
            <h2 className="text-[2vw] font-yspotlight text-black mb-[2vh] text-center">
              이 주제라면 이런 얘기들 어때요?
            </h2>
            
            {/* 예시 리스트 */}
            <div className="space-y-[1vh]">
              {examples.map((example: string, index: number) => (
                <div key={index} className="flex items-center justify-between py-[1.5vh] border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-[1vw] flex-1">
                    {/* 채팅 버블 아이콘 */}
                    <div className="w-[2vw] h-[2vw] flex items-center justify-center">
                      <svg 
                        className="w-[2vw] h-[2vw] text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                        />
                      </svg>
                    </div>
                    
                    {/* 예시 텍스트 */}
                    <span className="text-[1.3vw] font-pretendard text-gray-600 flex-1">
                      {example}
                    </span>
                  </div>
                  
                  {/* 복사 아이콘 */}
                  <div className="ml-[1vw]">
                    <button
                      onClick={() => handleCopyText(example)}
                      className="w-[2vw] h-[2vw] flex items-center justify-center text-gray-400 hover:text-custom-pink transition-colors"
                      title="텍스트 복사"
                    >
                      <svg 
                        className="w-[1.5vw] h-[1.5vw]" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center w-full px-[40vw]">
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleSelectAnotherTopic}
            className="w-full h-[8vh] text-[1.7vw] font-semibold"
          >
            다른 주제 선택하기
          </Button>
        </div>
      </div>

      {/* 스낵바 */}
      {showSnackbar && (
        <div className="fixed bottom-[5vh] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-[3vw] py-[1.5vh] rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out">
          <div className="flex items-center space-x-[1vw]">
            <svg 
              className="w-[1.5vw] h-[1.5vw] text-green-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
            <span className="text-[1.2vw] font-pretendard">텍스트가 복사되었습니다!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicDetailPage;