import { HttpErrorInterceptor } from '@_core/http-interceptors/http-error-interceptor';
import { LogService } from '@_core/services/log.service';
import { LogPublishersService } from '@_core/services/log-publishers.service';
import { SorterService } from '@_core/services/sorter.service';
import { HeadersInterceptor } from '@_core/http-interceptors/header-interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FilterService } from '@_core/services/filter.service';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule
  ],
  exports: [

  ],
  providers: [
    FilterService,
    SorterService,
    LogPublishersService,
    LogService,
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ]
})
export class CoreModule { }
