import { HttpClientService } from '@nx-sample/http-client';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private readonly http = inject(HttpClientService);

  public config!: unknown;

  public getRemoteConfig(): Promise<typeof this.config> {
    return firstValueFrom(
      this.http
        .get<typeof this.config>('config-path')
        .pipe(tap((config) => (this.config = config)))
    );
  }

  public getLocalConfig(): Promise<typeof this.config> {
    return firstValueFrom(
      ajax
        .getJSON<typeof this.config>('config-path')
        .pipe(tap((config) => (this.config = config)))
    );
  }
}
