import React, { useEffect, useState } from 'react';

interface SumScoreChangeData {
  latest: {
    conversationId: string;
    finalLikeScore: number;
    createdAt: string;
  };
  previous: null | {
    conversationId: string;
    finalLikeScore: number;
    createdAt: string;
  };
  change: number | null;
}

interface Props {
  userId: string;
}

const SumScoreChangeBox: React.FC<Props> = ({ userId }) => {
  const [data, setData] = useState<SumScoreChangeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/conversation/sum-score-change/${userId}`)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>로딩 중...</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  const latestPercent = Math.round((data.latest.finalLikeScore ?? 0) * 100);
  const previousPercent = data.previous ? Math.round((data.previous.finalLikeScore ?? 0) * 100) : null;
  const changePercent = data.change !== null ? Math.round(data.change * 100) : null;

  return (
    <div className="w-full overflow-y-auto">

      {/* 메인 콘텐츠 */}
      <div className="flex flex-col items-center w-full pt-0 px-[5vw] pb-0 overflow-y-auto">
        <div className="text-center mb-[1vh] w-full px-[8vw]">
          <div className="flex items-center justify-center space-x-[1.2vw]">
            <span className="text-[3vw] font-yspotlight text-custom-pink">왛</span>
            <h1 className="text-[3vw] font-yspotlight text-black">
              썸 지수 변화
            </h1>
            <span className="text-[3vw] font-yspotlight text-custom-pink">왛</span>
          </div>
        </div>
        {/* 지난 대화가 없으면 메시지만 */}
        {data.previous === null ? (
          <div className="mt-0 mb-5 w-[700px] h-[100px] max-w-full bg-[rgba(217,217,217,0.15)] border border-[rgba(0,0,0,0.15)] rounded-[30px] px-6 py-3 flex items-center justify-center mx-auto">
            <p className="text-[1.2vw] font-pretendard font-light text-center leading-snug text-[#000000]">
              지난대화가 없습니다.
            </p>
          </div>
        ) : (
          <>
          {/* 퍼센트 박스 */}
          <div className="flex flex-row gap-16 items-center mt-0 mb-10">
            {/* 이전 대화 */}
            <div className="flex flex-col items-center">
              <span className="text-[18px] text-gray-500 mb-2">이전 대화</span>
              <div className="w-[120px] h-[120px] rounded-full bg-gray-100 flex items-center justify-center shadow-lg">
                <span className="text-[40px] font-bold text-[#FF6E75]">
                  {previousPercent !== null ? previousPercent : '-'}%
                </span>
              </div>
              <span className="text-[14px] text-gray-400 mt-2">
                {data.previous ? new Date(data.previous.createdAt).toLocaleDateString() : '없음'}
              </span>
            </div>
            {/* 변화 화살표 */}
            <div className="flex flex-col items-center">
              <span className="text-[3vw] font-bold">
                {changePercent !== null && previousPercent !== null
                  ? (changePercent > 0
                    ? <span className="text-green-500">▲ +{changePercent}%</span>
                    : changePercent < 0
                      ? <span className="text-blue-500">▼ {changePercent}%</span>
                      : <span className="text-gray-500">변화 없음</span>)
                  : <span className="text-gray-400">-</span>
                }
              </span>
            </div>
            {/* 최신 대화 */}
            <div className="flex flex-col items-center">
              <span className="text-[18px] text-gray-500 mb-2">최신 대화</span>
              <div className="w-[120px] h-[120px] rounded-full bg-[#FF6E75]/[.15] flex items-center justify-center shadow-lg">
                <span className="text-[40px] font-bold text-[#FF6E75]">
                  {latestPercent}%
                </span>
              </div>
              <span className="text-[14px] text-gray-400 mt-2">
                {new Date(data.latest.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          {/* 변화 설명 박스 */}
          <div className="mt-0 mb-10 w-[700px] h-[100px] max-w-full bg-[rgba(217,217,217,0.15)] border border-[rgba(0,0,0,0.15)] rounded-[30px] px-6 py-3 flex items-center justify-center mx-auto">
            <p className="text-[1vw] font-pretendard font-light text-[clamp(16px,2.1vw,26px)] text-center leading-snug text-[#000000]">
              {changePercent === null
                ? '이전 대화가 없어 비교할 수 없습니다.'
                : changePercent > 0
                  ? '썸 지수가 올랐어요! 좋은 흐름이에요 💖'
                  : changePercent < 0
                    ? '썸 지수가 조금 떨어졌어요. 다음 대화에 힘내봐요!'
                    : '썸 지수에 변화가 없어요. 꾸준함도 중요하죠!'
              }
            </p>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SumScoreChangeBox;
