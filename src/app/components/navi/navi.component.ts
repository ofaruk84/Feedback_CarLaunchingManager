import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  token:any;
  constructor(private router: Router) { }

  ngOnInit(): void {

    this.token =localStorage.getItem("token");
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
