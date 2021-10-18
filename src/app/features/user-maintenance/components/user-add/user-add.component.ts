import { Observable } from 'rxjs/internal/Rx';
import { InitializeCurrentUser } from '@_features/user-maintenance/state/user.actions';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'ngx-modal';
import { IMyDpOptions, IMyDateModel, IMyInputFieldChanged } from 'mydatepicker';
import { FICUser } from '@_features/user-maintenance/fic-user';
import { UserMaintenanceService } from '@_features/user-maintenance/services/user-maintenance.service';
import * as moment from 'moment';
import * as fromUser from '@_features/user-maintenance/state';
import * as userActions from '@_features/user-maintenance/state/user.actions';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserAddComponent implements OnInit {

  @Input() errorMessage: string;
  @Input() cpNumberStatus: string;
  @Input() cpNumberToStatusCheck: string;
  @ViewChild('AddUserModal') AddUserModal: Modal;
  @ViewChild('ConfirmationModal') ConfirmationModal: Modal;
  @Output() returnNewUser: EventEmitter<FICUser> = new EventEmitter<FICUser>();
  @Output() returnRestoredUser: EventEmitter<string> = new EventEmitter<string>();
  @Output() initializeNewUser: EventEmitter<void> = new EventEmitter<void>();
  @Output() checkStatus: EventEmitter<string> = new EventEmitter<string>();
  @Output() setCpNumberToCheck: EventEmitter<string> = new EventEmitter<string>();

  addUserForm: FormGroup;
  birthdate = null;

  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    inline: false
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  onBirthDateChanged(event: IMyDateModel) {
    if (event.jsdate != null && moment(event.jsdate).isValid()) {
      this.addUserForm.patchValue({ birthdate: moment(event.jsdate) });
    } else {
      this.addUserForm.patchValue({ birthdate: null });
    }
  }

  onBirthDateInputFieldChanged(event: IMyInputFieldChanged) {
    if (!event.valid) {
      this.addUserForm.patchValue({ birthdate: null });
    }
  }

  checkCPNumberStatus(cpNumber: string) {
    if (cpNumber != null && this.cpNumberToStatusCheck !== cpNumber) {
      this.cpNumberStatus = 'Checking CP Number Status...';
      this.setCpNumberToCheck.emit(cpNumber);
      this.checkStatus.emit(cpNumber);
    }
  }

  getNewUserDetails(): FICUser {
    const newUserDetails: FICUser = {
      ficUser: this.addUserForm.value.ficUser,
      cpNumber: this.cpNumberToStatusCheck,
      deleted: false,
      title: this.addUserForm.value.title,
      firstName: this.addUserForm.value.firstName,
      lastName: this.addUserForm.value.lastName,
      ssn: this.addUserForm.value.ssn,
      email: this.addUserForm.value.email,
      occupation: this.addUserForm.value.occupation,
      ficPassword: this.addUserForm.value.password1,
      gender: this.addUserForm.value.gender,
      birthdate: this.birthdate.formatted
    };
    return newUserDetails;
  }

  onCancel() {
    this.resetForm();
  }

  createForm() {
    this.addUserForm = this.fb.group({
      cpNumber: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
      birthdate: [null, [Validators.required]],
      ficUser: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
      gender: [null, [Validators.required]],
      title: [null, Validators.compose([Validators.required, Validators.maxLength(30)])],
      firstName: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
      lastName: [null, Validators.compose([Validators.required, Validators.maxLength(120)])],
      ssn: [null, Validators.compose([Validators.required, Validators.maxLength(13)])],
      email: [null, Validators.compose([Validators.required, Validators.maxLength(255), Validators.email])],
      occupation: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
      password1: [null, Validators.compose([Validators.required, Validators.maxLength(100)])]
    });
  }

  onAddUser() {
    this.returnNewUser.emit(this.getNewUserDetails());
    this.resetForm();
    this.AddUserModal.close();
  }

  onRestore() {
    this.returnRestoredUser.emit(this.cpNumberToStatusCheck);
    this.resetForm();
    this.ConfirmationModal.close();
    this.AddUserModal.close();
  }

  resetForm() {
    this.birthdate = null;
    this.addUserForm.reset();
    this.cpNumberStatus = '';
    this.cpNumberToStatusCheck = '';
  }
}
