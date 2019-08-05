import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  displayedColumns: string[] = ['name', 'plateNumber', 'cc', 'fuelType', 'action'];
  displayedTripColumns: string[] = ['date', 'distance', 'private'];
  private tripForm: FormGroup;
  private user = null;
  constructor(private readonly userServie: UserService,  private fb: FormBuilder) {
    this.tripForm = this.fb.group({
      distance: ['', Validators.required],
      private: ['']
    });
   }

  ngOnInit() {
    this.getProfile();
  }
  assign(id) {
    this.userServie.assign(id).subscribe(res => {
      this.user = null;
      this.getProfile();
    });
  }

  addTrip() {
      this.userServie.addTrip(this.user.car[0]._id, this.tripForm.value).subscribe(resp => {
        this.user = null;
        this.tripForm.setValue({
          distance: '',
          private: ''
        });
        this.getProfile();
      });
  }


  getProfile() {
    this.userServie.getSelf().subscribe(resp => {
      this.user = resp;
   });
  }
}
