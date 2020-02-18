import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { NumberSymbol } from "@angular/common";
import { setToLocalStorage, getFromLocalStorage } from './utils/local-storage';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "popwork-register";
  popForm: FormGroup;
  currentTabIndex = 0;
  placeData: any = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.popForm = this.fb.group({
      placeType: ["1", Validators.required],
      visitsPerYear: ["5", Validators.required],
      weekends: [false],
      weekdays: [false],
      emailField: ["", Validators.email],
      fullName: ["", Validators.required],
      phoneNumber: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.token) {
        console.log(JSON.parse(params.token + '"}}'));
        const token = JSON.parse(params.token + '"}}').jwt;
        setToLocalStorage('popworkToken', token)
        // Set to local storage
        this.currentTabIndex = 1;
      }
    });
  }

  onAutocompleteSelected(e) {
    console.log(e)
    this.placeData.name = e.name;
    this.placeData.place_id = e.place_id;
    this.placeData.vicinity = e.formatted_address;
    this.currentTabIndex = 2;
  }

  onLocationSelected(e) {
    console.log(e)
    this.placeData.lat = e.latitude;
    this.placeData.lng = e.longitude;
  }

  public handleAddressChange(address) {
    // Do some stuff
  }

  saveSpace() {
    console.log(this.popForm.value);
    this.placeData = {...this.popForm.value, ...this.placeData};
    console.log(this.placeData);
    this.http
      .post("https://popwork-dev-api.herokuapp.com/register", this.placeData, {headers: {
        'Authorization':  `Bearer ${getFromLocalStorage('popworkToken')}`
      }})
      .subscribe(
        res => {
          // Tabview switch to last tab
          this.currentTabIndex = 3;
        },
        error => {
          // alert('error')
        }
      );
  }
}
