export interface IReview {
    id: string;
    rating: number;
    reviewerName: string;
    reviewedAt: string;
    comment: string;
}

export interface IReviewResp {
    average: number;
    items: IReview[];
    total: number;
}