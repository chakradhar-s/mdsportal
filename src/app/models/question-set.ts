import { RelExamAnswer } from "./rel-exam-answer.interface";

export class QuestionSet {

    public question_id: string;
    public question_index: number;
    public question_paper_id: string;
    public question_text: string;
    public optionSet: OptionSet[];

}

export class OptionSet {
    public option_id: string;
    public question_id: string;
    public option_text: string;
    public option_checked : boolean;
}

export class QuestionResult {
    public questionId: string;
    public questions: QuestionSet;
    public selectedAnswer: RelExamAnswer;
}

export class QuestionOutput {
    public subject: string;
    public questionResult: QuestionResult[];
}
