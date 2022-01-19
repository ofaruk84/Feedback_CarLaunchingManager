import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Attendee } from 'src/app/models/attendee';
import { Car } from 'src/app/models/car';
import { Country } from 'src/app/models/country';
import { DashboardItem } from 'src/app/models/dashboardItem';
import { Destination } from 'src/app/models/destination';
import { Photo } from 'src/app/models/photo';
import { CarService } from 'src/app/services/car.service';
import { CountryService } from 'src/app/services/country.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DestinationService } from 'src/app/services/destination.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // items:DashboardItem[]=[{id:1,carName:"C180",date:"20.10.22",destination:"Mallorca",attendeesCount:"124"},
  // {id:2,carName:"C180",date:"20.10.22",destination:"Mallorca",attendeesCount:"124"},
  // {id:3,carName:"C180",date:"20.10.22",destination:"Mallorca",attendeesCount:"124"},
  // {id:4,carName:"C180",date:"20.10.22",destination:"Mallorca",attendeesCount:"124"}];
  items: DashboardItem[];
  filteredItems: DashboardItem[];

  photos: Photo[];
  filteredPhotos: Photo[];
  destinations: Destination[];
  filteredDestinations: Destination[];
  countries: Country[];

  //On Car Selected-Obsolete
  cars:Car[];
  filteredCars:Car[];

  selectedCountry: any;
  selectedDestination: any;

  //On Car Selected-Obsolete
  selectedCar: any;

  disabled = true;
  default = 'All';

  constructor(
    private dashboardservice: DashboardService,
    private photoService: PhotoService,
    private router: Router,
    private countryService: CountryService,
    private destinationService: DestinationService,
    private carService:CarService
  ) {
    this.filteredItems = this.items;
  }

  ngOnInit(): void {
    //window.location.reload();
    this.getEvents();
    this.getPhotos();
    this.getCountries();
    this.getDestinations();
    this.getCars();
  }

  getEvents() {
    this.dashboardservice.getEvents().subscribe((response) => {
      this.items = response.data;
      this.filteredItems = response.data;
      console.log(this.items)
    });
  }

  getPhotos() {
    this.photoService.getAll().subscribe((response) => {
      this.photos = response.data;
    });
  }

  filterPhotos(carId: number) {
    this.filteredPhotos = this.photos.filter((photo) => photo.carId == carId);
  }

  getCountries() {
    this.countryService.getAll().subscribe((response) => {
      this.countries = response.data;
    });
  }

  getDestinations() {
    this.destinationService.getAll().subscribe((response) => {
      this.destinations = response.data;
      this.filteredDestinations = response.data;
    });
  }

  getCars(){

    this.carService.getAll().subscribe((response) => {
      this.cars = response.data;
      this.filteredCars = response.data;
    });

  }

  //On Country Selected
  onCountrySelected() {
    if (this.selectedCountry == this.default) {
      this.filteredItems = this.items;
      this.selectedDestination=this.default;
      //this.selectedCar = this.default;
      this.disabled=true
      return;
    }
    this.filteredItems = this.items.filter(
      (item) => item.countryName == this.selectedCountry
    );
    console.log(this.selectedCountry);
    console.log(this.items);

    let currentCountry = this.countries
      .filter((country) => country.countryName == this.selectedCountry)
      .pop() as Country;

    this.filteredDestinations = this.destinations.filter(
      (d) => d.countryId == currentCountry.countryId
    );
    this.disabled = false;
  }

  //On Car Selected-Obsolete
   onCarSelected(){
    if (this.selectedCountry == this.default) {
      this.filteredCars = this.cars;
      return;
    }
    this.filteredItems = this.items.filter(
      (item) => item.carName == this.selectedCar
    );
   }

   onDestinationSelected(){
    if (this.selectedCountry == this.default) {
     
      return;
    }
    this.filteredItems = this.items.filter(
      (item) => item.destinationName == this.selectedDestination
    );
   }
}