import { Injectable } from '@angular/core';


@Injectable()
export class MatTablePageConfigService {

  pageSize = 10;
  pageSizeOptions = [5, 10, 25];

  constructor(
  ) {}
}
