import { HttpClientService } from '@nx-sample/http-client';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Injectable({ providedIn: 'root' })
export class AppConfigService<T extends object> {
  private readonly http = inject(HttpClientService);

  public config!: T;

  public fetchConfig(): Promise<T> {
    return firstValueFrom(
      ajax
        .getJSON<T>('/assets/config.json')
        .pipe(tap((config) => {
          console.log(config);
          (this.config = config)
        }))
    );
  }
}
