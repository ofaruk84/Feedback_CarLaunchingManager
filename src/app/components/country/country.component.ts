import { Component, OnInit } from '@angular/core';
import { ApiCountry } from 'src/app/models/apiCountry';
import { CountryService } from 'src/app/services/country.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Country } from 'src/app/models/country';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
})
export class CountryComponent implements OnInit {
  countries: ApiCountry[];
  newCountry: ApiCountry[] = [];
  dbCountries: Country[] = [];
  selectedCountry: any = {};
  isSelected = true;

  countryForm: FormGroup;
  countryDeleteForm: FormGroup;

  constructor(
    private countryService: CountryService,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.countryForm = this.formBuilder.group({
      countryName: '',
    });

    this.countryDeleteForm = this.formBuilder.group({
      countryName: '',
    });

    this.getCountries();
  }

  getCountries() {
    console.log('a');
    this.countryService.getAllCountriesByApi().subscribe((response) => {
      this.countries = response.data;
    });
  }
  log() {
    console.log(this.countries);

    this.countries.forEach((c, i) => {
      let addedCountry: ApiCountry = { country: c.country, cities: c.cities };

      this.newCountry.push(addedCountry);
    });
  }

  submit() {
    let val = String(this.countryForm.controls['countryName'].value);

    let addedCountry: Country = { countryId: undefined, countryName: val };

    console.log(val);
    console.log(addedCountry);
    this.addCountry(addedCountry);
  }

  deleteSubmit() {
    let country = String(this.countryDeleteForm.controls['countryName'].value);

    console.log(country);
    this.delete(country);
  }

  delete(countryName: string): void {
    this.countryService.deleteByCountryName(countryName).subscribe(
      (response) => {
        console.log(response);
      },
      (err) => {
        this.alertifyService.errorMessage("Couldn't Delete Attendee");
      },
      () => {
        console.log('complete');
        this.alertifyService.successMessage('Country Deleted');
      }
    );
  }
  addCountry(country: Country) {
    this.countryService.addCountry(country).subscribe(
      (response) => {
        console.log(response);
      },
      (err) => {
        this.alertifyService.errorMessage("Couldn't Add Country");
      },

      () => {
        this.alertifyService.successMessage('Country Added');
      }
    );
  }

  getAll() {
    this.countryService.getAll().subscribe((response) => {
      this.dbCountries = response.data;
    });
  }

  onCountryChange() {
    this.isSelected = false;
  }
}
