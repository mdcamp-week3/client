import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import speechBubble from '../assets/bubble.png';
import Button from '../components/common/Button';
import Header from '../components/common/Header';


const categoryDetails: Record<string, string[]> = {
  "컨텐츠 공유형": [
    "너 이런 분위기 술집/카페 좋아하지 않아?",
  ],
  "너에 대해 더 알고 싶어": [
    "요즘 제일 자주 하는 생각이 뭐야?",
    "평소에 혼자 있는 시간에 뭐해?",
    "어릴 때 꿈 뭐였어?",
    "너는 스트레스 받으면 뭐 해?",
    "너 혼자만 알고 싶은 노래 있어?",
    "너 친구들이 너 보고 어떤 스타일이라고 해?",
  ],
    "설렘이 필요할 때": [
    "나 오늘 하루 중 제일 설렌 순간? 너한테 답장 왔을 때.",
    "네가 좋아하는 사람한테 듣고 싶은 말은 뭐야?",
    "요즘 이상하게 어떤 말 하기만 하면 너가 먼저 떠올라",
  ],
    "취향 공유하기": [
    "요즘 제일 빠져 있는 노래 있어?",
    "넷플릭스 정주행 추천해줘.",
    "좋아하는 계절이 언제야? 왜 좋아해",
    "카페 갈 때 무조건 시키는 메뉴 있어?",
    "최애 영화가 뭐야?",
    "가고싶은 여행지 있어?",
  ],
    "과거 이야기": [
    "학창 시절에 제일 기억에 남는 순간은 언제야?",
    "첫사랑은 언제였어? 아직도 기억나?",
    "어릴 때 별명 있었어?",
  ],
  "은근히 떠보기": [
    "요즘 좋아하는 사람 있어?",
    "혹시 연애할 때 연락 자주 하는 편이야?",
    "너 요즘 누구랑 제일 연락 자주 해?",
  ],
  "만약에 시리즈": [
    "너 무인도 가면 어떻게 할거야?",
    "내가 갑자기 기억상실 걸리면 넌 나한테 뭐부터 말해줄 거야?",
    "우리 둘이 같은 회사 다니면 누가 퇴사 먼저 할까ㅋㅋ",
  ],
  "연애 가치관": [
    "사소한 거에도 감동하는 편이야, 아니면 큰 거에만?",
    "연애할 때 ‘하루 한 통 전화’ 가능한 사람?",
    "연애할 때 서운한 건 바로 말하는 편이야, 참고 넘기는 편이야?",
  ],
  "일상 공유형": [
    "오늘 하루 어땠어? 뭔가 기분 좋은 일 있었어?",
    "오늘 점심 뭐 먹었는지 맞혀볼까?",
    "평소에 주말엔 뭐하면서 쉬어?",
  ],
  "연애 밸런스 게임": [
    "많이 먹어도 살 안 찌기\nvs\n잘 안 자도 멀쩡하기",
    "연락 잘 되는데 무뚝뚝한 사람\nvs\n연락은 가끔인데 표현 잘하는 사람?",
    "오래 보고 천천히 썸타는 거\nvs\n빠르게 확 불붙는 썸?",
    "친구 같은 연애\nvs\n매일 설레는 연애",
    "5년동안 애인 1명\nvs\n1년동안 애인 5명",
    "평생 카톡만\nvs\n평생 전화만",
    "먼저 고백하기\nvs\n고백받기",
    "잘 챙기고 집착하는 애인\nvs\n무관심한데 쿨한 애인",
    "매일 사랑한다 표현\nvs\n매달 선물 주기",
    "계획에 따라 데이트\nvs\n무계획 데이트",
  ],
  "티나는 호감 표현": [
    "너랑 얘기하면 시간 진짜 빨리 가.",
    "너 웃을 때 괜히 나도 따라 웃게 돼.",
    "아까 분명히 피곤했는데 너랑 톡하다가 잠 다 깼어",
  ],
  "TMI 폭격!": [
    "오늘 점심 뭐 먹었게? 맞히면 담에 커피 사줄게",
    "오늘 양말 짝짝이였던 거 지금 알았어.",
    "어제 새벽 3시에 갑자기 ‘고등어도 잘 때 눈 감나?’ 생각나서 검색했는데 감긴대!",
  ],
};


const RecommendRandom: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  
  const getRandomCategory = () => {
    const categories = Object.keys(categoryDetails);
    const randIdx = Math.floor(Math.random() * categories.length);
    return categories[randIdx];
  };

  const getRandomQuestion = (category: string) => {
    const questions = categoryDetails[category];
    const randIdx = Math.floor(Math.random() * questions.length);
    return questions[randIdx];
  };

  const initialCategory = getRandomCategory();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedQuestion, setSelectedQuestion] = useState(
    getRandomQuestion(initialCategory)
  );

  const handleRandomTopic = () => {
    const newCategory = getRandomCategory();
    const newQuestion = getRandomQuestion(newCategory);
    setSelectedCategory(newCategory);
    setSelectedQuestion(newQuestion);
  };

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
    <div className="w-full min-h-screen bg-white overflow-hidden">
      {/* 로고는 고정 크기 */}
      <div className="pl-5 w-[300px]">
        <Header />
      </div>
      
      
      {/* 메인 콘텐츠 */}
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
                <p className="mt-[8%] text-[1.7vw] font-regular font-yspotlight">{selectedCategory}</p>

                {/* 아래쪽에서 중앙보다 약간 내려간 위치에 메인 텍스트 */}
                <div className="flex-grow flex items-center justify-center">
                <p className="text-[1.3vw] text-black font-regular font-yspotlight whitespace-pre-line leading-tight mt-[-8vh]">
                    {selectedQuestion}
                </p>
                </div>
            </div>
            </div>

        {/* Action Button - 화면 크기에 비례 */}
        {/* 👇 버튼 3개 한 줄 */}
            <div className="flex justify-center space-x-[2vw] w-full px-[20vw] mt-[2vh]">
            <Button 
                variant="primary" 
                size="xs"
                onClick={handleRandomTopic}
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

export default RecommendRandom;