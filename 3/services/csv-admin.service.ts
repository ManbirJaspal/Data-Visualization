import { Injectable } from "@angular/core";
import { AppState, authenticationStatusChange } from "app/core/states/app-state-reducer";

import { Store, select } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";
import { map, catchError, finalize } from "rxjs/operators";


const routes = {
  auditClaims: () => "report/audit/claims", //Claims Report
  ledgerReport: ()=> "report/audit/ledger", //Ledger Report
  statusCountsR: () => "report/import/statusCounts", // Accumulator Report
  statusMxPartnerGroupCountsR: () => "report/import/statusMxPartnerGroupCounts", // Accumulator Report
  importedFilesR: () => "report/import/importedFiles", // Accumulator Report
  importedFileCountsR: () => "report/import/importedFileCounts", // Accumulator Report
  searchDiagnosis: (query:string,limit:number,offset:number)=>"provider-admin/diagnoses?query="+query+"&limit="+limit+"&offset="+offset,
  searchCharges:(query:string,limit:number,offset:number) => "provider-admin/charges?&query="+query+"&limit="+limit+"&offset="+offset,


};

@Injectable()
export class CsvAdminServices {


  constructor(private httpClient: HttpClient) {

  }

  auditClaims(){
    return this.httpClient.get(routes.auditClaims(), {responseType: 'blob'});
  }

  ledgerReport(){
    return this.httpClient.get(routes.ledgerReport(), {responseType: 'blob'});
  }

  statusCountsR(){
    return this.httpClient.get(routes.statusCountsR(), {responseType: 'blob'});
  }

  statusMxPartnerGroupCountsR(){
    return this.httpClient.get(routes.statusMxPartnerGroupCountsR(), {responseType: 'blob'});
  }

  importedFilesR(){
    return this.httpClient.get(routes.importedFilesR(), {responseType: 'blob'});
  }

  importedFileCountsR(){
    return this.httpClient.get(routes.importedFileCountsR(), {responseType: 'blob'});
  }
}
