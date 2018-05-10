import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../http-service-registry/services/user-management.service';
import { LazyLoadEvent } from 'primeng/primeng';

import { Router, ActivatedRoute } from '@angular/router';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  public users: any[];
  public selectedUsers: any[];
  public totalRecords: number;
  public cols: any[];
  public loading: boolean = false;
  public pagesToDisplay: number;
  public dataTableEvent: DataTableTrackEvent = { currentFilter: '', currentFirstRec: 1, currentRows: 10 };
  // public loadedEvent : LazyLoadEvent;
  constructor(private manageService: UserManagementService,
    private confirmationService: ConfirmationService,
    private router: Router) {
    debugger;
  }

  ngOnInit() {
    //datasource imitation
    // this.manageService.getUsers().subscribe((response: UserPaginated) => {
    //   // let d = response as UserPaginated
    //   console.log(response);
    //   this.users = response.Users;
    //   this.totalRecords = response.Count;

    // });

    this.totalRecords = 10;
    this.pagesToDisplay = 3;
    this.cols = [
      { field: 'first_name', header: 'firstname' },
      { field: 'last_name', header: 'lastname' },
      { field: 'mobile_number', header: 'MobileNumber' },
      { field: 'whats_app_number', header: 'whats app no' },
      { field: 'email_id', header: 'Email' },
      { field: 'createdat', header: 'Created At' },
      { field: 'user_status', header: 'verification status' },
      { field: 'is_active', header: 'Is Active' }
    ];

    // this.loading = true;
  }

  loadUsersLazy(event: LazyLoadEvent) {
    this.loading = true;
    console.log(event);
    console.log(this.selectedUsers);
    this.dataTableEvent = { currentFirstRec: event.first + 1, currentRows: event.rows, currentFilter: event.globalFilter };
    this.serviceCall();

    // this.loadedEvent = event;
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network

    // if (this.datasource) {
    //   this.users = this.datasource.slice(event.first, (event.first + event.rows));
    //   this.loading = false;
    // }
    // this.manageService.getUsers(this.dataTableEvent.currentFirstRec, this.dataTableEvent.currentRows,this.dataTableEvent.currentFilter)
    // .subscribe((response: UserPaginated) => {
    //   console.log(response);
    //   if (response) {
    //     this.users = response.users;

    //     this.totalRecords = response.count;
    //     if (response.count %this.dataTableEvent.currentRows == 0)
    //       this.pagesToDisplay = response.count /this.dataTableEvent.currentRows;
    //     else
    //       this.pagesToDisplay = (response.count / this.dataTableEvent.currentRows) + 1;
    //   }
    //   this.loading = false;

    // });


  }

  serviceCall() {
    this.manageService.getUsers(this.dataTableEvent.currentFirstRec, this.dataTableEvent.currentRows, this.dataTableEvent.currentFilter)
      .subscribe((response: UserPaginated) => {
        console.log(response);
        if (response) {
          this.users = response.users;

          this.totalRecords = response.count;
          if (response.count % this.dataTableEvent.currentRows == 0)
            this.pagesToDisplay = response.count / this.dataTableEvent.currentRows;
          else
            this.pagesToDisplay = (response.count / this.dataTableEvent.currentRows) + 1;
        }
        this.loading = false;

      });
  }

  confirm() {
    this.confirmationService.confirm({
      // message: this.message,
      header: 'Deactivate Users',
      icon: 'fa-times-circle',
      message: 'Are you sure that you want to make this users Inactive?',
      accept: () => {
        //Actual logic to perform a confirmation
        debugger;
        this.deleteUsers();
      }
    });
  }

  deleteUsers(): void {
    let userIdList: Array<string> = [];
    this.selectedUsers.forEach(element => {
      userIdList.push(element.user_id);
    });
    this.manageService.deleteUsers(userIdList).subscribe(() => {
      debugger;
      // this.loadUsersLazy(this.loadedEvent);
      this.serviceCall();
    }, (error: Error) => {
      debugger;
      console.log(error);
    });
  }

  registerNav() {
    this.router.navigate(['/register'], { replaceUrl: true });
  }

}

export interface UserPaginated {
  count: number;
  users: any[];
}

export interface DataTableTrackEvent {
  currentFirstRec: number;
  currentRows: number;
  currentFilter: any;
}

