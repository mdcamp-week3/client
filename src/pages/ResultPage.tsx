import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Header from '../components/common/Header';
import { useLocation } from 'react-router-dom';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const analyzeResult = location.state?.analyzeResult;
  const [recommendedReply, setRecommendedReply] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);


  if (!analyzeResult) {
    return <div>분석 결과가 없습니다.</div>; 
  }

  const {conversationId, meScore, youScore, finalLikeScore, otherName } = analyzeResult;


  const mePercent = Math.round(meScore * 100);
  const youPercent = Math.round(youScore * 100);
  const finalPercent = Math.round(finalLikeScore * 100);

  // 복사 기능
  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000);
    } catch (err) {
      alert('복사 실패');
    }
  };

  // Gemini next reply 호출
  const handleRecommendNextReply = async () => {
    setLoading(true);
    setRecommendedReply(null);
    try {
      let parsedDialogues = analyzeResult.parsedDialogues;
      if (!parsedDialogues) {
        // 서버에서 대화 데이터 불러오기
        const res = await fetch(`/api/conversation/${analyzeResult.conversationId}`);
        if (!res.ok) throw new Error('대화 데이터 불러오기 실패');
        const data = await res.json();
        parsedDialogues = data.parsedDialogues;
        if (!parsedDialogues) throw new Error('대화 데이터가 없습니다.');
      }
      // 이후 Gemini next reply API 호출
      const replyRes = await fetch('/api/gemini/next-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parsedDialogues }),
      });
      if (!replyRes.ok) throw new Error('추천 답변 생성 오류');
      const { recommendedReply } = await replyRes.json();
      setRecommendedReply(recommendedReply);
    } catch (error) {
      alert((error as any).message || '추천 답변 생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
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

        {/* Action Button - 기존 버튼 2개 → 1개는 추천 기능으로 변경 */}
        <div className="flex flex-col justify-center items-center gap-[1.5vh] mt-[6vh] w-full px-[15vw]">
  <Button
    variant="primary"
    size="lg"
    className="py-[1.4vh] text-[1.2vw] font-pretendard font-semibold rounded-[15px]"
    onClick={() => navigate('/upload')}
  >
    다른 대화 분석하기
  </Button>
  <Button
    variant="outline"
    size="lg"
    className="py-[1.4vh] text-[1.2vw] font-pretendard font-semibold rounded-[15px]"
    onClick={handleRecommendNextReply}
    disabled={loading}
  >
    {loading ? '추천 중...' : '다음 대화 추천받기'}
  </Button>
</div>

      {/* 추천 답변 박스 */}
      {recommendedReply && (
        <div className="mt-[2vh] px-[10vw] w-full flex justify-center">
          <div className="flex items-center bg-gray-100 rounded-lg p-[2vw] w-full max-w-[40vw] shadow">
            <div className="flex-1 text-[1.3vw] text-black break-words">{recommendedReply}</div>
            <button
              onClick={() => handleCopyText(recommendedReply)}
              className="ml-4 w-[2vw] h-[2vw] flex items-center justify-center text-gray-400 hover:text-custom-pink transition-colors"
              title="텍스트 복사"
            >
              {/* 복사 아이콘 */}
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
      )}

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
    </div>
  );
};

export default ResultPage;