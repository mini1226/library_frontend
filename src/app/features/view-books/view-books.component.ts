import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../core/books/books.service";
import {ActivatedRoute} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.scss']
})
export class ViewBooksComponent implements OnInit{

  book_id: any;

  id:any;
  name: any;
  isbn: any;
  author_id: any;
  first_name: any;
  last_name: any;


  constructor(private bookService: BooksService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService) {
  }

  async ngOnInit(): Promise<any> {
    // Extract the ID from the route parameters
    this.route.queryParams.subscribe(params => {
      this.book_id = params['id'];
      if (this.book_id) {
        this.loadBookById(this.book_id);
      }
    });
  }


  async loadBookById(id:any): Promise<boolean> {
    return new Promise(async resolve => {
      await this.spinner.show();
      this.bookService.getBooksById(id).subscribe({
        next:(res)=>{
          this.id = res.id;
          this.name = res.name;
          this.isbn = res.isbn;
          this.author_id = res.author_id;
          this.first_name = res.first_name;
          this.last_name = res.last_name;
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


}
