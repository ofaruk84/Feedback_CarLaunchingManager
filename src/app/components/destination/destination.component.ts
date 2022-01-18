import { Component, OnInit } from '@angular/core';
import { ApiCity } from 'src/app/models/apiCitiy';
import { ApiCountry } from 'src/app/models/apiCountry';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';
import { DestinationService } from 'src/app/services/destination.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Destination } from 'src/app/models/destination';
import { DestinationDto } from 'src/app/models/destinationDto';
import { AlertifyService } from 'src/app/services/alertify.service';
@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css'],
})
export class DestinationComponent implements OnInit {
  dbCountries: Country[] = [];
  countries: ApiCountry[];

  selectedCountry: any = {};

  state: ApiCity = { name: '', iso3: '', states: [] };
  cities: any[] = [];

  destinations: DestinationDto[] = [];

  destinationsDb: Destination[] = [];

  isSelected: boolean = true;

  destinationForm: FormGroup;
  destinationDeleteForm: FormGroup;

  constructor(
    private countryService: CountryService,
    private destinationService: DestinationService,
    private alertifyService: AlertifyService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.destinationForm = this.formBuilder.group({
      countryName: '',
      destinationName: '',
    });

    this.destinationDeleteForm = this.formBuilder.group({
      countryName: '',
      destinationName: '',
    });

    this.getCountries();
    this.getCountriesFromDB();
    this.getDestination();
    this.getAllDestinationsFromDB();
  }

  getAllDestinationsFromDB() {
    this.destinationService.getAll().subscribe((response) => {
      this.destinationsDb = response.data;
    });
  }

  getCountries() {
    this.countryService.getAllCountriesByApi().subscribe((response) => {
      this.countries = response.data;
    });
  }

  getCountriesFromDB() {
    this.countryService.getAll().subscribe((response) => {
      this.dbCountries = response.data;
    });
  }

  getStringValue(value: any): string {
    return String(value);
  }

  getDestination() {
    this.destinationService.getAll().subscribe((response) => {
      response.data.forEach((d) => {
        let cid = d.countryId;
        let countryName = this.dbCountries.find(
          (c) => c.countryId == cid
        )?.countryName;

        let addedDestination: DestinationDto = {
          destinationName: d.destinationName,
          countryName: countryName,
        };

        this.destinations.push(addedDestination);
      });
    });
  }
  onCountryChange($event: any) {
    this.isSelected = false;
    console.log($event.target.value);
    this.selectedCountry = $event.target.value;

    let countryString = this.getStringValue(this.selectedCountry);

    this.destinationService
      .getCitiesByCountry(countryString.toLowerCase())
      .subscribe((response) => {
        this.cities = response.data.states;
      });
  }

  getCountryIdByName(countryName: string): number {
    let id = 0;
    this.countryService.getCountryIdByName(countryName).subscribe(
      (response) => {
        id = response.data;
      },
      (error) => {
        console.log(error);
      }
    );

    return id;
  }

  addDestination(destination: Destination) {
    this.destinationService.addDestination(destination).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        this.alertifyService.errorMessage("Couldn't Add Destination");
      },
      () => {
        this.alertifyService.successMessage('Destination Added');
      }
    );
  }

  submit() {
    let country = String(this.destinationForm.controls['countryName'].value);

    let destination = String(
      this.destinationForm.controls['destinationName'].value
    );

    let countryId = this.dbCountries.find(
      (c) => c.countryName == country
    )?.countryId;

    let addedDestination: Destination = {
      countryId: countryId,
      destinationName: destination,
      destinationId: undefined,
    };

    console.log(addedDestination);
    this.addDestination(addedDestination);

    let updatedDestination: DestinationDto = {
      countryName: country,
      destinationName: destination,
    };
    this.destinations.push(addedDestination);
  }

  deleteSubmit() {
    let destinationName = String(
      this.destinationDeleteForm.controls['destinationName'].value
    );

    this.destinationService.deleteByDestinationName(destinationName).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        this.alertifyService.errorMessage("Couldn't Delete Destination");
      },
      () => {
        this.alertifyService.successMessage('Destination Deleted');
      }
    );
  }
}
