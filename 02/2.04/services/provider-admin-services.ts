import { Injectable } from '@angular/core';
import { AppState, authenticationStatusChange } from 'app/core/states/app-state-reducer';

import { Store, select } from '@ngrx/store';
import {HttpClient, HttpParams} from '@angular/common/http';
import { map, catchError, finalize } from 'rxjs/operators';
import { SessionTimeoutService } from '@app/core';

const routes = {
  register: () => 'provider-admin/register',
  memberLookup: () => 'provider-admin/lookup-mx-member',
  getServiceLocations: () => 'provider-admin/locations',
  saveServicesLocation: () => 'provider-admin/locations',
  getPhysicians: (serviceLocationId: string, limit: number) => 'provider-admin/physicians?serviceLocationId=' + serviceLocationId + '&limit=' + limit,
  savePhysician: () => 'provider-admin/physicians',
  getPaymentPreference: () => 'provider-admin/payment-preference',
  savePaymentPreferenceCheck: () => 'provider-admin/payment-preference/check',
  savePaymentPreferenceACH: () => 'provider-admin/payment-preference/ach',
  submitBill: () => 'provider-admin/bill',
  searchDiagnosis: (query: string, limit: number, offset: number) =>
    'provider-admin/diagnoses?query=' + query + '&limit=' + limit + '&offset=' + offset,
  searchCharges: (query: string, limit: number, offset: number) =>
    'provider-admin/charges?&query=' + query + '&limit=' + limit + '&offset=' + offset,
  searchChargesByLoc: (limit: number, offset: number, serviceLoc: number) =>
    'provider-admin/charges?serviceLocationId=' + serviceLoc + '&limit=' + limit + '&offset=' + offset,
  saveOrEditCharge: () => 'provider-admin/charges',
  getStripeUrl: () => 'provider-admin/payment-preference/stripe-connect-url',
  unAuthorizeStripe: () => 'provider-admin/payment-preference/ach/deauthorize',
  eligibility: () => 'provider-admin/eligibility',
  deductible: () => 'eligibility/deductible',
  policyById: () => 'policyById',
  paysource: (userId: string) => 'paysource/' + userId
};

@Injectable()
export class ProviderAdminServices {
  constructor(
    private httpClient: HttpClient,
    public store: Store<AppState>,
    public sessionTimeoutService: SessionTimeoutService
  ) {}

  register(data: any) {
    return this.httpClient.post(routes.register(), data).pipe(
      map((resp: any) => {
        const auth = {
          username: resp.email,
          token: 'Bearer ' + resp.token,
          expiredAt: resp.expiredAt
        };
        this.store.dispatch({
          type: authenticationStatusChange,
          payload: auth
        });

        localStorage.setItem('credentials', JSON.stringify(auth));
        //console.log(resp.expiredAt)
        this.sessionTimeoutService.setTime(resp.expiredAt - Date.now());
        return auth;
      })
    );
  }

  memberLookup(data: any) {
    return this.httpClient.post(routes.memberLookup(), data);
  }

  getServiceLocations() {
    return this.httpClient.get(routes.getServiceLocations());
  }

  saveServiceLocation(data: any) {
    return this.httpClient.post(routes.saveServicesLocation(), data);
  }

  editServiceLocation(id: number, data: any) {
    return this.httpClient.post(`${routes.saveServicesLocation()}\\${id}`, data);
  }

  searchDiagnosis(query: string, limit: number, offset: number) {
    return this.httpClient.get(routes.searchDiagnosis(query, limit, offset));
  }
  searchCharges(query: string, limit: number, offset: number) {
    return this.httpClient.get(routes.searchCharges(query, limit, offset));
  }
  searchChargesByLoc(serviceLocationId: number, limit: number, offset: number) {
    return this.httpClient.get(routes.searchChargesByLoc(serviceLocationId, limit, offset));
  }

  saveOrEditCharge(data: any) {
    return this.httpClient.post(routes.saveOrEditCharge(), data);
  }

  getPhysicians(serviceLocationId: string, limit: number = 20) {
      return this.httpClient.get(routes.getPhysicians(serviceLocationId, limit));

  }

  editPhysician(id: number, data: any) {
    return this.httpClient.post(`${routes.savePhysician()}\\${id}`, data);
  }
  savePhysician(data: any) {
    return this.httpClient.post(routes.savePhysician(), data);
  }

  getPaymentPreference() {
    return this.httpClient.get(routes.getPaymentPreference());
  }
  savePaymentPreferenceCheck(data: any) {
    return this.httpClient.post(routes.savePaymentPreferenceCheck(), data);
  }
  savePaymentPreferenceACH(data: any) {
    return this.httpClient.post(routes.savePaymentPreferenceACH(), data);
  }

  submitBill(data: any) {
    return this.httpClient.post(routes.submitBill(), data);
  }
  getStripeUrl() {
    return this.httpClient.get(routes.getStripeUrl());
  }
  unAuthorizeStripe() {
    return this.httpClient.post(routes.unAuthorizeStripe(), {});
  }

  eligibility(data: any){
    return this.httpClient.post(routes.eligibility(), data);
  }

  policyById(userId: any){
    const options = { params: new HttpParams().set('userId', userId)};
    return this.httpClient.get(routes.policyById(), options);
  }

  deductible(data: any){
    return this.httpClient.get(routes.deductible(), data);
  }

  paysource(userId: any){
    //const options = { params: new HttpParams().set('userId', userId)};
    return this.httpClient.get(routes.paysource(userId));
  }

}
