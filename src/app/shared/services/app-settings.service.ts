
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, finalize, publish, refCount, retry, tap } from 'rxjs/operators';

import { LocalStorageService } from './local-storage/local-storage.service';
import { AppSettingsModel } from '../models/app-settings.model';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private readonly appSettingsUrl = '/assets/app-settings.json';
  private readonly appSettingsKey = 'appSettings';
  private readonly defaultSettings: AppSettingsModel = new AppSettingsModel(false);
  private readonly settings: BehaviorSubject<AppSettingsModel> = new BehaviorSubject(this.defaultSettings);
  settings$: Observable<AppSettingsModel> = this.settings.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient) { }

  update(username: string, settings: AppSettingsModel): void {
    this.settings.next(settings);
    this.localStorageService.setItem(this.appSettingsKey + username, settings);
  }

  get(username: string): Observable<AppSettingsModel> {
    const localSettings = this.localStorageService.getItem<AppSettingsModel>(this.appSettingsKey + username);
    if (!localSettings) {
      return this.fetch(username);
    }

    this.update(username, localSettings);
    return of(localSettings);
  }

  private fetch(username: string): Observable<AppSettingsModel> {
    return this.http.get<AppSettingsModel>(this.appSettingsUrl).pipe(
      retry(2),
      tap(settings => this.update(username, settings)),
      publish(),
      refCount(),
      finalize(() => this.reset()),
      catchError(this.handleError));
  }

  reset(): void {
    this.settings.next(this.defaultSettings);
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
