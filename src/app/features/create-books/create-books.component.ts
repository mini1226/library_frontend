import { Component } from '@angular/core';
import {AuthorsService} from "../../core/authors/authors.service";
import {Router} from "@angular/router";
import {BooksService} from "../../core/books/books.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertService} from "ngx-alerts";

@Component({
  selector: 'app-create-books',
  templateUrl: './create-books.component.html',
  styleUrls: ['./create-books.component.scss']
})
export class CreateBooksComponent {

  authors: any[] = [];


  bookForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [Validators.required]),
    author_id: new FormControl('', [Validators.required])
  });


  constructor(private authorService: AuthorsService,
              private bookService: BooksService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private alertService: AlertService) {
  }


  get name(): any {
    return this.bookForm.get('name');
  }

  get isbn(): any {
    return this.bookForm.get('isbn');
  }

  get author_id(): any {
    return this.bookForm.get('author_id');
  }



  async ngOnInit(): Promise<any> {
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



  addBook( ): Promise<boolean> {
    return new Promise(resolve => {
      if (this.bookForm.valid){
        this.spinner.show();
        this.bookService.addBook(this.bookForm.value)
          .subscribe((res: any) => {
            console.log(res);
            this.alertService.success('Book added successfully!');
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
