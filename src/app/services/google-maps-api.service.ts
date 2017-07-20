import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { googleMapsConfig } from "environments/googleMapsConfig";

@Injectable()
export class GoogleMapsAPIService {

  googleMapsClient = require('@google/maps').createClient({
    key: googleMapsConfig.apiKey
  });

  private uriGeocodeAPI: string = "https://maps.googleapis.com/maps/api/geocode/json?key=" + googleMapsConfig.apiKey;

  constructor(private http: Http) { }

  extractData(res: Response) {
	  return res.json();
  }

  getLocation(myAddress : string) : Observable<any> {

	return this.http.get(this.uriGeocodeAPI + "&address=" + myAddress).map(this.extractData);

  }

}
