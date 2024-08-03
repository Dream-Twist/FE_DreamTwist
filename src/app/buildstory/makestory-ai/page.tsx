/**
File Name : buildstory/makestory-ai/page.tsx
Description : 동화 생성
Author : 김민규

History
Date        Author   Status    Description
2024.07.28  김민규    Created
2024.07.31  김민규    Created   Ai 모델 Api 연동

**/

'use client';

import React, { useEffect, useState } from 'react';

const MakestoryAiPage: React.FC = () => {
    const [plots, setPlots] = useState<string[]>([]); // plots라는 상태 변수를 정의하고 빈 배열로 초기화합니다

    useEffect(() => {
        // 로컬 스토리지에서 데이터 읽어오는 코드
        const storyData = localStorage.getItem('storyData');

        if (storyData) {
            const parsedData = JSON.parse(storyData); //데이터가 있으면 이를 JSON으로 파싱
            setPlots(parsedData.story || []);
        } else {
            console.error('스토리 데이터가 없습니다.');
        }
    }, []);

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: 'url("/images/storybg.png")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold text-center mb-4">
                    줄거리를 토대로 6p 플롯을 생성했어요.
                </h1>
                <p className="text-center mb-8">
                    동화책 각 페이지에 들어갈 이야기를 수정할 수 있어요.
                </p>
                <div className="flex overflow-x-auto w-full space-x-4">
                    {plots.map((plot: string, index: number) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 w-full max-w-xs bg-white p-6 rounded-lg shadow-md`}
                        >
                            <h2 className="text-xl font-bold mb-2 text-center">
                                {index + 1}
                            </h2>
                            <p className="text-center">{plot}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-10">
                    <button className="bg-yellow-500 text-white py-2 px-4 rounded">
                        이 플롯으로 완료
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MakestoryAiPage;
