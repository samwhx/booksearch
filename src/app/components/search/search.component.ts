import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // reactive forms
import { SearchService } from '../../services/search.service'; // service
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material'; // sort
import { Router } from '@angular/router'; // routing
import { environment } from '../../../environments/environment'; // variables for development/production

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // list of types for selection
  types = ['Author', 'Title', 'Author & Title', 'ID'];

  // image source
  IMG_URL = environment.image_url;

  // for table
  displayedColumns: string[] = ['id', 'thumbnail', 'title', 'fullname', 'edit', 'delete'];
  books = (new MatTableDataSource([]));
  // sort
  @ViewChild(MatSort) sort: MatSort;
  // paginator
  length = 1000;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchCriteria = {
    'name': '',
    'title': ''
  };

  // reactive forms
  searchForm: FormGroup;
  createFormGroup() {
    return new FormGroup({
      type: new FormControl('', Validators.required),
      term: new FormControl('', Validators.required),
    });
  }

  constructor(private SearchSvc: SearchService,
              private route: Router) {
    this.searchForm = this.createFormGroup();
  }

  // validator checks for reactive forms
  get type() { return this.searchForm.get('type'); }
  get term() { return this.searchForm.get('term'); }

  // reset button
  reset() {
    this.searchForm.reset();
  }

  // go edit page
  goEditPage(firstname, lastname, title, thumbnail, id) {
    this.SearchSvc.editDetails = {
      'firstname' : firstname,
      'lastname' : lastname,
      'title' : title,
      'thumbnail' : thumbnail,
      'id' : id,
    };
    this.route.navigate(['/edit']);
  }

  // go add page
  goAddPage() {
    this.route.navigate(['/add']);
  }

  // go upload page
  goUpload(firstname, lastname, title, thumbnail, id) {
    this.SearchSvc.editDetails = {
      'firstname' : firstname,
      'lastname' : lastname,
      'title' : title,
      'thumbnail' : thumbnail,
      'id' : id,
    };
    this.route.navigate(['/upload']);
  }

  // delete item
  deleteBook(id) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.SearchSvc.deleteBook({'id' : id}).subscribe((results) => {
        console.log('Suscribed Results; ', results);
        alert('Book Deleted!');
        window.location.reload(); // reload as router will not work if it is same page
      });
    }
  }

  // submit button
  onSubmit() {
    this.searchCriteria.name = ''; // reset to default
    this.searchCriteria.title = ''; // reset to default
    console.log('Submitted Form data >>>>> ', this.searchForm.value);
    if (this.searchForm.value.type === 'ID') {
      if (isFinite(this.searchForm.value.term)) {
        this.SearchSvc.getBook(this.searchForm.value.term).subscribe((results) => {
          console.log('Suscribed Results: ', results);
          this.books = new MatTableDataSource(results);
          this.books.sort = this.sort;
          this.books.paginator = this.paginator;
          this.searchForm.reset();
        });
      } else {
        alert('Book Id search only accepts numbers!');
      }
    } else {
      if (this.searchForm.value.type === 'Author') {
        this.searchCriteria.name = `%${this.searchForm.value.term}%`;
      }
      if (this.searchForm.value.type === 'Title') {
        this.searchCriteria.title = `%${this.searchForm.value.term}%`;
      }
      if (this.searchForm.value.type === 'Author & Title') {
        this.searchCriteria.name = `%${this.searchForm.value.term}%`;
        this.searchCriteria.title = `%${this.searchForm.value.term}%`;
      }
      console.log('Sent Data >>>>> Name:', this.searchCriteria.name, ', Title: ', this.searchCriteria.title);
      this.SearchSvc.getBooks(this.searchCriteria).subscribe((results) => {
        console.log('Suscribed Results: ', results);
        this.books = new MatTableDataSource(results);
        this.books.sort = this.sort;
        this.books.paginator = this.paginator;
      });
      this.searchForm.reset();
    }
  }

  ngOnInit() {
    // init get all data
    this.SearchSvc.getBooks(this.searchCriteria).subscribe((results) => {
      console.log('Suscribed Results; ', results);
      this.books = new MatTableDataSource(results);
      this.books.sort = this.sort;
      this.books.paginator = this.paginator;
    });
  }
}
