import { environment } from '@_environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { LogEntry } from '@_core/services/log.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

export abstract class LogPublisher {
    location: string;

    abstract log(record: LogEntry): Observable<Boolean>;
    abstract clear(): Observable<Boolean>;
}

export class LogConsole extends LogPublisher {

    log(entry: LogEntry): Observable<Boolean> {
        console.log(entry.buildLogString());
        return of(true);
    }

    clear(): Observable<Boolean> {
        console.clear();
        return of(true);
    }
}

export class LogLocalStorage extends LogPublisher {

    constructor() {
        super();
        this.location = 'logging';
    }

    log(entry: LogEntry): Observable<Boolean> {
        let ret = false;
        let values: LogEntry[];

        try {
            values = JSON.parse(localStorage.getItem(this.location)) || [];
            values.push(entry);
            localStorage.setItem(this.location, JSON.stringify(values));
            ret = true;
            // browsers can only store between 2MB - 10MB of data. We need to build logic in the catch block
            // to remove the oldest values from the array prior to storing the new log entry.
        } catch (ex) {
            console.log(ex);
        }
        return of(ret);
    }

    clear(): Observable<Boolean> {
        localStorage.removeItem(this.location);
        return of(true);
    }
}

export class LogWebApi extends LogPublisher {

    public baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
        super();
        this.location = 'api/log/LogClient';
    }

    log(entry: LogEntry): Observable<Boolean> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(entry);

        return this.http.post<Boolean>(this.baseUrl + this.location, body, {headers: headers});
    }

    clear(): Observable<Boolean> {
        // TODO: Call Web API to clear all values
        return Observable.of(true);
    }
}

export class LogPublisherConfig {
  loggerName: string;
  loggerLocation: string;
  isActive: boolean;
}
