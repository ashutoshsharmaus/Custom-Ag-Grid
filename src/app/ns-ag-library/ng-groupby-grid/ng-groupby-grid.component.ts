import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ng-groupby-grid',
  templateUrl: './ng-groupby-grid.component.html',
  styleUrls: ['./ng-groupby-grid.component.scss']
})
export class NgGroupbyGridComponent implements OnInit {
  @Input() gridColumnApi: any;

  constructor() { }

  ngOnInit() {
  }

}
