import { FICUser } from '../fic-user';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { UserMaintenanceService } from './user-maintenance.service';

describe('UserMaintenanceService Tests', () => {

  let userMaintenanceService: UserMaintenanceService;
  let httpTestingController: HttpTestingController;

  const testUsers: FICUser[] = [
    // tslint:disable-next-line:max-line-length
    { cpNumber: 'CP345341', ficUser: 'Frodo Baggins', deleted: false, gender: 'male', title: 'Mr', firstName: 'Frodo', lastName: 'Baggins', birthdate: new Date(), ssn: 'whoknows?', email: 'Frodo@theshire.com', occupation: 'unemployed', ficPassword: 'NaughtyNaughty' },
    // tslint:disable-next-line:max-line-length
    { cpNumber: 'CP345342', ficUser: 'Samwise Gamgee', deleted: false, gender: 'male', title: 'Mr', firstName: 'Sam', lastName: 'GamGee', birthdate: new Date(), ssn: 'whoknows?', email: 'sam@theshire.com', occupation: 'unemployed', ficPassword: 'NaughtyNaughty' },
    // tslint:disable-next-line:max-line-length
    { cpNumber: 'CP345343', ficUser: 'Bilbo Baggins', deleted: false, gender: 'male', title: 'Mr', firstName: 'Bilbo', lastName: 'Baggins', birthdate: new Date(), ssn: 'whoknows?', email: 'bilbo@theshire.com', occupation: 'unemployed', ficPassword: 'NaughtyNaughty' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserMaintenanceService]
    });

    userMaintenanceService = TestBed.get(UserMaintenanceService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(userMaintenanceService).toBeTruthy();
  });

  it('should GET all users', () => {
    userMaintenanceService.getFicUsers()
      .subscribe((data: FICUser[]) => {
        expect(data.length).toBe(3);
      });

    const usersRequest: TestRequest = httpTestingController.expectOne('http://localhost:56751/api/users/GetFicUsers');
    expect(usersRequest.request.method).toEqual('GET');

    usersRequest.flush(testUsers);
  });

});
