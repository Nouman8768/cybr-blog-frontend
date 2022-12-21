import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultsRoutingModule } from './search-results-routing.module';
import { SearchResultsComponent } from './search-results.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [SearchResultsComponent],
  imports: [
    CommonModule,
    SearchResultsRoutingModule,
    SharedModule,
    NgxPaginationModule,
  ],
})
export class SearchResultsModule {}
