import { Component, OnInit } from '@angular/core';
import { MockDataService } from 'src/app/common/services/mock-data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  rowData: any[];
  columns: string[];

  constructor(private mockDataService: MockDataService) { }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.mockDataService.getData().subscribe((data: any[]) => {
      this.columns = this.mockDataService.getColumns(data[0]); // just set columns equal to first row's keys
      this.rowData = data;
    });
  }
}
