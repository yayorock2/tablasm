import { Component, signal } from '@angular/core';
import { AppService } from './app-service';
import { QuestionComponent } from './question/question';
import { ResultBoardComponent } from './result-board/result-board';
import { Question } from './question';

@Component({
  selector: 'app-root',
  imports: [QuestionComponent, ResultBoardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tablasm');
  statusView = StatuView;
  currentView = StatuView.INICIO;
  results: Question[] = [];

  constructor(private appService: AppService){}

  onClickIniciar(){
    this.appService.generateTest();
    this.currentView = StatuView.CUESTIONARIO;
  }

  onQuestionsEnd(){
    this.currentView = StatuView.FINALIZADO
    this.results = this.appService.getResults();
  }
}

enum StatuView{
  INICIO,
  CUESTIONARIO,
  FINALIZADO
}
