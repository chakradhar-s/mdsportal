import { RelExamAnswer } from "./rel-exam-answer";

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
}

export class QuestionResult {
    public question_id: string;
    public questions: QuestionSet;
    public selectedAnswer: RelExamAnswer;
}

export class QuestionOutput {
    public subject: string;
    public questionResult: QuestionResult[];
}
