import { Component, Injector, OnInit } from '@angular/core';
import { ActivitiesService } from '..//services/activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  activities: Array<any> = new Array<any>();

  constructor(
    injector: Injector,
    private activitiesService: ActivitiesService,
  ) { }

  ngOnInit(): void {
    this.activitiesList();
  }

  activitiesList(){
    this.activitiesService.getList(). subscribe( activities => {
      this.activities = activities;
    }, err => {
      console.log('Error listing activities', err);
    })
  }

}
