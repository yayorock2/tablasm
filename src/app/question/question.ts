import { Component, ElementRef, OnInit, output, signal, ViewChild } from '@angular/core';
import { AppService } from '../app-service';
import { Question } from '../question';


@Component({
  selector: 'app-question',
  imports: [],
  templateUrl: './question.html',
  styleUrl: './question.css',
})
export class QuestionComponent implements OnInit {

  finished = output<void>();

  question = signal<Question | null>(null);

  timeoutId: any = null;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.question.set(this.appService.nextQuestion());
    console.log('Next question:', this.question);
    this.timeoutId = setTimeout(() => {
      this.onAnswer({value: ''});
    }, 5000);
  }

  onAnswer(response: any) {

    if (this.timeoutId != null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    let q = this.question();

    if(q == null) return;

    this.appService.submitAnswer(q, response == null ? null : Number(response.value));

    this.question.set(this.appService.nextQuestion());

    if (response != null)  response.value = '';

    if (this.question() == null) this.finished.emit();

    this.timeoutId = setTimeout(() => {
      this.onAnswer({value: ''});
    }, 5000);

  }
}
