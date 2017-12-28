import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, BaseRequestOptions, RequestOptions, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { IBase } from "../models/meta";

/*
! Promises vs Observables

    promise:
        returns a single value
        not cancellable
    observable:
        works with multiple values over time
        cancellable
        supports map, filter, reduce and similar operators
        proposed feature for ES 2016
        use Reactive Extensions (RxJS)
        an array whose items arrive asynchronously over time
*/

@Injectable()
export abstract class DataService<T extends IBase> extends BaseRequestOptions {
  private endpointUrl: string;
  private options: RequestOptions;

  constructor(private http: Http) {
    super();
  }

  /**
   *
   * @param options
   */
  public merge(options?: RequestOptionsArgs): RequestOptions {
    this.endpointUrl = options.url;
    return this.options = super.merge(options);
  }
  /**
   *
   */
  protected authenticate(): Observable<T> {
    return this.http.get(this.endpointUrl, this.options).map(this.mapSingle).catch(this.handleError);
  }

  /**
   *
   */
  protected authorize(): Observable<T> {
    return this.http.post(this.endpointUrl, this.options).map(this.mapSingle).catch(this.handleError);
  }
  /**
   *
   */
  protected getAll(): Observable<Array<T>> {
    return this.http.get(this.endpointUrl, this.options).map(this.mapMultiple);

    //.catch(this.handleError);
  }

  /**
   *
   * @param id
   */
  protected get(id: number): Observable<T> {
    return this.http.get(this.endpointUrl, this.options).map(this.mapSingle).catch(this.handleError);
  }

  /**
   *
   */
  protected searchSingle(): Observable<T> {
    return this.http.get(this.endpointUrl, this.options).map(this.mapSingle).catch(this.handleError);
  }

  /**
   *
   */
  protected searchMultiple(): Observable<Array<T>> {
    return this.http.get(this.endpointUrl, this.options).map(this.mapMultiple);

    //.catch(this.handleError);
  }
  /**
   *
   */
  protected fileUpload(): Observable<Array<T>> {
    return this.http.get(this.endpointUrl, this.options).map(this.mapMultiple);

    //.catch(this.handleError);
  }

  /**
   *
   * @param t
   */
  protected add(t: T): Observable<T> {
    return this.http.post(this.endpointUrl, this.options).map(this.mapSingle).catch(this.handleError);
  }

  /**
   *
   */
  protected update(t: T): Observable<T> {
    return this.http.put(this.endpointUrl, this.options).map(this.mapSingle).catch(this.handleError);
  }

  /**
   *
   */
  protected delete(id: number): boolean {
    return true;
  }

  /**
   *
   */
  protected toString(t: T): string {
    return JSON.stringify(t);
  }

  /**
   *
   */
  protected toRequestArgs(t: T, headers: Headers, url: string): RequestOptionsArgs {
    headers.set("Authorization", t.meta.token_type + " " + t.meta.access_token);
    let requestArgs = { url: url, headers: headers, responseType: ResponseContentType.Json };
    return requestArgs;
  }

  /**
   *
   */
  protected mapMultiple(response: Response): Array<T> {
    let json = response.json();
    //console.log("jason data" + json);
    let data: Array<T> = json.result;
    let meta = json.meta;
    return data || Array<T>();

  }

  /**
   *
   */
  protected mapSingle(response: Response): T {
    let json = response.json();
    let data: T = json.result;
    data.meta = json.meta;
    return data;
  }

  /**
   *
   */
  protected handleError(error: any): Observable<T> {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    // console.error(errMsg);
    // Handling error
    return Observable.throw(error);
  }
}
