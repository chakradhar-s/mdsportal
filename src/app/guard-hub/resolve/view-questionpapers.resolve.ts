import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

//import { LoginService } from '../../http-service-registry/services/login-service.service';
//import { SignUpService } from '../../http-service-registry/services/signup.service';
import { UserType } from '../../models/user.type.interface';
import { QuestionPaper } from '../../models/question-paper.interface';
import { QuestionpaperService } from '../../mdsportal.services/questionpaper.service';

@Injectable()
export class ViewQuestionPapersResolve implements Resolve<QuestionPaper[]> {

    constructor(private questionService: QuestionpaperService) {

    }

    resolve(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {      
       return this.questionService.getAvailableQuestionPapers();
        //return this.signUpService.getRegisterUser(next.params['id']);
    }

}
