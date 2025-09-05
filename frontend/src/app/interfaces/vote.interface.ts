export interface VoteRequest {
    type: string,
}

export interface Vote {
    id: number,
    type: string,
    ReviewId: string,
}

export interface VoteResponse {
    votes: number;
}