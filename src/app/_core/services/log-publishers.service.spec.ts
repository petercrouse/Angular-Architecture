import { LogPublishersService } from '@_core/services/log-publishers.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('Service: LogPublishersService', () => {

    let logPublishersService: LogPublishersService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [LogPublishersService, LogPublishersService]
        });

        logPublishersService = TestBed.get(LogPublishersService);
    });

    it('should have instance of logPublishersService defined', () => {
        expect(logPublishersService).toBeTruthy();
        expect(logPublishersService).toBeDefined();
    });

});
