import { Component } from '@angular/core';
import {BooksService} from "../../core/books/books.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthorsService} from "../../core/authors/authors.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertService} from "ngx-alerts";

@Component({
  selector: 'app-update-books',
  templateUrl: './update-books.component.html',
  styleUrls: ['./update-books.component.scss']
})
export class UpdateBooksComponent {

  book_id: any;

  id:any;
  namee: any;
  isbnn: any;
  author_idd: any;
  first_name: any;
  last_name: any;


  authors: any[] = [];


  bookForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [Validators.required]),
    author_id: new FormControl('', [Validators.required])
  });


  get name(): any {
    return this.bookForm.get('name');
  }

  get isbn(): any {
    return this.bookForm.get('isbn');
  }

  get author_id(): any {
    return this.bookForm.get('author_id');
  }





  constructor(private bookService: BooksService,
              private route: ActivatedRoute,
              private authorService: AuthorsService,
              private spinner: NgxSpinnerService,
              private alertService: AlertService) {
  }




  async ngOnInit(): Promise<any> {
    // Extract the ID from the route parameters
    this.route.queryParams.subscribe(params => {
      this.book_id = params['id'];
      if (this.book_id) {
        this.loadBookById(this.book_id);
      }
    });
    await this.loadAllAuthors();
  }


  async loadAllAuthors(): Promise<boolean> {
    return new Promise(async resolve => {
      await this.spinner.show();
      this.authorService.getAuthors().subscribe({
        next:(res)=>{
          this.authors = res;
          console.log(this.authors);
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


  async loadBookById(id:any): Promise<boolean> {
    return new Promise(async resolve => {
      await this.spinner.show();
      this.bookService.getBooksById(id).subscribe({
        next:(res)=>{
          this.id = res.id;
          this.namee = res.name;
          this.isbnn = res.isbn;
          this.author_idd = res.author_id;
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



  updateBook( ): Promise<boolean> {
    return new Promise(resolve => {
      if (this.bookForm.valid){
        this.spinner.show();
        this.bookService.updateBook(this.book_id,this.bookForm.value)
          .subscribe((res: any) => {
            console.log(res);
            this.alertService.success('Book updated successfully!');
            this.spinner.hide();
            resolve(true);
          }, (error: any) => {
            console.log(error.error);
            this.alertService.danger('Something went wrong!');
            resolve(false);
            this.spinner.hide();
          });
      }
    });
  }


}
