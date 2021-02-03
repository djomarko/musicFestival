import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FestivalDataTreeComponent } from './components/festival-data-tree/festival-data-tree.component';
import { SortByKeyPipe } from './pipes/sort-by-key.pipe';

@NgModule({
  declarations: [AppComponent, FestivalDataTreeComponent, SortByKeyPipe],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
