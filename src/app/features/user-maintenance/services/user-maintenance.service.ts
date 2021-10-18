import { LogService } from '@_core/services/log.service';
import { environment } from '@_environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Customer } from '../customer';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserMaintenanceService {

  public headers: HttpHeaders;
  public baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private logger: LogService) { }

  updateUser(user: Customer): Observable<Boolean> {
    const url = `${this.baseUrl}api/Users/UpdateUser`;
    const body = JSON.stringify(user);

    return this.http.post<Boolean>(url, body);
  }

  getFicUsers(): Observable<Customer[]> {
    const url = `${this.baseUrl}api/users/GetFicUsers`;

    return this.http.get<Customer[]>(url);
  }

  getCapFicUserStatus(customerNumber: string): Observable<string> {
    const url = `${this.baseUrl}api/users/GetSpecificCapFicUser_${customerNumber}`;

    return this.http.get<string>(url);
  }

  addNewCapFicUser(newUser: Customer): Observable<Boolean> {
    const url = `${this.baseUrl}api/users/AddNewCapFicUser`;
    const body = JSON.stringify(newUser);

    return this.http.post<Boolean>(url, body, { headers: this.headers });
  }

  restoreDeletedCapFicUser(customerNumber: string): Observable<Customer> {
    const url = `${this.baseUrl}api/users/RestoreDeletedCapFicUser`;
    const body = JSON.stringify({ customerNumber: customerNumber });

    return this.http.post<Customer>(url, body, { headers: this.headers });
  }
}
