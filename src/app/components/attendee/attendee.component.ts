import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiCountry } from 'src/app/models/apiCountry';
import { Attendee } from 'src/app/models/attendee';
import { AttendeeMail } from 'src/app/models/attendeeMail';
import { AttendeeRegisterModel } from 'src/app/models/attendeeRegisterModel';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AttendeeAuthService } from 'src/app/services/attendee-auth.service';
import { AttendeeService } from 'src/app/services/attendee.service';
import { CountryService } from 'src/app/services/country.service';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-attendee',
  templateUrl: './attendee.component.html',
  styleUrls: ['./attendee.component.css'],
})
export class AttendeeComponent implements OnInit {
  attendees: Attendee[] = [];
  attendeeForm: FormGroup;
  attendeeDeleteForm: FormGroup;
  countries: ApiCountry[] = [];

  constructor(
    private attendeeService: AttendeeService,
    private attendeeAuth: AttendeeAuthService,
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private alertifyService: AlertifyService,
    private mailService:MailService
  ) {}

  ngOnInit(): void {
    this.attendeeForm = this.formBuilder.group({
      attendeeEmail: '',
      attendeeName: '',
      attendeeJob: '',
      attendeeNationality: '',
    });
    this.attendeeDeleteForm = this.formBuilder.group({
      attendeeName: '',
    });

    this.getAll();
    this.getCountries();
  }

  getAll(): void {
    this.attendeeService.getAll().subscribe((response) => {
      this.attendees = response.data;
    });
  }

  addAttendee(attendee: Attendee) {
    this.attendeeService.addAttendee(attendee).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        //this.alertifyService.errorMessage("Couldn't Add Attendee");
      },
      () => {
        this.alertifyService.successMessage('Attendee Added');
      }
    );
  }

  submit() {
    let attendeeEmail = this.attendeeForm.controls['attendeeEmail'].value;
    let attendeeNationality = String(
      this.attendeeForm.controls['attendeeNationality'].value
    );
    let attendeeName = this.attendeeForm.controls['attendeeName'].value;
    let attendeeJob = this.attendeeForm.controls['attendeeJob'].value;
    let password = 'mercedesLaunchfy';
    console.log(password);

    let addedAttendee: AttendeeRegisterModel = {
      email: attendeeEmail,
      attendeeName: attendeeName,
      password: password,
      attendeeJob: attendeeJob,
      attendeeNationality: attendeeNationality,
    };
    console.log(addedAttendee);

    this.register(addedAttendee);
    //this.attendees.push(addedAttendee);
  }

  getCountries() {
    this.countryService.getAllCountriesByApi().subscribe((response) => {
      this.countries = response.data;
    });
  }

  register(attendee: AttendeeRegisterModel) {

    let attendeeForMail:AttendeeMail = {email:attendee.email,attendeeName:attendee.attendeeName}
    this.attendeeAuth.register(attendee).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
        this.alertifyService.errorMessage('Couldnt  Add Attendee');
      },
      () => {
        this.alertifyService.successMessage('Attendee Added');
        
      }
      
    );

    this.sendPassword(attendeeForMail);
  }

  sendPassword(attendeeMail:AttendeeMail){

    this.mailService.sendPassword(attendeeMail).subscribe((res=>{

    }),(error=>{
      console.log(error);
      this.alertifyService.errorMessage("Mail Error")
    }),(()=>{
      this.alertifyService.successMessage("Mail has been sent to : "+attendeeMail.email);
    }))
  }

  deleteAttendee(attendee: Attendee) {

    this.attendeeService.deleteAttendee(attendee).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
        this.alertifyService.errorMessage('Couldnt  Delete Attendee');
      },
      () => {
        this.alertifyService.successMessage('Attendee Delete');
        
      }
      
    );

 
  }

  onDelete(attendee: Attendee) {

    this.deleteAttendee(attendee);
  }
}
