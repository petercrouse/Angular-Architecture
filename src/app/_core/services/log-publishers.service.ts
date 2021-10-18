import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogConsole, LogLocalStorage, LogPublisher, LogWebApi, LogPublisherConfig } from '@_core/services/log-publishers';
import { tap, catchError, map } from 'rxjs/operators';

const PUBLISHERS_FILE = './assets/log-publishers.json';

@Injectable()
export class LogPublishersService {

    constructor(private http: HttpClient) {
        this.buildPublishers();
    }

    publishers: LogPublisher[] = [];

    buildPublishers(): void {
        let logPub: LogPublisher;

        this.getLoggers().subscribe(response => {
            for (const pub of response.filter(p => p.isActive)) {
                switch (pub.loggerName.toLowerCase()) {
                    case 'console':
                        logPub = new LogConsole();
                        break;
                    case 'localstorage':
                        logPub = new LogLocalStorage();
                        break;
                    case 'webapi':
                        logPub = new LogWebApi(this.http);
                        break;
                }
                logPub.location = pub.loggerLocation;
                this.publishers.push(logPub);
            }
        });
    }

    getLoggers(): Observable<LogPublisherConfig[]> {
        return this.http.get<LogPublisherConfig[]>(PUBLISHERS_FILE);
    }
}
