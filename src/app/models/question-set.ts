export class QuestionSet {
    
        public question_id : string;
        public question_index : number;
        public question_paper_id : string;
        public question_text : string;
        public optionSet : OptionSet[];
    
}

export class OptionSet{
    public option_id : string;
    public question_id : string;
    public option_text : string;
}
