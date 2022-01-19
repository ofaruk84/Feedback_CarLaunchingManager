import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Attendee } from 'src/app/models/attendee';
import { DashboardItem } from 'src/app/models/dashboardItem';

import { Photo } from 'src/app/models/photo';
import { FormGroup, FormBuilder } from '@angular/forms';

import { PhotoService } from 'src/app/services/photo.service';
import { Feedback } from 'src/app/models/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit {
  photos: Photo[];

  id: number;
  eventId: number;

  carPoint:number = 0;
  feedbackForm:FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private formBuilder: FormBuilder,
    private feedbackService:FeedbackService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.eventId = params['eventId'];
      this.getPhotosByCarId(params['id']);

      //this.filteredEvents = this.events.filter(e=>e.carId==params['id'])
      //this.event!=this.filteredEvents.pop();

      console.log(this.id);
    });

    this.feedbackForm = this.formBuilder.group({
      eventPoint: "",
      carPoint: "",
      locationPoint: "",
      comment: "",
      

    })
  }

  getPhotosByCarId(carId: number) {
    this.photoService.getPhotosByCarId(carId).subscribe((response) => {
      this.photos = response.data;
    });
  }

  save(){

    let carPoint = this.feedbackForm.controls['carPoint'].value;
    let eventPoint = this.feedbackForm.controls['eventPoint'].value;
    let locationPoint = this.feedbackForm.controls['locationPoint'].value;
    let comment = this.feedbackForm.controls['comment'].value;

    let attendeeId:number =13;
    
    let feedback:Feedback={feedbackId:undefined,eventId:this.eventId,eventPoint:eventPoint,carPoint:carPoint,locationPoint:locationPoint,comment:comment,attendeeId:attendeeId};


    console.log(carPoint + eventPoint + locationPoint);
    console.log(comment)
    console.log(feedback);

    this.addFeedback(feedback);

   
  
  }

  addFeedback(feedback:Feedback){

    this.feedbackService.add(feedback).subscribe((res=>{

      console.log(res);
    }),((err=>{
      console.log(err);
    })))
  }
}
