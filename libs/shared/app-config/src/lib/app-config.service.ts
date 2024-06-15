import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';

const CONFIG_URL = '/assets/config.json';

@Injectable({ providedIn: 'root' })
export class AppConfigService<T extends object> {
  config!: T;

  fetchConfig() {
    return ajax.getJSON<T>(CONFIG_URL).subscribe((config) => {
      this.config = config;
    });
  }
}
