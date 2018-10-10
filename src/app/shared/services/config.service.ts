import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public static getApiEndpoint(endpointName: string) {
    return environment.apiEndpoints[endpointName];
  }
}
