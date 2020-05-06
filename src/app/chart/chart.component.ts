import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { range } from 'rxjs';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  minDate = new Date(2020, 2, 30);
  maxDate = new Date(2020, 4, 5);
  strDate: string;
  arrData;
  dataList =[10 , 10 , 10];
  dataSource: MatTableDataSource<string>;
  doughnutChartLabels: Label[] = ['Active Cases', 'Deaths', 'Recovered'];
  doughnutChartData: MultiDataSet = [
    [0, 0 , 0]
  ];
  doughnutChartType: ChartType = 'doughnut';
  filteredValue: string[];
  constructor(private httpService: HttpClient) { }

  ngOnInit(): void {
    this.httpService.get('./assets/api/covidData.json').subscribe(
      data => {
        this.arrData = data;
        // tslint:disable-next-line: forin
        // tslint:disable-next-line: prefer-for-of
        for ( let i = 0; i < this.arrData.length; i++){
          this.arrData[i].lastUpdatedAtApify = this.arrData[i].lastUpdatedAtApify.substring(0, 10);
        }
        this.dataSource = new MatTableDataSource(this.arrData);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
  someMethodName(event: MatDatepickerInputEvent<Date>){
    this.applyFilter(event.value.toISOString().substring(0, 10));
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filteredData);
    this.filteredValue = this.dataSource.filteredData;
    this.dataList=[];
    this.dataList.push(this.filteredValue[0].activeCases)
    this.dataList.push(this.filteredValue[0].deaths )
    this.dataList.push(this.filteredValue[0].recovered )
    this.doughnutChartData=this.dataList;
  }
}
