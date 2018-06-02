export class QuestionPaper{
    questionPaperId : string;
    fileName:string;
    isActive:boolean;
    timer: string;

    constructor(){
        this.questionPaperId="";
        this.fileName="";
        this.isActive=false;
        this.timer = "";
    }
}