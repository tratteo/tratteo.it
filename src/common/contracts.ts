export interface ApiResponse {
    url: string;
    code: number;
    data: any;
    success: boolean;
}

export interface WithId<T> {
    id: string;
    data: T;
}
