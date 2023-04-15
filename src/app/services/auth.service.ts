import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiUrl = 'http://localhost:3000/user';

  getAll() {
    return this.http.get(this.apiUrl);
  }

  getByCode(code:any) {
    return this.http.get(this.apiUrl + '/' + code);
  }

  getAllRole() {
    return this.http.get('http://localhost:3000/role');
  }

  proceedRegister(inputData: any) {
    return this.http.post(this.apiUrl, inputData);
  }

  proceedLogin(inputData:any) {
    return;
  }

  updateUser(code: any, inputData: any) {
    return this.http.put(this.apiUrl+'/'+code, inputData);
  }

  isLoggedIn() {
    return sessionStorage.getItem('@auth:username') != null;
  }

  getUserRole() {
    return sessionStorage.getItem('@auth:userRole') != null ? sessionStorage.getItem('@auth:userRole')?.toString() : '';
  }


}
