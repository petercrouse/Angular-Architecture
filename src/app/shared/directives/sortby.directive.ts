import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    selector: '[appSortBy]'
})
export class SortByDirective {

    private sortProperty: string;

    @Output()
    sorted: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    @Input('appSortBy')
    set sortBy(value: string) {
        this.sortProperty = value;
    }

    @HostListener('click')
    onClick() {
        event.preventDefault();
        this.sorted.next(this.sortProperty);
    }
}
