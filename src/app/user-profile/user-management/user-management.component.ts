import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../http-service-registry/services/user-management.service';
import { LazyLoadEvent } from 'primeng/primeng';


@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  public users: any[];
  public selectedUsers : any[];
  public totalRecords: number;
  public cols: any[];
  public loading: boolean;
  public pagesToDisplay: number;
  constructor(private manageService: UserManagementService) { }

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

  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;
    console.log(event);
    console.log(this.selectedUsers);
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network
    setTimeout(() => {
      debugger;
      // if (this.datasource) {
      //   this.users = this.datasource.slice(event.first, (event.first + event.rows));
      //   this.loading = false;
      // }
      this.manageService.getUsers(event.first + 1, event.rows, event.globalFilter).subscribe((response: UserPaginated) => {
        console.log(response);
        if (response) {
          this.users = response.users;
          
          this.totalRecords = response.count;
          if (response.count % event.rows == 0)
            this.pagesToDisplay = response.count / event.rows;
          else
            this.pagesToDisplay = (response.count / event.rows) + 1;
        }
        this.loading = false;

      });
    }, 1000);

  }
}

export interface UserPaginated {
  count: number;
  users: any[];
}

