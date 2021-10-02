export class CreateTaskDto {
  constructor(public readonly description: string) {}
  readonly value = 0;
  readonly completed = false;
}
