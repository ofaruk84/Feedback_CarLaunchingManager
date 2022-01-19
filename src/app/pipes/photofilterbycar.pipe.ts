import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from '../models/photo';

@Pipe({
  name: 'photofilterbycar'
})
export class PhotofilterbycarPipe implements PipeTransform {

  transform(photos:Photo[],id:number){

    if(!photos || !id){
      return photos;
    }

    return photos.filter(p=>p.carId == id);
  }
}