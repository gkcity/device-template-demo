import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {HomeResponse} from "./response/HomeResponse";
import {ProductInfoCodec} from '../typedef/codec/ProductInfoCodec';
import {ProductInfo} from '../typedef/define/ProductInfo';

@Injectable({providedIn: 'root'})
export class ProductService {
  private server: string = environment.server;

  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * 读取产品模板
   */
  getProducts(): Observable<ProductInfo[]> {
    return this.http
      .get<HomeResponse>(`${this.server}/templates.json`)
      .pipe(map(response => ProductInfoCodec.decodeArray(response.data)));
  }

  /**
   * 读取物模型
   */
  getInstance(type: string): Observable<any> {
    const params = {
      type: type
    }
    return this.http
      .get<HomeResponse>(`${this.server}/template.json`, {params})
      .pipe(map(response => response.data));
  }
}
