
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, publish, refCount, retry, tap } from 'rxjs/operators';

import { LocalStorageService } from './local-storage/local-storage.service';
import { AppSettingsModel } from '../models/app-settings.model';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private readonly appSettingsUrl = '/assets/app-settings.json';
  private readonly appSettingsKey = 'appSettings';

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) { }

  updateLocalSettings(username: string, settings: AppSettingsModel): void {
    this.localStorageService.setItem(this.getUserSettingsKey(username), settings);
  }

  getLocalSettings(username: string): AppSettingsModel {
    return this.localStorageService.getItem<AppSettingsModel>(this.getUserSettingsKey(username));
  }

  fetch(username: string): Observable<AppSettingsModel> {
    return this.http.get<AppSettingsModel>(this.appSettingsUrl).pipe(
      retry(2),
      tap(settings => this.updateLocalSettings(username, settings)),
      publish(),
      refCount(),
      catchError(this.handleError));
  }

  private getUserSettingsKey(username: string): string {
    return `${this.appSettingsKey}/${username}`;
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
