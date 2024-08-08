/**
File Name : mypage/LikeBookList
Description : 마이페이지 좋아요한 동화 리스트 
Author : 나경윤

History
Date        Author   Status    Description
2024.08.08  나경윤    Created
*/

'use client';

import { useEffect, useState } from 'react';
import { sampleImages } from '@/utils/dummyBooks';

export default function LikeBookList() {
    const [bookCount, setBookCount] = useState(6);
    const [viewClick, setViewClick] = useState(false);
    const [myBooks, setMyBooks] = useState([]);

    const handleLoadMore = () => {
        viewClick ? setBookCount(6) : setBookCount(sampleImages.length);
        setViewClick(!viewClick);
    };

    // useEffect(() => {

    // }, []);

    return (
        <div className="flex flex-col justify-between mt-6">
            {myBooks.length === 0 ? (
                <p className="text-center text-gray-500 my-20 text-[1rem]">
                    동화가 없습니다.
                </p>
            ) : (
                <>
                    <div className="grid md:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-6">
                        {myBooks.slice(0, bookCount).map((item) => (
                            <button
                                type="button"
                                key={item.id}
                                className="relative max-w-[15rem] w-full aspect-[4/5] border rounded-lg border-gray-200 overflow-hidden"
                            >
                                <div
                                    className="absolute top-0 w-full h-full overflow-hidden"
                                    style={{
                                        backgroundImage: `url(${item.title})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'top',
                                        height: '80%'
                                    }}
                                />
                                <div className="absolute bg-white bottom-0 w-full py-2 text-left pl-4">
                                    <div className="flex flex-col">
                                        <p className="text-[1.1rem] font-medium -mb-0.5 truncate">
                                            {item.title}
                                        </p>
                                        <p className="text-[0.7rem] text-gray-400">
                                            {item.createdAt}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                    {myBooks.length > 6 && (
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={handleLoadMore}
                                className={`mt-10 w-24 h-[2.1rem] ${viewClick ? 'bg-main-200' : 'bg-main'} text-white rounded-3xl text-[0.95rem]`}
                            >
                                {viewClick ? '접기' : '전체 보기'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
