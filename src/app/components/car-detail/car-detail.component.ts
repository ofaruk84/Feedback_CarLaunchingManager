import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { PhotoService } from 'src/app/services/photo.service';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';
import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  uploader:FileUploader;
  car:Car={carId:undefined,carName:"",year:""}
  photos:Photo[]=[];
  currentMain:Photo;
  hasBaseDropZoneOver = false;
  baseUrl = 'https://localhost:44366/api/photos/add/';
  constructor(private photoService:PhotoService,private route:ActivatedRoute,private carService:CarService) { }

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

        const res:Photo = JSON.parse(response);

        const photo:Photo ={
          photoId:res.photoId,
          url:res.url,
          dateAdded:res.dateAdded,
          isMain:res.isMain,
          description:res.description,
          publicId:res.publicId,
          carId:res.carId
        }
        this.photos.push(photo);
      }
    }
  }

  getByid(id:number){

    this.carService.getAll().subscribe((response=>{

      
      let currentCar=response.data.find(c=>c.carId==id);

      this.car={carId:currentCar?.carId,carName:currentCar?.carName,year:currentCar?.year}

      console.log(this.car)

      

    }))
  }

}
