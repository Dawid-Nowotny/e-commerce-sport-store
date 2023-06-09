import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Items } from '../app/items/items';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ServerService {

  private userUrl = 'http://127.0.0.1:5000';  // URL to REST API

  constructor(private http: HttpClient) { }

  /** POST LOGIN */
  login(data: any): Observable<any> {
    const url = `${this.userUrl}/api/login`;
    return this.http.post(url, data, httpOptions);
  }

  /** POST GOOGLE LOGIN */
  login_google(code: any): Observable<any> {
    const url = `${this.userUrl}/api/login_google`;
    return this.http.post(url, code, httpOptions);
  }

   /** POST REGISTER */
   register(data: any): Observable<any> {
    const url = `${this.userUrl}/api/register`;
    return this.http.post(url, data, httpOptions);
  }

  /** POST GETPRODUCTS */
  getProducts(pageIndex: number, pageSize: number): Observable<any> {
    const data = {
      pageIndex: pageIndex,
      pageSize: pageSize
    };
    const url = `${this.userUrl}/api/products`;
    return this.http.post(url, data, httpOptions);
  }

  /** POST GETDETAILS */
  getDetails(productId: string): Observable<any> {
    const data = {
      productId: productId
    };
    const url = `${this.userUrl}/api/product-details`;
    return this.http.post(url, data, httpOptions);
  }

  /** POST ADDTOCART */
  addToCart(data: any): Observable<any> {
    const url = `${this.userUrl}/api/add-to-cart`;
    return this.http.post(url, data, httpOptions);
  }

  /** POST GETCART */
  getCart(): Observable<any> {
    const data = {
      userId: localStorage.getItem("user_id")
    }
    const url = `${this.userUrl}/api/get-cart`;
    return this.http.post(url, data, httpOptions);
  }

  deleteProductFromCart(productId: string, size: string): Observable<any> {
    const data = {
      userId: localStorage.getItem("user_id"),
      productId: productId,
      size: size
    }
    const url = `${this.userUrl}/api/delete-from-cart`;
    return this.http.post(url, data, httpOptions);
  }

  setProductAmount(productId: string, size: string, amount: number): Observable<any> {
    const data = {
      userId: localStorage.getItem("user_id"),
      productId: productId,
      size: size,
      amount: amount
    }
    const url = `${this.userUrl}/api/set-product-amount`;
    return this.http.post(url, data, httpOptions);
  }
}