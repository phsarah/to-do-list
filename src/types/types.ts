export type User = {
    id: string,
    name: string,
    nickname: string,
    email: string
};
export type Task = {
    title: string,
    description: string,
    limitDate: Date,
    creatorUserId: string
};