import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthorsService} from "../../core/authors/authors.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AlertService} from "ngx-alerts";

@Component({
  selector: 'app-create-authors',
  templateUrl: './create-authors.component.html',
  styleUrls: ['./create-authors.component.scss']
})
export class CreateAuthorsComponent {

  authorForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required])
  });

  constructor(private authorService: AuthorsService,
              private spinner: NgxSpinnerService,
              private alertService: AlertService) {

  }

  get first_name(): any {
    return this.authorForm.get('first_name');
  }

  get last_name(): any {
    return this.authorForm.get('last_name');
  }



  addAuthor( ): Promise<boolean> {
    return new Promise(resolve => {
      if (this.authorForm.valid){
        this.spinner.show();
        this.authorService.addAuthor(this.authorForm.value)
          .subscribe((res: any) => {
            console.log(res);
            this.alertService.success('Author added successfully!');
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
