import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Country } from 'src/app/models/country';
import { AlertifyService } from 'src/app/services/alertify.service';
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];

  carForm: FormGroup;

  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.carForm = this.formBuilder.group({
      carName: '',
      carYear: '',
    });

    this.getAll();
  }

  getAll(): void {
    this.carService.getAll().subscribe((response) => {
      this.cars = response.data;
    });
  }

  submit() {
    console.log(this.carForm);
    let carName = String(this.carForm.controls['carName'].value);
    let carYear = String(this.carForm.controls['carYear'].value);

    let addedCar: Car = { carId: undefined, carName: carName, year: carYear };

    this.addCar(addedCar);

    setTimeout(() => window.location.reload, 1000);
  }

  addCar(car: Car) {
    this.carService.addCar(car).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        this.alertifyService.errorMessage('Could not Add Car');
        console.log(error);
      },
      () => {
        this.alertifyService.successMessage('Car Added');
      }
    );
  }

  deleteCar(car: Car) {
    this.carService.deleteCar(car).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        this.alertifyService.errorMessage('Could not Delete Car');
        console.log(error);
      },
      () => {
        this.alertifyService.successMessage('Car Deleted');
      }
    );
  }

  onDelete(car: Car) {
    this.deleteCar(car);
  }
}
