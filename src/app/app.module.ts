import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// components
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { EditComponent } from './components/edit/edit.component';
import { UploadComponent } from './components/upload/upload.component';

// reactive forms
import { ReactiveFormsModule } from '@angular/forms';

// material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

// flex layout
import { FlexLayoutModule } from '@angular/flex-layout';

// services
import { SearchService } from './services/search.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// routing
import { RoutingModule } from './app.routing';
import { AddComponent } from './components/add/add.component';

// service worker
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    EditComponent,
    UploadComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    HttpModule,
    RoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
