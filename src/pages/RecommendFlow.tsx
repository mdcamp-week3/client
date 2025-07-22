import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Header from '../components/common/Header';
import { parseKakaoOCRWithAlternatingPattern } from '../utils/parseKakaoOCR';

const RecommendFlow: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [recommendedReply, setRecommendedReply] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
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
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const handleCopyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    } catch (err) {
      alert('복사 실패');
    }
  };

  const handleDirectPick = () => {
    navigate('/recommendpick');
  };

  const handleRandomPick = () => {
    navigate('/recommendrandom');
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert('이미지 파일을 먼저 업로드해주세요.');
      return;
    }
    setLoading(true);
    setRecommendedReply(null);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // 1. OCR 결과 받기
      const ocrRes = await fetch('/api/image/upload', {
        method: 'POST',
        body: formData,
      });
      if (!ocrRes.ok) throw new Error('OCR 서버 오류');
      const ocrResult = await ocrRes.json();

      // 2. 파싱 함수로 대화 데이터 추출
      const imageWidth = ocrResult.images?.[0]?.width || 720;
      const parsedDialogues = parseKakaoOCRWithAlternatingPattern(ocrResult, imageWidth);

      // 3. 다음 대화 추천 Gemini API 호출
      const replyRes = await fetch('api/gemini/next-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parsedDialogues }),
      });
      if (!replyRes.ok) throw new Error('추천 답변 생성 오류');
      const { recommendedReply } = await replyRes.json();
      setRecommendedReply(recommendedReply);
    } catch (error) {
      alert('분석 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
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
              className="px-[2vw] py-[1vh] text-[30px] font-pretendard"
            >
              직접 주제 고르기
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="px-[2vw] py-[1vh] text-[30px] font-pretendard"
            >
              대화 흐름 이어가기
            </Button>
            <Button 
              variant="gray-outline" 
              size="sm"
              onClick={handleRandomPick}
              className="px-[2vw] py-[1vh] text-[30px] font-pretendard"
            >
              랜덤 대화 주제
            </Button>
          </div>
          
          
        </div>

        {/* Upload Area - 화면 크기에 비례 */}
        <div className="w-full px-[25vw] mt-[2vh] mb-[4vh]">
      {!selectedFile ? (
    <div
      className={`border-2 border-dashed border-gray-400 rounded-lg p-[2vw] text-center transition-colors bg-gray-100 ${
        isDragOver ? 'border-custom-pink bg-gray-200' : 'border-gray-400'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* 기존 업로드 박스 내용 (아이콘, 텍스트, 파일 선택 등) */}
      <div className="flex flex-col items-center space-y-[1vh]">
        {/* Upload Icon */}
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
        {/* Upload Text */}
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
        {selectedFile && (
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-[1vw] text-gray-600">{(selectedFile as File).name}</p>
            <button
              type="button"
              className="text-red-500 hover:text-red-700 text-xs border border-red-300 rounded px-2 py-1 ml-2"
              onClick={() => setSelectedFile(null)}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <img
        src={URL.createObjectURL(selectedFile)}
        alt="업로드된 카톡"
        className="max-w-[40vw] max-h-[40vh] rounded-lg object-contain"
        style={{ objectFit: 'contain' }}
      />
      <button
        type="button"
        className="mt-2 text-gray-400 hover:text-red-500 transition-colors mb-0"
        onClick={() => {setSelectedFile(null); setRecommendedReply(null);}}
        title="이미지 삭제"
      >
        {/* 휴지통 아이콘 */}
          <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v2H9V4a1 1 0 011-1z"
          />
        </svg>
      </button>
    </div>
  )}
</div>

        {/* Action Button */}
        {!recommendedReply && (
          <div className="text-center w-full px-[40vw] mt-0">
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleAnalyze}
            className="w-full h-[6vh] text-[1.7vw] font-semibold"
            disabled={loading}
          >
            {loading ? '분석 중...' : '답변 추천받기'}
          </Button>
        </div>
        )}

        {/* 추천 답변 박스 */}
        {recommendedReply && (
          <div className="mt-[0h] mb-[2vh] px-[10vw] w-full flex justify-center">
            <div className="flex items-center bg-gray-100 rounded-lg p-[2vw] w-full max-w-[40vw] shadow">
              <div className="flex-1 text-[1.5vw] text-black break-words">{recommendedReply}</div>
              <button
                onClick={() => handleCopyText(recommendedReply)}
                className="ml-4 w-[2vw] h-[2vw] flex items-center justify-center text-gray-400 hover:text-custom-pink transition-colors"
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

export default RecommendFlow;