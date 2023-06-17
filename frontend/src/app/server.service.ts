import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ServerService {

  private userUrl = 'http://127.0.0.1:5000';  // URL to REST API

  constructor(private http: HttpClient) {}

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

  /** GET ISADMIN */
  isAdmin(): Observable<any> {
    const url = `${this.userUrl}/api/admin?userId=${localStorage.getItem('user_id')}`;
    return this.http.get(url);
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

  /** POST SETDELIVERYDATA */
  setDeliveryData(data: any): Observable<any> {
    const url = `${this.userUrl}/api/delivery-data`;
    console.log("setDeliveryData"+data);
    return this.http.post(url, data, httpOptions);
  }

  /** POST ADDORDER */
  addOrder(delivery_id: string): Observable<any> {
    const data = {
      user_id: localStorage.getItem('user_id'),
      delivery_id: delivery_id
    }
    const url = `${this.userUrl}/api/add-order`;
    return this.http.post(url, data, httpOptions);
  }

  /** POST PAYMENT */
  payment(order_id: string): Observable<any> {
    const data = {
      order_id: order_id
    }
    const url = `${this.userUrl}/api/payment`;
    return this.http.post(url, data, httpOptions);
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
    const url = `${this.userUrl}/api/get-lists`;
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

  /** GET PRODUCTCATEGORY */
  getProductCategory(productId: string): Observable<any> {
    const url = `${this.userUrl}/api/admin/get-product-category?id=${productId}`;
    return this.http.get(url);
  }

  /** POST ADDPRODUCTSTOCK */
  addProductStock(data: any): Observable<any> {
    const url = `${this.userUrl}/api/admin/add-stock`;
    return this.http.post(url, data);
  }

  /** GET GETSEARCHRESULT */
  getSearchResult(searchValue: string): Observable<any> {
    const url = `${this.userUrl}/api/search?name=${searchValue}`;
    return this.http.get(url);
  }

  /** GET GETORDERS */
  getOrders(): Observable<any> {
    const url = `${this.userUrl}/api/get-orders?user_id=${localStorage.getItem('user_id')}`;
    return this.http.get(url);
  }

  /** GET GETADMINORDERS */
  getAdminOrders(): Observable<any> {
    const url = `${this.userUrl}/api/admin/get-orders`;
    return this.http.get(url);
  }

  /** PUT PAYORDER */
  payOrder(order_id: string): Observable<any> {
    const data = {
      order_id: order_id
    }
    const url = `${this.userUrl}/api/admin/change-payment`;
    return this.http.put(url, data);
  }

  /** GET ADDPRODUCTSTOCK */
  getSuccessfulPayment(): Observable<any> {
    let orderId = localStorage.getItem('order_id');
    let userId = localStorage.getItem('user_id')
    const url = `${this.userUrl}/api/successful-payment?userId=${userId}&orderId=${orderId}`;
    //localStorage.removeItem('order_id');
    return this.http.get(url);
  }

  /** POST ADDPRODUCTSTOCK */
  putCancelledPayment(): Observable<any> {
    const data = {
      orderId: localStorage.getItem('order_id')
    }
    const url = `${this.userUrl}/api/cancel-payment`;
    //localStorage.removeItem('order_id');
    return this.http.put(url, data);
  }
}