import { SortByDirective } from './directives/sortby.directive';
import { CpNumberStatusPipe } from './pipes/cp-number-status';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecordsNotFoundComponent } from './records-not-found/records-not-found.component';
import { FilterTextboxComponent } from './filter-textbox/filter-textbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule
    ],
    declarations: [
        PageNotFoundComponent,
        RecordsNotFoundComponent,
        FilterTextboxComponent,
        CpNumberStatusPipe,
        SortByDirective
    ],
    exports: [
        PageNotFoundComponent,
        RecordsNotFoundComponent,
        FilterTextboxComponent,
        FormsModule,
        ReactiveFormsModule,
        CpNumberStatusPipe,
        SortByDirective
    ]
})

export class SharedModule { }
