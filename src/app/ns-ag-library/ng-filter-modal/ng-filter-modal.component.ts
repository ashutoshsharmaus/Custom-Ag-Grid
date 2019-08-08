import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ng-filter-modal',
  templateUrl: './ng-filter-modal.component.html',
  styleUrls: ['./ng-filter-modal.component.scss']
})
export class NgFilterModalComponent implements OnInit {
  @Input() gridColumnApi: any;

  constructor() {
  }

  ngOnInit() {
  }

}
