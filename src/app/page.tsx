/**
File Name : app/page
Description : 메인 페이지
Author : 나경윤

History
Date        Author   Status    Description
2024.07.21  나경윤    Modified  메인 화면 구현
2024.07.31  나경윤    Modified  전체 동화 api 연결
*/

import TagList from '@/components/main/TagList';
import SearchInput from '@/components/main/SearchInput';
import SortDropdown from '@/components/main/SortDropdown';
import BookList from '@/components/main/BookList';
import ScrollUpButton from '@/components/main/ScrollUpButton';
import { getBookList } from '@/apis/Main';

interface BookInfo {
    id: number;
    theme: string;
    title: string;
}

const Home = async () => {
    const data = await getBookList();
    const bookInfo = data.map(({ id: bookId, theme, title }: BookInfo) => ({
        bookId,
        theme,
        title
    }));

    return (
        <main className="flex flex-col justify-center items-center mx-24 mt-16">
            <div className="bg-main-100 h-80 w-full mb-16 rounded-xl"> </div>
            <div className="flex flex-col justify-center items-center ">
                <TagList />
                <div className="flex flex-row my-8 space-x-6">
                    <SearchInput />
                    <SortDropdown />
                </div>
            </div>
            <BookList bookInfo={bookInfo} />
            <ScrollUpButton />
        </main>
    );
};

export default Home;
