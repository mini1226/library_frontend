import { Component } from '@angular/core';
import {AuthorsService} from "../../core/authors/authors.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-all-authors',
  templateUrl: './all-authors.component.html',
  styleUrls: ['./all-authors.component.scss']
})
export class AllAuthorsComponent {

  authors: any[] = [];


  constructor(private authorService: AuthorsService,
              private router: Router,
              private spinner: NgxSpinnerService) {
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


  navigateToViewAuthors(authorId:any) {
    this.router.navigate(['/view-authors'], { queryParams: { id: authorId } }); // Use the route path to "view-books"
  }

  navigateToUpdateAuthors(authorId:any) {
    this.router.navigate(['/update-authors'], { queryParams: { id: authorId } }); // Use the route path to "view-books"
  }


}


