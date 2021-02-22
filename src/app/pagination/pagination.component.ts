import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() totalPages: number;
  @Input() currentPage: number;
  visiblePages: number[] = [];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    

  }


  ngOnChanges() {
    console.log(this.totalPages, this.currentPage);
    let startPage, endPage: number;
    if(this.totalPages) {
      if(this.totalPages <= 5) {
        startPage = 1;
        endPage = this.totalPages;
      }else {
        let maxPagesBeforeCurrentPage = Math.floor(5/2);
        let maxPagesAfterCurrentPage = Math.ceil(5/2) - 1;
        if(this.currentPage <= maxPagesBeforeCurrentPage) {
          startPage = 1;
          endPage = 5;
        }else if(this.currentPage + maxPagesAfterCurrentPage >= this.totalPages) {
          startPage = this.totalPages - 5 + 1;
          endPage = this.totalPages;
        }else {
          startPage = this.currentPage - maxPagesBeforeCurrentPage;
          endPage = this.currentPage + maxPagesAfterCurrentPage;
        }
      }
      this.visiblePages = Array.from(Array((endPage + 1) - startPage).keys()).map(el => startPage + el)
      console.log(this.visiblePages)
    }
    
  }

  onSelectPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page
      },
      queryParamsHandling: 'merge'
    })
  }

  onNextPage() {
    if(this.currentPage < this.totalPages) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          page: this.currentPage + 1
        },
        queryParamsHandling: 'merge'
      })
    }
  }

  onPrevPage() {
    if(this.currentPage > 1) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          page: this.currentPage - 1
        },
        queryParamsHandling: 'merge'
      })
    }
  }
 
}
