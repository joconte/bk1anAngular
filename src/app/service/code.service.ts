import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CodeValideOuiNon} from '../model/codeValideOuiNon';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  apiUrl = 'http://localhost:8080/';

  async getUntestedCode() {
    return await this.http.get(this.apiUrl + 'api/bk/', this.httpOptions).toPromise();
  }

  async postInvalidCode(codeValideOuiNon: CodeValideOuiNon) {
    await this.http.post(this.apiUrl + 'api/bk/', codeValideOuiNon, this.httpOptions).toPromise();
  }

  async postValideCode(codeValideOuiNon: CodeValideOuiNon) {
    await this.http.post(this.apiUrl + 'api/bk/winner/', codeValideOuiNon, this.httpOptions).toPromise();
  }

  async getWinnerCode() {
    return await this.http.get(this.apiUrl + 'api/bk/winners/', this.httpOptions).toPromise();
  }

  async getStats() {
    return await this.http.get(this.apiUrl + 'api/bk/stats/', this.httpOptions).toPromise();
  }

  async checkMyCodeIsUntested(codeValideOuiNon: CodeValideOuiNon) {
    return await this.http.post(this.apiUrl + 'api/bk/untested/', codeValideOuiNon, this.httpOptions).toPromise();
  }
}
