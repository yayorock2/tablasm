export class Question {
  private text: string;
  private result: number;
  private userResponse: number = NaN;

  constructor(num1: number, num2: number) {
    this.text = `${num1} x ${num2}`
    this.result = num1 * num2;
  }


  public checkAnswer(): boolean {
    return this.userResponse === this.result;
  }

  public setUserResponse(response: number) {
    this.userResponse = response;
  }

  public getText(): string{
    return this.text;
  }

  public getUserResponse(): number{
    return this.userResponse;
  }

  public getResult(): number{
    return this.result;
  }

}
