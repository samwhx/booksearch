import { NgModule } from '@angular/core';

// angular material
import {
  MatSlideToggleModule,
  MatInputModule,
  MatRippleModule,
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatListModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatSelectModule,
  MatRadioModule
} from '@angular/material';

// moment for datepicker
import { MatMomentDateModule } from '@angular/material-moment-adapter';
// material table, sort, pagination
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  exports: [
    MatSlideToggleModule,
    MatInputModule,
    MatRippleModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }

