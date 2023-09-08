import { Component } from '@angular/core';
import {AuthorsService} from "../../core/authors/authors.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertService} from "ngx-alerts";

@Component({
  selector: 'app-update-authors',
  templateUrl: './update-authors.component.html',
  styleUrls: ['./update-authors.component.scss']
})
export class UpdateAuthorsComponent {


  author_id: any;

  id:any;
  first_namee: any;
  last_namee: any;
  written_books: any[] = [];


  authorForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required])
  });

  constructor(private authorService: AuthorsService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private alertService: AlertService) {
  }

  get first_name(): any {
    return this.authorForm.get('first_name');
  }

  get last_name(): any {
    return this.authorForm.get('last_name');
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
          this.first_namee = res.first_name;
          this.last_namee = res.last_name;
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



  updateAuthor(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.authorForm.valid){
        this.spinner.show();
        this.authorService.updateAuthor(this.author_id,this.authorForm.value)
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
