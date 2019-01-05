import { Component, OnInit } from '@angular/core';
import { MockDataService } from 'src/app/common/services/mock-data.service';
import { Mock } from 'protractor/built/driverProviders';

interface MockData {
  name: string;
  phone: string;
  email: string;
  company: string;
  date_entry: string;
  org_num: string;
  address_1: string;
  city: string;
  zip: string;
  geo: string;
  pan: string;
  pin: string;
  id: number;
  status: string;
  fee: string;
  guid: string;
  date_exit: string;
  date_first: string;
  date_recent: string;
  url: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  // Table
  rowData: MockData[];
  columns: string[];

  // Pagination
  currentPage = 1; // load the 1st page by default
  totalRowCount = 0;
  rowsPerPage = 25; // default of 25 rows
  pagesToShow = 5; // how many page options to show at a time
  isLoading = false; // whether the content currently loading
  paginatedRowData: MockData[];

  constructor(private mockDataService: MockDataService) { }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.isLoading = true;
    this.mockDataService.getData().subscribe((data: MockData[]) => {
      // we would only want to retrieve the columns once
      if (!this.columns) {
        this.columns = this.mockDataService.getColumns(data[0]);
      }

      this.rowData = data;
      this.totalRowCount = this.rowData.length;
      this.paginateData();
      this.isLoading = false;
    });
  }

  // -------------------- Pagination --------------------

  paginateData() {
    const start = ((this.rowsPerPage * this.currentPage) - this.rowsPerPage) + 1;
    const end = (this.rowsPerPage * this.currentPage) + 1;
    this.paginatedRowData = this.rowData.slice(start, end);
  }

  goToPage(pageNum: number) {
    this.currentPage = pageNum;
    this.paginateData();
  }

  goToPrevPage() {
    this.currentPage--;
    this.paginateData();
  }

  goToNextPage() {
    this.currentPage++;
    this.paginateData();
  }
}
