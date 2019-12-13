import {Repository} from './repository.model';

export class Result<T> {
  constructor(
    public total_count: number,
    public incomplete_results: boolean,
    public items: T[]
  ) {}
}
