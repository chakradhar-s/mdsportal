export class RelExamAnswer {
    constructor(
        public SessionId: string,
        public QuestionId: string,
        public SelectedOptionId: string,
        public SelectedOptionStatusId : number
    ) { }
}

export enum StatusId{
    Unseen = 1,
    Visited = 2,
    Marked_For_Review = 3,
    Answered = 4
}