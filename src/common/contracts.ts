export interface ApiResponse {
    url: string;
    code: number;
    data: any;
}
export interface WithId<T> {
    id: string;
    data: T;
}
