import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatBotService } from '../http-service-registry/services/chat-bot.service';
import { ChatBotModel, ChatCommentTypeEnum } from '../models/question-set';

@Component({
  selector: 'chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {
  private showChatBot: boolean = true;
  private toggleChatBot: boolean = false;
  private BOT_CLASS: string = "left-chat";
  private USER_CLASS: string = "right-chat";
  private BOT_IMG_PATH: string = "/assets/chatbot/businessman.png";
  private USER_IMG_PATH: string = "/assets/chatbot/man.png";
  private messages: Array<ChatBotModel> = [];
  @Output() ChatEnable = new EventEmitter<boolean>();

  constructor(private chatService: ChatBotService) {
    this.messages.push(new ChatBotModel(this.BOT_CLASS, ChatCommentTypeEnum.Response,
       "Hi, I can help you with questions in exams", this.BOT_IMG_PATH));

  }
  private comment: string = "";
  ngOnInit() {
  }

  toggle() {
    let element = document.getElementById("chat-main");
    element.classList.toggle("open-more");
  }

  closeChat() {
    // this.ChatEnable = false;
    this.ChatEnable.emit(false);
  }

  clearMessage() {
    this.messages.splice(0, this.messages.length);
  }

  searchQuestion(): void {
    try {
      console.log(this.comment);
      // adding user comment
      this.messages.push(new ChatBotModel(this.USER_CLASS, ChatCommentTypeEnum.Comment, this.comment, this.USER_IMG_PATH));

      let response = this.chatService.ChatBotComments(this.comment)
        .subscribe((response: Response) => {
          let res = response.toString();
          //adding bot comment
          if (res == "") {
            this.messages.push(new ChatBotModel(this.BOT_CLASS, ChatCommentTypeEnum.Response,
              "No Answers available please try other questions.", this.BOT_IMG_PATH));
          }
          else {
            this.messages.push(new ChatBotModel(this.BOT_CLASS, ChatCommentTypeEnum.Response, res, this.BOT_IMG_PATH));
          }
          // scroll to bottom and clear message
          setTimeout(() => {
            this.comment = '';
            var element = document.getElementById("chat-section");
            element.scrollTop = element.scrollHeight;
          }, 500);
        },
          (error: Error) => console.log(error));
    }
    catch (error) {
      console.log(error);
    }

  }



}