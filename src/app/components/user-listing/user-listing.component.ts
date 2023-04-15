import { Component, Injectable, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})

export class UserListingComponent {
  constructor(private service: AuthService, private dialog: MatDialog) {
    this.loadUser()
  }

  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  loadUser() {
    this.service.getAll().subscribe(res => {
      this.userList = res;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'status', 'action'];

  updateUser(code: any) {
    const popup = this.dialog.open(UpdatePopupComponent, {
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        userCode: code
      }
    });

    popup.afterClosed().subscribe(res => {
      this.loadUser();
    })
  }

  openDialog() {
    this.loadUser();
  }
}
