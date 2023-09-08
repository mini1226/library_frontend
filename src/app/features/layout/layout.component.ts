import {Component, OnInit} from '@angular/core';
import {AppService} from "../../core/app/app.service";
import {BooksService} from "../../core/books/books.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit{

  books: any[] = [];
  currentPage: number = 1; // Initialize the current page
  itemsPerPage: number = 10; // Number of items to display per page


  constructor(private bookService: BooksService,
              private router: Router,
              private spinner: NgxSpinnerService) {
  }

  async ngOnInit(): Promise<any> {
    await this.loadAllBooks(this.currentPage, this.itemsPerPage);
  }


  async loadAllBooks(page: number, limit: number): Promise<boolean> {
    return new Promise(async resolve => {
      await this.spinner.show();
      this.bookService.getBooks(page, limit).subscribe({
        next:(res)=>{
          this.books = res;
          console.log(this.books);
          resolve(true);
          this.spinner.hide();
        },
        error:() => {
          resolve(false);
          this.spinner.hide();
        }
      });
    });
  }

  // Function to handle page changes
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadAllBooks(this.currentPage, this.itemsPerPage);
  }

  getPageArray(): number[] {
    const totalPages = this.totalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  totalPages(): number {
    return Math.ceil(this.books.length / this.itemsPerPage);
  }


  navigateToViewBooks(bookId: any) {
    this.router.navigate(['/view-books'],{ queryParams: { id: bookId } }); // Use the route path to "view-books"
  }

  navigateToUpdateBooks(bookId: any) {
    this.router.navigate(['/update-books'],{ queryParams: { id: bookId } }); // Use the route path to "view-books"
  }


}
