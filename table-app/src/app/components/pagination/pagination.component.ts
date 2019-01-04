import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number;
  @Input() totalRowCount: number;
  @Input() rowsPerPage: number;
  @Input() pagesToShow: number; // how many page options to show at a time
  @Input() isLoading: boolean; // whether the content currently loading

  // Callbacks
  @Output() goToPage = new EventEmitter<number>();
  @Output() previousPage = new EventEmitter<boolean>();
  @Output() nextPage = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  getMin(): number {
    return (((this.rowsPerPage * this.currentPage) - this.rowsPerPage) + 1);
  }

  getMax(): number {
    let max = this.rowsPerPage * this.currentPage;
    if (max > this.totalRowCount) {
      max = this.totalRowCount;
    }
    return max;
  }

  onLastPage(): boolean {
    return this.rowsPerPage * this.currentPage >= this.totalRowCount;
  }

  getPages(): number[] {
    const total = Math.ceil(this.totalRowCount / this.rowsPerPage);
    const currPage = this.currentPage || 1;
    const pagesToShow = this.pagesToShow || 1;
    const pages: number[] = [];

    pages.push(currPage);

    const count = pagesToShow - 1;
    for (let i = 0; i < count; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < total) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }

    pages.sort((a, b) => a - b);

    return pages;
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

  adjustRowCount(count: number) {
    this.rowsPerPage = count;
  }
}
