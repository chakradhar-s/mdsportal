export interface RelExamAnswer {
    questionId: string,
    selectedOptionId: string|null,
    selectedOptionStatusId: number
}

export enum StatusId {
    Unseen = 1,
    Visited = 2,
    Marked_For_Review = 3,
    Answered = 4
}