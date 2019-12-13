import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '../_services/api.service';
import { pluck, switchMap, debounceTime, catchError, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Repository } from '../_models/repository.model';
import { of, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  search = new FormControl('');
  searchResults: Repository[] = [];

  private unsubscribe$ = new Subject();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap( val => val.length > 1 ?
        this.apiService.searchRepositories(val).pipe(
          catchError( error => {
            console.log('Error', error);
            return of([]);
          }),
          pluck('items')
        ) : of([])
      ),
      takeUntil(this.unsubscribe$)
    ).subscribe( (res: Repository[]) => this.searchResults = res.slice(0, 10));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
