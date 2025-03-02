export interface User {
    userId: string;
    userEmail: string;
    userNickname: string;
    userAvatar: string;
    userJob: string;
    userJobSuffix: string;
}

export interface UserJob {
    id: number;
    name: string;
}
