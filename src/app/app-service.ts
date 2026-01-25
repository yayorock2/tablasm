import { Injectable } from '@angular/core';
import { Question } from './question';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private questions: Question[] = [];
  private answers: Question[] = [];
  private intermedia = [2, 3, 4, 5, 6, 7, 8, 9, 10];

  generateTest() {
    this.questions = [];
    this.answers = [];
    for (let i = 0; i < 10; i++) {
      const num1 = this.intermedia[Math.floor(Math.random() * 9)];
      const num2 = this.intermedia[Math.floor(Math.random() * 9)];
      this.questions.push(new Question(num1, num2));
    }
  }

  nextQuestion(): Question | null {
    return this.questions.shift() || null;
  }

  submitAnswer(question: Question, answer: number | null) {

    question.setUserResponse(answer === null ? NaN : answer);
    this.answers.push(question);
  }

  getResults(): Question[] {
    return this.answers;
  }

}

