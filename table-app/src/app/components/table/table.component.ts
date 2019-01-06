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
  [key: string]: any; // this will allow us to add unknown properties to our objects
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
  totalRowCount = 0; // total number of possible rows
  rowsPerPage = 25; // default of 25 rows to show per page
  pagesToShow = 5; // how many page options to show at a time
  isLoading = false; // controls whether to show the loading overlay when the table is reloaded
  paginatedRowData: MockData[];

  constructor(private mockDataService: MockDataService) { }

  ngOnInit() {
    this.getTableData();
  }

  // async/await for proper data retrieval and readability
  async getTableData() {
    try {
      this.isLoading = true;
      const tableData = await this.mockDataService.getData(); // get data as a Promise

      // add JSON data for button click to each row
      // this will also control whether a button is shown or not
      tableData.map((obj: MockData) => {
        const btnJSON = { 'id': obj.id, 'status': obj.status };
        obj.button = btnJSON;
        return obj;
      });

      // only retrieve the columns once
      if (!this.columns) {
        this.columns = this.mockDataService.getColumns(tableData[0]);
      }

      this.rowData = tableData;
      this.totalRowCount = this.rowData.length;

      // set the initial pagination
      this.paginateData();
      this.isLoading = false;
    } catch (err) {
      alert(err);
    }
  }

  // -------------------- Pagination --------------------

  paginateData() {
    const start = ((this.rowsPerPage * this.currentPage) - this.rowsPerPage);
    const end = (this.rowsPerPage * this.currentPage);
    this.paginatedRowData = this.rowData.slice(start, end); // just use the data we have instead of making several API calls
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

  // button click
  postIdAndStatus(request: any) {
    // request is the JSON object attached to the button
    this.mockDataService.postStatus(request)
      .subscribe(
        (res) => {
          alert('Your POST request was successful.');
        },
        (err) => {
          console.warn(err);
        }
      );
  }
}
