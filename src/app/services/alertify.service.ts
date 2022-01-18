import { Injectable } from '@angular/core';
declare let alertify:any;
alertify.set('notifier','position', 'top-right');

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  successMessage(message:string){
    
    
    alertify.success(message);
  }

  errorMessage(message:string){
    
    alertify.error(message);
  }
}
