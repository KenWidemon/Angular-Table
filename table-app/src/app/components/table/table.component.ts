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

  constructor(private mockDataService: MockDataService) { }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.isLoading = true;
    this.mockDataService.getData().subscribe((data: any[]) => {
      this.columns = this.mockDataService.getColumns(data[0]);
      this.rowData = data;
      this.totalRowCount = this.rowData.length;
      this.isLoading = false;
    });
  }

// -------------------- Pagination --------------------

  goToPage(pageNum: number) {
    this.currentPage = pageNum;
  }

  goToPrevPage() {
    this.currentPage--;
  }

  goToNextPage() {
    this.currentPage++;
  }
}
