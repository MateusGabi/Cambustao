import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { googleMapsConfig } from "environments/googleMapsConfig";

@Injectable()
export class GoogleMapsAPIService {

  private uriGeocodeAPI: string = "https://maps.googleapis.com/maps/api/geocode/json?key=" + googleMapsConfig.apiKey;

  constructor(private http: Http) { }

  extractLocation(res: Response) {
	  return res.json().results[0].geometry.location;
  }

  getLocation(myAddress : string) : Observable<any> {

	return this.http.get(this.uriGeocodeAPI + "&address=" + myAddress).map(this.extractLocation);

  }

}
