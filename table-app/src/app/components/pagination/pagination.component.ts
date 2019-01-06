import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number;
  @Input() totalRowCount: number; // total number of possible rows
  @Input() rowsPerPage: number;
  @Input() pagesToShow: number; // how many page options to show at a time
  @Input() isLoading: boolean; // controls disabling of buttons

  // Callbacks
  @Output() rowsPerPageChange = new EventEmitter<number>(); // emit the new row count after user updates via the input field
  @Output() goToPage = new EventEmitter<number>();
  @Output() previousPage = new EventEmitter<boolean>();
  @Output() nextPage = new EventEmitter<boolean>();

  defaultRowsPerPage: number;

  constructor() { }

  ngOnInit() {
    this.defaultRowsPerPage = this.rowsPerPage;
  }

  getMin(): number {
    return (((this.rowsPerPage * this.currentPage) - this.rowsPerPage) + 1);
  }

  getMax(): number {
    let max = this.rowsPerPage * this.currentPage;

    // keep the user from going further than what's readily available
    if (max > this.totalRowCount) {
      max = this.totalRowCount;
    }
    return max;
  }

  // disable the Next Page ">>" button when the user is on the last page
  onLastPage(): boolean {
    return this.rowsPerPage * this.currentPage >= this.totalRowCount;
  }

  getPages(): number[] {
    const total = Math.ceil(this.totalRowCount / this.rowsPerPage);
    const currPage = this.currentPage || 1;
    const pagesToShow = this.pagesToShow || 5;
    const pages: number[] = [];

    pages.push(currPage);

    // get the array of visible page numbers
    const count = pagesToShow - 1;
    for (let i = 0; i < count; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(Math, pages) > 1) {
          pages.push(Math.min.apply(Math, pages) - 1);
        }

        if (Math.max.apply(Math, pages) < total) {
          pages.push(Math.max.apply(Math, pages) + 1);
        }
      }
    }

    // sort ascending
    pages.sort((a, b) => a - b);

    return pages;
  }

  adjustRowCount(count: any) {
    // avoid fetching data for zero or null values
    const parse = parseInt(count, 10);

    if (parse > 0 && parse <= this.totalRowCount) {
      this.rowsPerPage = parse;
    } else {
      this.rowsPerPage = this.defaultRowsPerPage;
    }

    this.rowsPerPageChange.emit(this.rowsPerPage);
    this.toPage(1);
  }

  toPage(pageNum: number) {
    this.goToPage.emit(pageNum);
  }

  toPreviousPage() {
    this.previousPage.emit(true);
  }

  toNextPage() {
    this.nextPage.emit(true);
  }
}
