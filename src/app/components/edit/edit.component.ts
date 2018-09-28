import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service'; // service
import { FormGroup, FormControl, Validators } from '@angular/forms'; // reactive forms
import { Router } from '@angular/router'; // routing

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  // editFields
  editFields = {
    'firstname': '',
    'lastname': '',
    'title': '',
    'thumbnail': '',
    'id': '',
  };

  // reactive forms
  editForm: FormGroup;
  createFormGroup() {
    return new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required)
    });
  }

  constructor(private SearchSvc: SearchService,
              private route: Router) {
    this.editForm = this.createFormGroup();
  }

  // validator checks for reactive forms
  get firstname() { return this.editForm.get('firstname'); }
  get lastname() { return this.editForm.get('lastname'); }
  get title() { return this.editForm.get('title'); }

  // submit button
  onSubmit() {
    this.editFields.firstname = this.editForm.value.firstname;
    this.editFields.lastname = this.editForm.value.lastname;
    this.editFields.title = this.editForm.value.title;
    this.SearchSvc.editBook(this.editFields).subscribe((results) => {
      console.log('Suscribed Results: ', results);
      alert('Record Updated!');
      this.route.navigate(['/search']);
    });
  }

  // back button
  goBack() {
    this.route.navigate(['/search']);
  }

  // go upload page
  goUpload() {
    this.route.navigate(['/upload']);
  }

  ngOnInit() {
    this.editForm.patchValue({
      // @ts-ignore
      firstname: this.SearchSvc.editDetails.firstname,
      // @ts-ignore
      lastname: this.SearchSvc.editDetails.lastname,
      // @ts-ignore
      title: this.SearchSvc.editDetails.title
   });
   // @ts-ignore
   this.editFields.thumbnail = this.SearchSvc.editDetails.thumbnail; // for thumbnail loading
    // @ts-ignore
    this.editFields.id = this.SearchSvc.editDetails.id; // for sql update purpose
  }

}
