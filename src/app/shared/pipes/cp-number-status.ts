import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cpNumberStatusText' })
export class CpNumberStatusPipe implements PipeTransform {

    transform(value: string) {
        switch (value) {
            case 'Unused':
                return 'CP Number is available for use';
            case 'Used':
                return 'CP Number in use';
            case 'Deleted':
                return 'CP Number marked as deleted';
            default:
                return value;
        }
    }
}
