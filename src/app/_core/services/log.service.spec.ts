import { LogPublishersService } from '@_core/services/log-publishers.service';
import { LogEntry, LogService } from '@_core/services/log.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';



describe('Service: Log', () => {

    describe('LogService ', () => {
        let logService: LogService;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [LogService, LogPublishersService]
            });

            logService = TestBed.get(LogService);
        });

        it('should have instance of logService defined', () => {
            expect(logService).toBeTruthy();
        });

        it('should call the debug funtion', () => {
            const msg = 'debug';

            spyOn(logService, 'debug').and.callThrough();

            logService.debug(msg);

            expect(logService.debug).toBeDefined();
            expect(logService.debug).toHaveBeenCalled();
        });

        it('should call the info funtion', () => {
            const msg = 'info';

            spyOn(logService, 'info').and.callThrough();

            logService.info(msg);

            expect(logService.info).toBeDefined();
            expect(logService.info).toHaveBeenCalled();
        });

        it('should call the warn funtion', () => {
            const msg = 'warn';

            spyOn(logService, 'warn').and.callThrough();

            logService.warn(msg);

            expect(logService.warn).toBeDefined();
            expect(logService.warn).toHaveBeenCalled();
        });

        it('should call the error funtion', () => {
            const msg = 'error';

            spyOn(logService, 'error').and.callThrough();

            logService.error(msg);

            expect(logService.error).toBeDefined();
            expect(logService.error).toHaveBeenCalled();
        });

        it('should call the fatal funtion', () => {
            const msg = 'fatal';

            spyOn(logService, 'fatal').and.callThrough();

            logService.fatal(msg);

            expect(logService.fatal).toBeDefined();
            expect(logService.fatal).toHaveBeenCalled();
        });

        it('should call the log funtion', () => {
            const msg = 'log';

            spyOn(logService, 'log').and.callThrough();

            logService.log(msg);

            expect(logService.log).toBeDefined();
            expect(logService.log).toHaveBeenCalled();
        });
    });

    describe('LogEntry ', () => {

        let logEntry: LogEntry;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [LogEntry, LogPublishersService]
            });

            logEntry = TestBed.get(LogEntry);
        });

        it('should have instance of logEntry defined', () => {
            expect(logEntry).toBeTruthy();
        });

        it('should call the debug funtion', () => {
            spyOn(logEntry, 'buildLogString').and.callThrough();

            logEntry.buildLogString();

            expect(logEntry.buildLogString).toBeDefined();
            expect(logEntry.buildLogString).toHaveBeenCalled();
        });
    });
});