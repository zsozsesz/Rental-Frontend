import { Component, OnInit } from '@angular/core';
import { CarsService } from './cars.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars = null;
  displayedColumns: string[] = ['name', 'plateNumber', 'cc', 'fuelType', 'username', 'photo'];
  private carForm: FormGroup;
  constructor(private readonly carsService: CarsService, private fb: FormBuilder) {
    this.carForm = this.fb.group({
      name: ['', Validators.required],
      plateNumber: ['', Validators.required],
      cc: ['', Validators.required],
      fuelType: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.carsService.getAllCar().subscribe((res: any) => {
        this.cars = res;
    });
  }

  addCar() {
    this.carsService.addCar(this.carForm.value).subscribe(res => {
      this.carForm.setValue({
        name: '',
        plateNumber: '',
        cc: '',
        fuelType: ''
      });
      this.findAll();
    });
  }
}
