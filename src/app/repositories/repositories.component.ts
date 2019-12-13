import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Repository } from '../_models/repository.model';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent {
  @Input() repositories: Repository[];

  starIconSrc = `http://www.myiconfinder.com/uploads/iconsets/256-256-82e4254475da730a5e11a7fc3ca487da-star.png`;

  constructor() { }
}
