import { Component, OnInit } from '@angular/core';
import { MockDataService } from 'src/app/common/services/mock-data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  // Table
  rowData: any[];
  columns: string[];

  // Pagination
  currentPage = 1; // load the 1st page by default
  totalRowCount = 0;
  rowsPerPage = 25; // default of 25 rows
  pagesToShow = 5; // how many page options to show at a time
  isLoading = false; // whether the content currently loading
  paginatedRowData: any[];

  constructor(private mockDataService: MockDataService) { }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.isLoading = true;
    this.mockDataService.getData().subscribe((data: any[]) => {
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
    console.log(start);
    const end = (this.rowsPerPage * this.currentPage) + 1;
    console.log(end);
    this.paginatedRowData = this.rowData.slice(start, end);
    console.log(this.paginatedRowData);
    console.log(this.rowData);
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
