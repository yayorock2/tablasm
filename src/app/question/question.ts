import { Component, ElementRef, OnDestroy, OnInit, output, signal, ViewChild } from '@angular/core';
import { AppService } from '../app-service';
import { Question } from '../question';
import { Subscription, take, timer } from 'rxjs';


@Component({
  selector: 'app-question',
  imports: [],
  templateUrl: './question.html',
  styleUrl: './question.css',
})
export class QuestionComponent implements OnInit, OnDestroy {

  finished = output<void>();
  question = signal<Question | null>(null);
  timeProgress = signal(0);

  private timeoutId: any = null;
  private timerSubscription: Subscription | null = null;


  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.question.set(this.appService.nextQuestion());
    console.log('Next question:', this.question);
    this.timeoutId = setTimeout(() => {
      this.onAnswer({ value: '' });
    }, 5000);

    this.timeProgress.set(0);

    this.timerSubscription = timer(0, 1000).pipe(take(5)).subscribe((value) => this.setTimeProgress(value));
  }

  onAnswer(response: any) {

    if (this.timeoutId != null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    let q = this.question();

    if (q == null) return;

    this.appService.submitAnswer(q, response == null ? null : Number(response.value));

    this.question.set(this.appService.nextQuestion());

    if (response != null) response.value = '';

    if (this.question() == null) this.finished.emit();

    this.timeProgress.set(0);

    this.timeoutId = setTimeout(() => {
      this.onAnswer({ value: '' });
    }, 5000);

    this.timerSubscription?.unsubscribe();

    this.timerSubscription = timer(0, 1000).pipe(take(5)).subscribe((value) => this.setTimeProgress(value));

  }

  setTimeProgress(value: number = 0) {
    this.timeProgress.set((value / 4 * 100));
  }

  ngOnDestroy(): void {
    if (this.timeoutId != null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.timerSubscription?.unsubscribe();
  }

}
