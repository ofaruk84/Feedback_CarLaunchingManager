import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { PhotoService } from 'src/app/services/photo.service';
import { ActivatedRoute } from '@angular/router';
import { AttendeeService } from 'src/app/services/attendee.service';
import { Attendee } from 'src/app/models/attendee';
import { AttendeePhoto } from 'src/app/models/attendeePhoto';
import { AttendeePhotoService } from 'src/app/services/attendee-photo.service';

@Component({
  selector: 'app-attendee-detail',
  templateUrl: './attendee-detail.component.html',
  styleUrls: ['./attendee-detail.component.css']
})
export class AttendeeDetailComponent implements OnInit {

  uploader:FileUploader;
  attendee:Attendee={attendeeId:undefined,attendeeName:"",attendeeJob:"",attendeeNationality:""}
  photos:AttendeePhoto[]=[];
  currentMain:AttendeePhoto;
  hasBaseDropZoneOver = false;
  baseUrl = 'https://localhost:44366/api/AttendeePhotos/add/';

  constructor(private photoService:AttendeePhotoService,private route:ActivatedRoute,private attendeeService:AttendeeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      
      let id = params['id'] as number;
      this.getByid(id);      
      this.initializeUploader(id);
    });
  }

  initializeUploader(id:number){

    this.uploader = new FileUploader({
      url:this.baseUrl+id,
      isHTML5:true,
      allowedFileType:["image"],
      autoUpload:false,
      removeAfterUpload:true,
      
      maxFileSize:10*1024*1024
    })

    this.uploader.onAfterAddingFile=(file)=>{
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item,response,status,headers)=>{

      if(response){

        const res:AttendeePhoto = JSON.parse(response);

        const photo:AttendeePhoto ={
          photoId:res.photoId,
          url:res.url,
          dateAdded:res.dateAdded,
          isMain:res.isMain,
          description:res.description,
          publicId:res.publicId,
          attendeeId:res.attendeeId
        }
        this.photos.push(photo);
      }
    }
  }
  getByid(id:number){

    this.attendeeService.getAll().subscribe((response=>{

      
      let currentAttendee=response.data.find(a=>a.attendeeId==id);

      this.attendee={attendeeId:currentAttendee?.attendeeId,attendeeName:currentAttendee?.attendeeName,attendeeJob:currentAttendee?.attendeeJob,attendeeNationality:currentAttendee?.attendeeNationality}

      console.log(this.attendee)

      

    }))
  }
}
