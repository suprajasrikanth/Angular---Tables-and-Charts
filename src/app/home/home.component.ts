import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatSortModule, MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'gender', 'city'];
  dataSource;
  title = 'my-app';
  noRecords = false;
  constructor(private httpService: HttpClient) { }
  arrData: string [];

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.httpService.get('./assets/api/data1.json').subscribe(
      data => {
        this.arrData = data as string [];
        this.dataSource = new MatTableDataSource(this.arrData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
  applyFilter(filterValue: string) {
    this.noRecords = false;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    if ( this.dataSource.filteredData.length === 0 ){
      this.noRecords = true;
    }
  }
}
