import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service'; // service
import { FormGroup, FormControl, Validators } from '@angular/forms'; // reactive forms
import { Router } from '@angular/router'; // routing

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

  // addFields
  addFields = {
    'firstname': '',
    'lastname': '',
    'title': ''
  };

  // reactive forms
  addForm: FormGroup;
  createFormGroup() {
    return new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required)
    });
  }

  constructor(private SearchSvc: SearchService,
    private route: Router) {
  this.addForm = this.createFormGroup();
  }

  // validator checks called from html for reactive forms
  get firstname() { return this.addForm.get('firstname'); }
  get lastname() { return this.addForm.get('lastname'); }
  get title() { return this.addForm.get('title'); }

  // submit button
  onSubmit () {
    console.log('Submitted Values: ', this.addForm.value);
    this.addFields.firstname = this.addForm.value.firstname;
    this.addFields.lastname = this.addForm.value.lastname;
    this.addFields.title = this.addForm.value.title;
    this.SearchSvc.addBook(this.addFields).subscribe((results) => {
      console.log('Suscribed Results; ', results);
      alert('Record Added!');
      this.route.navigate(['/search']);
    });
  }

  // back button
  goBack() {
    this.route.navigate(['/search']);
  }

  ngOnInit() {
  }

}
