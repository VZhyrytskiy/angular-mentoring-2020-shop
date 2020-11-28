
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, Subject, throwError } from 'rxjs';
import { catchError, finalize, publish, refCount, retry, tap } from 'rxjs/operators';

import { LocalStorageService } from './local-storage/local-storage.service';
import { AppSettingsModel } from '../models/app-settings.model';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private readonly defaultSettings: AppSettingsModel = new AppSettingsModel(false);
  private readonly settings: Subject<AppSettingsModel> = new Subject();

  private readonly appSettingsUrl = '/assets/app-settings.json';
  private readonly appSettingsKey = 'appSettings';

  channel$: Observable<AppSettingsModel> = this.settings.asObservable();

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) {
    const localSettings = localStorageService.getItem<AppSettingsModel>(this.appSettingsKey);

    this.settings.subscribe(settings => this.localStorageService.setItem(this.appSettingsKey, settings));

    if (localSettings) {
      this.update(localSettings);
    } else {
      this.fetch();
    }
  }

  setIsDarkTheme(value: boolean): void {
    this.update(new AppSettingsModel(value));
  }

  update(settings: AppSettingsModel): void {
    this.settings.next(settings);
  }

  private fetch(): void {
    this.http.get<AppSettingsModel>(this.appSettingsUrl).pipe(
      retry(2),
      tap({ next: this.update }),
      publish(),
      refCount(),
      finalize(() => this.update(this.defaultSettings)),
      catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    if (errorResponse.error instanceof Error) {
      console.error(errorResponse.error.message);
    } else {
      console.error(`${errorResponse.status}: ${errorResponse.error.message}`);
    }

    return throwError('Unexpected error');
  }
}
