import { getPackageVersionFromPackageJson } from '@angular/material/schematics/ng-add/package-config';
import { LogService } from '@_core/services/log.service';
import { SorterService } from '@_core/services/sorter.service';
import { FilterService } from '@_core/services/filter.service';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Customer } from '../../customer';
import { Store } from '@ngrx/store';
import * as fromUser from './../../state';
import * as userActions from './../../state/user.actions';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserListComponent {

  @Input() users: Customer[];
  @Input() filteredUsers: Customer[];
  @Input() selectedUser: string;
  @Input() errorMessage: string;
  @Output() selected = new EventEmitter<Customer>();
  @Output() deselected = new EventEmitter<void>();

  constructor(private sorterService: SorterService,
              private filterService: FilterService) {}

  onSelect(ficUser: Customer): void {
    (this.selectedUser === ficUser.customerNumber) ? this.userDeSelected() : this.userSelected(ficUser);
  }

  userSelected(ficUser: Customer) {
    this.selected.emit(ficUser);
  }

  userDeSelected(): void {
    this.deselected.emit();
  }

  sort(prop: string) {
    this.sorterService.sort(this.users, prop);
  }

  filterChanged(data: string) {
    if (data && this.users) {
      data = data.toUpperCase();
      const props = ['title', 'firstName', 'lastName', 'cpNumber', 'email'];
      this.filteredUsers = this.filterService.filter<Customer>(this.users, data, props);
    } else {
      this.filteredUsers = this.users;
    }
  }
}
