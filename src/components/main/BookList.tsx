/**
File Name : main/BookList
Description : 메인 북 리스트 컴포넌트
Author : 나경윤

History
Date        Author   Status    Description
2024.07.22  나경윤    Created
2024.07.23  나경윤    Modified  무한 스크롤 추가
*/

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { LoadingIcon } from '../icons/LoadingIcon';

interface BookListProps {
    bookInfo: { bookId: number; theme: string; title: string }[];
}

const itemsPerPage: number = 10;

export default function BookList({ bookInfo }: BookListProps) {
    const router = useRouter();
    const [items, setItems] = useState(bookInfo.slice(0, itemsPerPage));
    const [loading, setLoading] = useState<boolean>(true);
    const pageIndexRef = useRef<number>(2);

    const loadItems = () => {
        const newItems = bookInfo.slice(
            (pageIndexRef.current - 1) * itemsPerPage,
            pageIndexRef.current * itemsPerPage
        );

        if (newItems.length < itemsPerPage) {
            setEnd(true);
        }

        setItems((prev) => [...prev, ...newItems]);
        pageIndexRef.current++;
        setLoading(false);
    };

    const { ref, isPageEnd, setEnd } = useInfiniteScroll({
        onLoadMore: loadItems
    });

    return (
        <div>
            <div className="grid grid-cols-5 gap-8 gap-y-9 my-10 z-0">
                {items.map((item) => (
                    <div key={item.bookId} className="relative">
                        <div className="absolute bottom-2 left-4">
                            <p className="text-lg font-semibold -mb-1">
                                {item.title}
                            </p>
                            <p>{item.bookId}</p>
                        </div>
                        <Image
                            src="/images/sample1.svg"
                            alt="book-image"
                            onClick={() => router.push('/board')}
                            className="w-[18rem] h-[25rem] border border-gray-200 rounded-xl bg-white cursor-pointer transition-transform animate-scaleIn"
                            width={100}
                            height={300}
                        />
                    </div>
                ))}
            </div>
            {!isPageEnd && loading && <LoadingIcon />}
            {!isPageEnd && <div ref={ref} />}
        </div>
    );
}
