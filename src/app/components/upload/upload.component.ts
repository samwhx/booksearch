import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router'; // routing
import { environment } from '../../../environments/environment'; // variables for development/production


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  // editFields
  editFields = {
  'thumbnail': '',
  'id': ''
  };

  // image source
  IMG_URL = environment.image_url;

  form: FormGroup;
  loading = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder,
              private SearchSvc: SearchService,
              private route: Router) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      bookimage: [null, Validators.required]
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('bookimage').setValue(file);
    }
  }

  private prepareSave(): any {
    const input = new FormData();
    input.append('bookimage', this.form.get('bookimage').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)
    this.SearchSvc.uploadImage(formModel).subscribe((results) => {
      console.log('Suscribed Results: ', results);
    });
    setTimeout(() => {
      // FormData cannot be inspected (see "Key difference"), hence no need to log it here
      alert('Image Uploaded!');
      this.loading = false;
    }, 1000);
    this.SearchSvc.uploadImageID(this.editFields).subscribe((results) => {
      console.log('Suscribed Results: ', results);
      this.route.navigate(['/search']);
    });
  }

  goBack() {
    this.route.navigate(['/search']);
  }

  ngOnInit() {
      // @ts-ignore
    this.editFields.thumbnail = this.SearchSvc.editDetails.thumbnail; // for thumbnail loading
      // @ts-ignore
    this.editFields.id = this.SearchSvc.editDetails.id; // for sql update purpose
  }

}
