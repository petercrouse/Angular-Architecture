import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Customer } from '@_features/user-maintenance/customer';
import { Modal } from 'ngx-modal';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { IMyDpOptions, IMyDateModel, IMyInputFieldChanged } from 'mydatepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent implements OnInit {

  @ViewChild('ManageUserModal') ManageUserModal: Modal;
  @ViewChild('ConfirmationModal') ConfirmationModal: Modal;
  @Input() selectedFicUser: Customer;
  @Output() updateUser = new EventEmitter<Customer>();

  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy hh:mm',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    inline: false
  };

  private birthdate: { date: { year: string, month: string, day: string } };
  private manageUserForm: FormGroup;

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  onBirthDatePickerChanged(event: IMyDateModel) {
    if (event.jsdate != null && moment(event.jsdate).isValid()) {
      const date = moment(event.jsdate);
      this.manageUserForm.patchValue({ birthdate: date });
      this.birthdate = { date: { year: date.format('YYYY'), month: date.format('M'), day: date.format('D') } };
    } else {
      this.manageUserForm.patchValue({ birthdate: null });
      this.birthdate = null;
    }
  }

  createForm() {
    this.manageUserForm = this.fb.group({
      cpNumber: [null, Validators.compose([Validators.required, Validators.maxLength(8)])],
      birthdate: [null, [Validators.required]],
      ficUser: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
      gender: [null, [Validators.required]],
      title: [null, Validators.compose([Validators.required, Validators.maxLength(30)])],
      firstName: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
      lastName: [null, Validators.compose([Validators.required, Validators.maxLength(120)])],
      ssn: [null, Validators.compose([Validators.required, Validators.maxLength(13)])],
      email: [null, Validators.compose([Validators.required, Validators.maxLength(255), Validators.email])],
      occupation: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      password: [null, Validators.compose([Validators.required, Validators.maxLength(100)])]
    });
  }

  onBirthDateInputFieldChanged(event: IMyInputFieldChanged) {
    if (!event.valid) {
      this.manageUserForm.patchValue({ birthdate: null });
    }
  }

  clearForm(): void {
    this.manageUserForm.reset();
    this.manageUserForm.get('birthdate').reset();
    this.ManageUserModal.close();
  }

  mapUserDetails(): void {
    this.manageUserForm.get('cpNumber').setValue(this.selectedFicUser.customerNumber);
    this.manageUserForm.get('ficUser').setValue(this.selectedFicUser.userName);
    this.manageUserForm.get('title').setValue(this.selectedFicUser.title);
    this.manageUserForm.get('firstName').setValue(this.selectedFicUser.firstName);
    this.manageUserForm.get('lastName').setValue(this.selectedFicUser.lastName);
    this.manageUserForm.get('ssn').setValue(this.selectedFicUser.ssn);
    this.manageUserForm.get('email').setValue(this.selectedFicUser.email);
    this.manageUserForm.get('occupation').setValue(this.selectedFicUser.occupation);
    this.manageUserForm.get('password').setValue(this.selectedFicUser.password);
    this.manageUserForm.get('gender').setValue(this.selectedFicUser.gender);
    // Sets date pickers date
    const date = moment(this.selectedFicUser.birthdate, 'YYYY/MM/DD');
    this.manageUserForm.patchValue({ birthdate: date });
    this.birthdate = { date: { year: date.format('YYYY'), month: date.format('M'), day: date.format('D') } };

    this.ManageUserModal.open();
  }

  getUserDetails(): Customer {
    this.selectedFicUser.customerNumber = this.manageUserForm.get('cpNumber').value;
    this.selectedFicUser.userName = this.manageUserForm.get('ficUser').value;
    this.selectedFicUser.title = this.manageUserForm.get('title').value;
    this.selectedFicUser.firstName = this.manageUserForm.get('firstName').value;
    this.selectedFicUser.lastName = this.manageUserForm.get('lastName').value;
    this.selectedFicUser.ssn = this.manageUserForm.get('ssn').value;
    this.selectedFicUser.email = this.manageUserForm.get('email').value;
    this.selectedFicUser.occupation = this.manageUserForm.get('occupation').value;
    this.selectedFicUser.password = this.manageUserForm.get('password').value;
    this.selectedFicUser.gender = this.manageUserForm.get('gender').value;
    this.selectedFicUser.birthdate = new Date(Number(this.birthdate.date.year),
      Number(this.birthdate.date.month),
      Number(this.birthdate.date.day)
    );

    return this.selectedFicUser;
  }

  onSubmit(): void {
    this.getUserDetails();
    this.updateUser.emit(this.selectedFicUser);
    this.ConfirmationModal.close();
    this.ManageUserModal.close();
  }
}
