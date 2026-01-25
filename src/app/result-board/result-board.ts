import { Component, Input, input } from '@angular/core';
import { Question } from '../question';

@Component({
  selector: 'app-result-board',
  imports: [],
  templateUrl: './result-board.html',
  styleUrl: './result-board.css',
})
export class ResultBoardComponent {
  @Input() results: Question[] = [];
}
