import React, { useState } from 'react';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import thinkBubble from '../assets/thinkbubble.png';
import { useNavigate } from 'react-router-dom';
import { parseKakaoOCRWithAlternatingPattern } from '../utils/parseKakaoOCR';

const UploadPage: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
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

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert('이미지 파일을 먼저 업로드해주세요.');
      return;
    }
    setLoading(true);
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

      // 3. OCR 결과와 파싱 결과를 DB에 저장
      const convRes = await fetch('/api/conversation/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ocrResult, parsedDialogues }),
      });
      if (!convRes.ok) throw new Error('대화 저장 오류');
      const { conversationId } = await convRes.json();

      // 4. Gemini 분석 API로 전송
      const analyzeRes = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          parsedDialogues,
        }),
      });
      if (!analyzeRes.ok) throw new Error('Gemini 분석 오류');
      const analyzeResult = await analyzeRes.json();

      // 5. ResultPage로 이동하며 결과 전달
      navigate('/result', { state: { analyzeResult } });
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
              대화를 분석해줄게요
            </h1>
            <span className="text-[3vw] font-yspotlight text-custom-pink">왛</span>
          </div>
          {/* 말풍선 아이콘 - 화면 크기에 비례 */}
          <div className="flex justify-center mt-[1vh]">
            <img 
              src={thinkBubble} 
              alt="Think Bubble" 
              className="w-[10vw] h-[10vw] object-contain"
            />
          </div>
          {/* 설명 텍스트 - 화면 크기에 비례 */}
          <p className="text-[1.5vw] text-black font-yspotlight mt-[1vh]">
            두 사람의 톡을 분석해서 썸 지수를 알려드릴게요 왇
          </p>
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
            onClick={handleAnalyze}
            className="w-full h-[8vh] text-[1.7vw] font-semibold"
            disabled={loading}
          >
            {loading ? '분석 중...' : '대화 분석하기'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
