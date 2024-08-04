/**
File Name : board/BookViewer
Description : 동화 게시판 - 동화 뷰어 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.19  나경윤    Created
2024.07.21  나경윤    Modified  페이지 구분 추가
2024.07.28  나경윤    Modified  줄거리 텍스트 이미지로 적용 추가
*/

'use client';

import { ArrowIcon } from '../icons/ArrowIcon';
import useTextToImage from '@/hooks/useTextToImage';

interface ViewerProps {
    step: number;
    nextStep: () => void;
    prevStep: () => void;
    getTextForStep: (step: number) => string;
    getCurrentImage: (step: number) => [string, string];
}

const pageCount: number = 8;

export default function BookViewer({
    step,
    nextStep,
    prevStep,
    getTextForStep,
    getCurrentImage
}: ViewerProps) {
    const text = getTextForStep(step);
    const canvasRef = useTextToImage(text);

    const renderBooks = () => {
        const [backgroundImage, backgroundSize] = getCurrentImage(step);

        const view =
            step === 0 || step === pageCount - 1 ? 'hidden' : 'display';
        const width =
            step === 0 || step === pageCount - 1 ? 'w-4/12' : 'w-8/12';

        return (
            <div
                className={`flex felx-row justify-center items-center ${width} h-[110%] mx-8`}
            >
                <div
                    className="border-solid border border-gray-100 bg-[length:100%_100%] w-full h-full bg-cover bg-center bg-no-repeat shadow-lg"
                    style={{
                        backgroundImage: backgroundImage,
                        backgroundSize: backgroundSize
                    }}
                >
                    {' '}
                </div>
                <div
                    className={`${view} flex justify-center items-center border-solid border border-gray-100 w-full h-full bg-[length:100%_100%] bg-cover bg-center bg-no-repeat shadow-lg`}
                >
                    <canvas
                        ref={canvasRef}
                        className="flex flex-col justify-center items-center w-full mx-24 mt-16"
                    />
                </div>
            </div>
        );
    };

    return (
        <>
            <button
                type="button"
                onClick={prevStep}
                className={`${step !== 0 ? '' : 'opacity-0 pointer-events-none'}`}
            >
                <ArrowIcon rotate="180" />
            </button>
            {renderBooks()}
            <button
                type="button"
                onClick={nextStep}
                className={`${step < pageCount - 1 ? '' : 'opacity-0 pointer-events-none'}`}
            >
                <ArrowIcon rotate="0" />
            </button>
        </>
    );
}
