import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';

import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import 'rxjs/add/operator/catch';

import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class DishService {

  constructor(private restangular: Restangular) { }

  getDishes(): Observable<Dish[]> {
    return this.restangular.all('dishes').getList();
    /*return this.http.get(baseURL + 'dishes')
      .map(res => { return this.processHttpmsgService.extractData(res); })
      .catch(error => { return this.processHttpmsgService.handleError(error); });*/
    //return Observable.of(DISHES).delay(2000);
    /*return new Promise(resolve => {
      setTimeout(() => resolve(DISHES), 2000)
    });*/
  }

  getDish(id: number): Observable<Dish> {
    return this.restangular.one('dishes',id).get();
    /*return this.http.get(baseURL + 'dishes/' + id)
      .map(res => { return this.processHttpmsgService.extractData(res); })
      .catch(error => { return this.processHttpmsgService.handleError(error); });*/
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes').getList({featured: true})
      .map(dishes => dishes[0]);
    /*return this.http.get(baseURL + 'dishes?featured=true')
      .map(res => { return this.processHttpmsgService.extractData(res)[0]; })
      .catch(error => { return this.processHttpmsgService.handleError(error); });*/
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish.id) })
      //.catch(error => { return error; });
      .catch(error => { return Observable.of(error); });
  }
}
