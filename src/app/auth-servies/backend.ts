import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let testUser = { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };
        const productJSON = localStorage.getItem('product');
        let productList: any[] = productJSON ? JSON.parse(productJSON) : [{
            productId: 1,
            productName: 'book',
            productSKU: 4789675,
            productPrice: 300
        }];
        return of(null).pipe(mergeMap(() => {

            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                if (request.body.username === testUser.username && request.body.password === testUser.password) {
                    let body = {
                        id: testUser.id,
                        username: testUser.username,
                        firstName: testUser.firstName,
                        lastName: testUser.lastName,
                        token: 'fake-jwt-token'
                    };
                    return of(new HttpResponse({ status: 200, body }));
                } else {
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }
            if (request.url.endsWith('/product-list') && request.method === 'GET') {

                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    console.log(productList);

                    return of(new HttpResponse({ status: 200, body: productList }));
                } else {
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            if (request.url.endsWith('/product-add') && request.method === 'POST') {

                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    const newProduct = request.body;
                    if (newProduct) {
                        newProduct.productId = newProductId()
                        productList.push(newProduct)
                        console.log(productList);
                        localStorage.setItem('product', JSON.stringify(productList));

                    }
                    function newProductId() {
                        return productList.length ? Math.max(...productList.map(x => x.productId)) + 1 : 1;
                    }
                    return of(new HttpResponse({ status: 200, body: [productList] }));
                } else {
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            return next.handle(request);

        }))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }

}

export let fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};