import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { NumberSymbol } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "popwork-register";
  popForm: FormGroup;
  token;

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
        this.token = JSON.parse(params.token + '"}}').jwt;
      }
    });
  }

  public handleAddressChange(address) {
    // Do some stuff
  }

  saveSpace() {
    console.log(this.popForm.value);
    this.http
      .post("http://localhost:3001/register", this.popForm.value)
      .subscribe(
        res => {
          // Tabview switch to last tab
        },
        error => {
          // alert('error')
        }
      );
  }
}
