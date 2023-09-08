import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../core/books/books.service";
import {ActivatedRoute} from "@angular/router";
import {AuthorsService} from "../../core/authors/authors.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-view-authors',
  templateUrl: './view-authors.component.html',
  styleUrls: ['./view-authors.component.scss']
})
export class ViewAuthorsComponent implements OnInit{


  author_id: any;

  id:any;
  first_name: any;
  last_name: any;
  written_books: any[] = [];

  constructor(private authorService: AuthorsService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService) {
  }


  async ngOnInit(): Promise<any> {
    // Extract the ID from the route parameters
    this.route.queryParams.subscribe(params => {
      this.author_id = params['id'];
      if (this.author_id) {
        this.loadAuthorById(this.author_id);
      }
    });
  }



  async loadAuthorById(id:any): Promise<boolean> {
    return new Promise(async resolve => {
      await this.spinner.show();
      this.authorService.getAuthorsById(id).subscribe({
        next:(res)=>{
          this.id = res.id;
          this.first_name = res.first_name;
          this.last_name = res.last_name;
          this.written_books = res.written_books;
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
