import { LogEntry } from '@_core/services/log.service';
import { LogPublishersService } from '@_core/services/log-publishers.service';
import { LogConsole, LogLocalStorage } from '@_core/services/log-publishers';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';



describe('Class: Log Publisher', () => {

    describe('LogConsole ', () => {
        let logConsole: LogConsole;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [LogConsole, LogPublishersService, LogEntry]
            });

            logConsole = TestBed.get(LogConsole);
        });

        it('should have instance of LogConsole defined', () => {
            expect(logConsole).toBeTruthy();
            expect(logConsole).toBeDefined();
        });

        it('should call the log funtion', inject([LogEntry], (logEntry: LogEntry) => {

            spyOn(logConsole, 'log').and.callThrough();

            logConsole.log(logEntry);

            expect(logConsole.log).toHaveBeenCalled();
        }));

        it('should call the clear funtion', () => {

            spyOn(logConsole, 'clear').and.callThrough();

            logConsole.clear();

            expect(logConsole.clear).toHaveBeenCalled();
        });

    });

    describe('LogLocalStorage ', () => {
        let logLocalStorage: LogLocalStorage;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                providers: [LogLocalStorage, LogPublishersService, LogEntry]
            });

            logLocalStorage = TestBed.get(LogLocalStorage);
        });

        it('should have instance of LogLocalStorage defined', () => {
            expect(logLocalStorage).toBeTruthy();
            expect(logLocalStorage).toBeDefined();
        });

        it('should call the log funtion', inject([LogEntry], (logEntry: LogEntry) => {

            spyOn(logLocalStorage, 'log').and.callThrough();

            logLocalStorage.log(logEntry);

            expect(logLocalStorage.log).toHaveBeenCalled();
        }));

        it('should call the clear funtion', () => {

            spyOn(logLocalStorage, 'clear').and.callThrough();

            logLocalStorage.clear();

            expect(logLocalStorage.clear).toHaveBeenCalled();
        });

    });
});

