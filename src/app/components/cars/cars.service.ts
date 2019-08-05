import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  getAllCar() {
    return this.http.get('/car');
  }
  addCar(data) {
    return this.http.post('/car/new', data);
  }
}
