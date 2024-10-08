/**
File Name : api/BookApi
Description : Book 컴포넌트 api 모음
Author : 임도헌

History
Date        Author   Status    Description
2024.08.03  임도헌   Created
2024.08.03  임도헌   Modified   fetchPresignedURL,uploadFileToS3,submitBookForm 추가
2024.08.07  임도헌   Modified   updateBookForm 추가
2024.08.07  임도헌   Modified   fetchAiImage 추가
2024.08.07  임도헌   Modified   금지어 json으로 반환
*/

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchPresignedURL = async (userId: number, fileName: string) => {
    const response = await fetch(`${API_BASE_URL}/fairytale/presigned-url`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            fileName
        })
    });
    if (!response.ok) {
        throw new Error('AWS S3 에서 presigned URL 응답 실패');
    }
    return response.json();
};

export const uploadFileToS3 = async (presignedURL: string, file: File) => {
    const response = await fetch(presignedURL, {
        method: 'PUT',
        body: file
    });

    if (!response.ok) {
        throw new Error('AWS S3로 파일 업로드 실패');
    }
    // PresignedURL에서 ?앞 부분이 파일 url임
    return presignedURL.split('?')[0];
};

export const submitBookForm = async (
    formdata: FormData,
    accessToken: string | null
) => {
    const response = await fetch(`${API_BASE_URL}/fairytale`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        body: formdata,
        credentials: 'include'
    });

    if (!response.ok) {
        return response.json();
    }

    return response.text();
};

export const updateBookForm = async (
    formdata: FormData,
    fairytailId: number,
    accessToken: string | null
) => {
    const response = await fetch(`${API_BASE_URL}/fairytale/${fairytailId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        body: formdata,
        credentials: 'include'
    });

    if (!response.ok) {
        return response.json();
    }

    return response.text();
};

export const fetchAiImage = async (
    prompt: string,
    accessToken: string | null
): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/ai-fairytale/image`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ prompt }),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('AI 요청 실패');
    }

    return response.text();
};
