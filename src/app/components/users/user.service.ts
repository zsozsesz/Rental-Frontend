import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getSelf() {
      return this.http.get('/user/self');
  }
  assign(id) {
    return this.http.get('/user/assign/' + id);
  }
  addTrip(id, data) {
    return this.http.put('/user/trip/' + id, data);
  }
}
