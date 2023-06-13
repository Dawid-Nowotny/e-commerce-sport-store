import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  /** GET GETPRODUCTS */
  getProducts(pageIndex: number, pageSize: number): Observable<any> {
    const url = `${this.userUrl}/api/products?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.http.get(url);
  }

  /** GET GETBRANDSANDCATEGORIES */
  getFilteredProducts(pageIndex: number, pageSize: number, filters: string): Observable<any> {
    const url = `${this.userUrl}/api/filtered-products?pageIndex=${pageIndex}&pageSize=${pageSize}` + filters;
    return this.http.get(url);
  }

  /** POST GETDETAILS */
  getDetails(productId: string): Observable<any> {
    const url = `${this.userUrl}/api/product-details?productId=${productId}`;
    return this.http.get(url);
  }

  /** POST GETDETAILSFOREDIT */
  getDetailsForEdit(productId: string): Observable<any> {
    const url = `${this.userUrl}/api/admin/product-details-edit?productId=${productId}`;
    return this.http.get(url);
  }

  /** POST ADDTOCART */
  addToCart(data: any): Observable<any> {
    const url = `${this.userUrl}/api/add-to-cart`;
    return this.http.post(url, data, httpOptions);
  }

  /** GET GETCART */
  getCart(): Observable<any> {
    const url = `${this.userUrl}/api/get-cart?userId=${localStorage.getItem("user_id")}`;
    return this.http.get(url);
  }

  /** DELETE DELETEPRODUCTFROMCART */
  deleteProductFromCart(productId: string, size: string): Observable<any> {
    const userId = localStorage.getItem('user_id');
    const url = `${this.userUrl}/api/delete-from-cart`;
  
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        userId: userId,
        productId: productId,
        size: size,
      },
    };
  
    return this.http.delete(url, options);
  }

  /** PUT SETPRODUCTAMOUNT */
  setProductAmount(productId: string, size: string, amount: number): Observable<any> {
    const data = {
      userId: localStorage.getItem("user_id"),
      productId: productId,
      size: size,
      amount: amount
    }
    const url = `${this.userUrl}/api/set-product-amount`;
    return this.http.put(url, data);
  }

  /** POST ADDPRODUCT */
  addProduct(formData: FormData): Observable<any> {
    const url = `${this.userUrl}/api/admin/add-product`;
    return this.http.post(url, formData);
  }

  /** GET GETBRANDSANDCATEGORIES */
  getBrandsAndCategories(): Observable<any> {
    const url = `${this.userUrl}/api/admin/get-lists`;
    return this.http.get(url);
  }

  /** PUT EDITPRODUCT */
  editProduct(formData: FormData): Observable<any> {
    const url = `${this.userUrl}/api/admin/edit-product`;
    return this.http.put(url, formData);
  }

  /** DELETE DELETEPRODUCT */
  deleteProduct(productId: string): Observable<any> {
    const url = `${this.userUrl}/api/admin/delete-product`;
  
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        productId: productId
      },
    };
  
    return this.http.delete(url, options);
  }

  /** GET DELETEPRODUCT */
  getProductCategory(productId: string): Observable<any> {
    const url = `${this.userUrl}/api/admin/get-product-category?id=${productId}`;
    return this.http.get(url);
  }

  /** POST GETBRANDSANDCATEGORIES */
  addProductStock(data: any): Observable<any> {
    const url = `${this.userUrl}/api/admin/add-stock`;
    return this.http.post(url, data);
  }
}