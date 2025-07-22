import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Header from '../components/common/Header';
import {useLocation} from 'react-router-dom';

const ResultPage: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const analyzeResult = location.state?.analyzeResult;

  if (!analyzeResult) {
    return <div>분석 결과가 없습니다.</div>; // 혹은 navigate('/upload') 등 처리
  }

  const {conversationId, meScore, youScore, finalLikeScore, otherName } = analyzeResult;


  const mePercent = Math.round(meScore * 100);
  const youPercent = Math.round(youScore * 100);
  const finalPercent = Math.round(finalLikeScore * 100);

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
      <div className="flex flex-col items-center w-full pt-[0vh] px-[5vw] pb-[10vh] overflow-y-auto">
        {/* Page Title - 화면 크기에 비례 */}
        <div className="text-center mb-[1vh] w-full px-[8vw]">
          <div className="flex items-center justify-center space-x-[1.2vw]">
          <span className="text-[3vw] font-yspotlight text-custom-pink">왛</span>
            <h1 className="text-[4vw] font-yspotlight text-black">
              썸 확률
            </h1>
            <span className="text-[3vw] font-yspotlight text-custom-pink">왛</span>
          </div>
          
       
          
        </div>

       <div className="flex flex-col items-center mt-[4vh] mb-[3vh]">
  <h2 className="text-[10vw] font-yspotlight font-bold text-[#FF6E75] leading-none">{finalPercent}</h2>
  <p className="pt-1 text-[1.7vw] mt-[1vh] text-gray-700 font-yspotlight font-regular">
    {finalPercent >= 80 ? '이건... 썸 맞습니다 💖' : finalPercent >= 60 ? "두 사람 사이, 묘한 기류가 흐르고 있어요."
    : finalPercent >= 40 ? '아직 친구일까, 썸일까?' : finalPercent >= 20 ? "이건 썸...까지는 아니에요."
    : '안타까워요...🥲'}
  </p>

  {/* ✅ 텍스트 박스 */}
  <div className="mt-5 w-[700px] h-[100px] max-w-full bg-[rgba(217,217,217,0.15)] border border-[rgba(0,0,0,0.15)] rounded-[30px] px-6 py-3 flex items-center justify-center mx-auto">
    <p className="text-[1vw] font-pretendard font-light text-[clamp(16px,2.1vw,26px)] text-center leading-snug text-[#000000]">
        {finalPercent >= 80
          ? <>
              서로를 향한 감정이 분명히 보였어요.<br />
              다음 톡은, 고백일지도 몰라요
            </>
          : finalPercent >= 60
          ? <>
              자주 연락하고, 웃는 말투가 많았어요.<br />
              조심스레 다가가 보세요.
            </>
          : finalPercent >= 40
          ? <>
              호감은 보이지만 확신은 부족했어요.<br />
              대화를 조금 더 이어가 보는 건 어때요?
            </>
          : finalPercent >= 20
          ? <>
              톡이 조금 일방적이거나, 무심한 말투가 많았어요.<br />
              아직은 타이밍이 아닐 수도 있어요.
            </>
          : <>
              감정의 흐름이 거의 없었어요.<br />
              하지만 관계는 언제든 달라질 수 있어요.
            </>
        }
    </p>
  </div>
</div>


<div className="w-full max-w-[700px] space-y-[2vh] mt-[1vh]">
  <div className="mt-5 pr-10 pl-10 box-border w-[700px] h-[100px] bg-white border border-[#D9D9D9] rounded-[30px] px-6 py-3 flex items-center justify-between mx-auto">
  {/* 왼쪽 이름 - ✅ 세로 중앙 정렬됨 */}
  <span className="text-[clamp(16px,1.5vw,30px)] pl-5 font-pretendard font-medium text-black">
    {otherName}
  </span>

  {/* 오른쪽 텍스트와 퍼센트 */}
  <div className="flex flex-col items-end gap-1">
    <div className="flex items-center gap-2 pb-1">
      <span className="text-[clamp(14px,1.3vw,28px)] font-pretendard font-regular text-black/80">
        대화 상대에 대한 호감도
      </span>
      <span className="text-[clamp(16px,1.5vw,30px)] font-pretendard font-semibold text-[#FF6E75]">
        {youPercent}%
      </span>
    </div>

    <div className=" w-[100%] bg-[rgba(217,217,217,0.5)] rounded-full h-2">
      <div className="bg-[#FF6E75] h-2 rounded-full" style={{ width: `${youPercent}%` }}></div>
    </div>
  </div>
</div>



  {/* 나 박스 */}
<div className="max-w-full mt-5 pr-10 pl-10 w-[700px] h-[100px] bg-white border border-[#D9D9D9] rounded-[30px] px-6 py-3 flex items-center justify-between mx-auto">
  {/* 왼쪽 이름 */}
  <span className="text-[clamp(16px,1.5vw,30px)]  pl-5 font-pretendard font-medium text-black">
    나
  </span>

  {/* 오른쪽 텍스트와 퍼센트 */}
  <div className="flex flex-col items-end gap-1">
    <div className="flex items-center gap-2 pb-1">
      <span className="text-[clamp(14px,1.3vw,28px)] font-pretendard font-regular text-black/80">
        대화 상대에 대한 호감도
      </span>
      <span className="text-[clamp(16px,1.5vw,30px)] font-pretendard font-semibold text-[#FF6E75]">
        {mePercent}%
      </span>
    </div>

    <div className="w-[100%] bg-[rgba(217,217,217,0.5)] rounded-full h-2">
      <div className="bg-[#FF6E75] h-2 rounded-full" style={{ width: `${mePercent}%` }}></div>
    </div>
  </div>
</div>


</div>

        {/* Action Button - 화면 크기에 비례 */}
        <div className="flex flex-col justify-center items-center gap-[1.5vh] mt-[6vh] w-full px-[15vw]">
  <Button
    variant="primary"
    size="lg"
    className="py-[1.4vh] text-[1.2vw] font-pretendard font-semibold rounded-[15px]"
    onClick={() => console.log('다른 대화 분석')}
  >
    다른 대화 분석하기
  </Button>
  <Button
    variant="outline"
    size="lg"
    className="py-[1.4vh] text-[1.2vw] font-pretendard font-semibold rounded-[15px]"
    onClick={() => console.log('다음 대화 추천')}
  >
    다음 대화 추천받기
  </Button>
</div>
      </div>
    </div>
  );
};

export default ResultPage;