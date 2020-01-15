import { Injectable } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { pattern } from '@app/services/utils';
import { GlobalValidator } from '@app/services/global-validator';
import * as moment from 'moment';

@Injectable()
export class FormBuilderService {
  constructor() {
  }

  _buildPatientForm() {
    return new FormGroup({
      firstName: new FormControl('', Validators.compose([Validators.pattern(pattern.name), Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.pattern(pattern.name), Validators.required])),
      middleName: new FormControl('', Validators.pattern(pattern.name)),
      birthDate: new FormControl(
        '',
        Validators.compose([Validators.maxLength(10), Validators.pattern(pattern.date), Validators.required, GlobalValidator.presentDate])
      ),
      gender: new FormControl(''),
      //sameAsMember: new FormControl('')
    });
  }

  _buildserviceDateForm() {
    return new FormGroup({
      startDate: new FormControl('', Validators.compose([Validators.maxLength(10), Validators.required])),
      endDate: new FormControl(
        '',
        Validators.compose([Validators.maxLength(10), Validators.required, GlobalValidator.serviceDateCheck])
      )
    });
  }

  _buildserviceDateFormForEligibility() {
    return new FormGroup({
      startDate: new FormControl('', Validators.compose([Validators.maxLength(10)])),
      endDate: new FormControl('', Validators.compose([Validators.maxLength(10), GlobalValidator.serviceDateCheck])
      )
    });
  }

  _buildPhysicianForm() {
    return new FormGroup({
      firstName: new FormControl('', Validators.compose([Validators.pattern(pattern.name), Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.pattern(pattern.name), Validators.required])),
      middleName: new FormControl('', Validators.pattern(pattern.name)),
      email: new FormControl('', [Validators.required, Validators.pattern(pattern.email)]),
      phoneMobile: new FormControl('', Validators.compose([Validators.pattern(pattern.phone), Validators.required])),
      npi: new FormControl('', Validators.compose([Validators.minLength(10), Validators.required])),
      sendInvitation: new FormControl(true)
    });
  }

  _buildServiceLocationForm() {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      address1: new FormControl('', Validators.compose([Validators.pattern(pattern.address), Validators.required])),
      address2: new FormControl('', Validators.pattern(pattern.address)),
      city: new FormControl('', Validators.compose([Validators.pattern(pattern.city), Validators.required])),
      state: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.compose([Validators.pattern(pattern.zip), Validators.required]))
    });
  }

  _buildProcedureForm() {
    return new FormGroup({
      price: new FormControl('', Validators.compose([Validators.required, Validators.pattern(pattern.onlyNumber)])),
      quantity: new FormControl('', Validators.compose([Validators.required, Validators.pattern(pattern.integer), GlobalValidator.positiveNumber]))
    });
  }

  _buildDiagnosisForm() {
    return new FormGroup({
      diagnosis: new FormControl('')
    });
  }

  _buildProcedureSettingForm() {
    return new FormGroup({
      description: new FormControl('', Validators.compose([Validators.required])),
      price: new FormControl('', Validators.compose([Validators.required, Validators.pattern(pattern.onlyNumber)])),
      procedureCode: new FormControl('', Validators.compose([Validators.required])),
      status: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  _buildCheckMailForm() {
    return new FormGroup({
      name: new FormControl('', Validators.pattern(pattern.name)),
      address1: new FormControl('', Validators.compose([Validators.pattern(pattern.address), Validators.required])),
      address2: new FormControl('', Validators.compose([Validators.pattern(pattern.address)])),
      city: new FormControl('', Validators.compose([Validators.pattern(pattern.city), Validators.required])),
      state: new FormControl('', Validators.compose([Validators.pattern(pattern.name), Validators.required])),
      zip: new FormControl('', Validators.compose([Validators.pattern(pattern.zip), Validators.required]))
    });
  }

  _bulidSearchForm() {
    return new FormGroup({
      procedure: new FormControl('')
    });
  }

  _buildManageEmployeeForm() {
    return new FormGroup({
      lastName: new FormControl('', Validators.compose([Validators.pattern(pattern.name), Validators.required])),
      middleName: new FormControl('', Validators.compose([Validators.pattern(pattern.name)])),
      firstName: new FormControl('', Validators.compose([Validators.pattern(pattern.name), Validators.required])),

      socialSecurity: new FormControl('', Validators.compose([Validators.pattern(pattern.ssn), Validators.required])),
      birthDate: new FormControl(
        '',
        Validators.compose([Validators.maxLength(10), Validators.pattern(pattern.date), Validators.required, GlobalValidator.presentDate])
      ),

      address1: new FormControl('', Validators.compose([Validators.pattern(pattern.address), Validators.required])),
      address2: new FormControl('', Validators.pattern(pattern.address)),

      city: new FormControl('', Validators.compose([Validators.pattern(pattern.city), Validators.required])),
      state: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.compose([Validators.pattern(pattern.zip), Validators.required])),

      phoneWork: new FormControl('', Validators.compose([Validators.pattern(pattern.phone)])),
      phoneHome: new FormControl('', Validators.compose([Validators.pattern(pattern.phone)])),
      phoneMobile: new FormControl('', Validators.compose([Validators.pattern(pattern.phone), Validators.required])),
      email: new FormControl('', Validators.compose([Validators.pattern(pattern.email), Validators.required])),
      policyName: new FormControl('', Validators.compose([Validators.pattern(pattern.name)])),
      groupNumber: new FormControl('', Validators.compose([Validators.pattern(pattern.onlyNumber)])),
      memberNumber: new FormControl('', Validators.compose([Validators.pattern(pattern.onlyNumber)])),

      /*suffix: new FormControl('', Validators.compose([Validators.pattern(pattern.name)])),
      user_id: new FormControl('', Validators.compose([Validators.pattern(pattern.onlyNumber)])),
      gender: new FormControl('', Validators.required)
      maritalStatus: new FormControl('', Validators.compose([Validators.pattern(pattern.name)])),
      email: new FormControl('', [Validators.required, Validators.email]),
      tcVersion: new FormControl('', Validators.compose([Validators.pattern(pattern.onlyNumber)])),
      groupId: new FormControl('', Validators.compose([Validators.pattern(pattern.name)])),
      memberId: new FormControl('', Validators.compose([Validators.pattern(pattern.name)])),
      relationship: new FormControl('', Validators.compose([Validators.pattern(pattern.name)])),*/
    });
  }

  _buildManageCompanyForm(){
    return new FormGroup({
      companyName: new FormControl('', {updateOn: 'blur',validators:Validators.compose([ Validators.required])}),
      contact: new FormControl('', Validators.compose([Validators.pattern(pattern.name)])),
      resellerId: new FormControl('', {updateOn: 'blur',validators:Validators.compose([ Validators.required])}),
      nameLine2: new FormControl('', Validators.compose([Validators.pattern(pattern.name)])),
      nameLine3: new FormControl('', Validators.compose([Validators.pattern(pattern.name)])),
      address1: new FormControl('',{updateOn: 'blur',validators:Validators.compose([Validators.pattern(pattern.address), Validators.required])} ),
      address2: new FormControl('', Validators.compose([Validators.pattern(pattern.address)])),
      city: new FormControl('', Validators.compose([Validators.pattern(pattern.city), Validators.required])),
      state: new FormControl('', Validators.compose([Validators.pattern(pattern.name), Validators.required])),
      zipCode: new FormControl('', Validators.compose([Validators.pattern(pattern.zip), Validators.required])),
      phone: new FormControl('', Validators.compose([Validators.pattern(pattern.phone), Validators.required])),
      wexName: new FormControl('', Validators.compose([])),
      nextPayrollDate: new FormControl('', {updateOn: 'blur',validators:Validators.compose([ Validators.required])})
    });
  }



  _buildAddressTextDialogForm(){
    return new FormGroup({
      addressName: new FormControl('', Validators.compose([Validators.pattern(pattern.bodyTextArea), Validators.required])),
      address1: new FormControl('', Validators.compose([Validators.pattern(pattern.address), Validators.required])),
      address2: new FormControl('', Validators.compose([Validators.pattern(pattern.address)])),
      city: new FormControl('', Validators.compose([Validators.pattern(pattern.city)])),
      state: new FormControl('', Validators.compose([Validators.pattern(pattern.default), Validators.required])),
      zipCode: new FormControl('', Validators.compose([Validators.pattern(pattern.zip)])),
    });
  }

  _buildSectionTextDialogForm(isTextStr: any, isPhone: any, isWeb: any, isTitle: any, isBenefit: any){

    if(isTextStr){
      return new FormGroup({
        label: new FormControl('', Validators.compose([Validators.pattern(pattern.bodyTextArea)])),
        textStr: new FormControl('')
      });
    }

    if(isPhone){
      return new FormGroup({
        phoneLabel: new FormControl('', Validators.compose([Validators.pattern(pattern.bodyTextArea)])),
        phone: new FormControl('', Validators.compose([Validators.pattern(pattern.phone)]))
      });
    }

    if(isWeb){
      return new FormGroup({
        websiteLabel: new FormControl('', Validators.compose([Validators.pattern(pattern.bodyTextArea)])),
        website: new FormControl('', Validators.compose([Validators.pattern(pattern.url)]))
      });
    }

    if(isTitle){
      return new FormGroup({
        sectionLabel: new FormControl('', Validators.compose([Validators.pattern(pattern.bodyTextArea)]))
      });
    }

    if(isBenefit){
      return new FormGroup({
        RxBin: new FormControl('', Validators.compose([Validators.pattern(pattern.default)])),
        rxPcn: new FormControl('', Validators.compose([Validators.pattern(pattern.default)])),
        rxGroup: new FormControl('', Validators.compose([Validators.pattern(pattern.default)])),
        rxCopay: new FormControl('', Validators.compose([Validators.pattern(pattern.default)]))
      });
    }

    // list of all options.
    /*
    new FormGroup({
        label: new FormControl('', Validators.compose([Validators.pattern(pattern.name), Validators.required])),
        textStr: new FormControl('', Validators.compose([Validators.pattern(pattern.name), Validators.required])),
        phoneLabel: new FormControl('', Validators.compose([Validators.pattern(pattern.name)])),
        phone: new FormControl('', Validators.compose([Validators.pattern(pattern.phone)])),
        websiteLabel: new FormControl('', Validators.compose([Validators.pattern(pattern.name)])),
        website: new FormControl('', Validators.compose([Validators.pattern(pattern.name)])),
        sectionLabel: new FormControl('', Validators.compose([Validators.pattern(pattern.name)])),
        RxBin: new FormControl('', Validators.compose([Validators.pattern(pattern.default)])),
        rxPcn: new FormControl('', Validators.compose([Validators.pattern(pattern.default)])),
        rxGroup: new FormControl('', Validators.compose([Validators.pattern(pattern.default)])),
        rxCopay: new FormControl('', Validators.compose([Validators.pattern(pattern.default)])),
      });
    */
  }


  buildIndividualPlanForm(plan:any,headers:any[],fg:FormGroup){
    const moneyHeaders = headers.filter(header=>header.colType=="Money").map(header=>header.column)
    Object.keys(plan).forEach(key=>{
      if(moneyHeaders.indexOf(key)>-1)
      {
        if(plan[key])
        {
          plan[key] = parseFloat(plan[key])/100.0

        }
      }
    })
    console.log(moneyHeaders)
    if(fg)
    {

      fg.setValue(plan)
      return fg
    }
    else
    {
      const fG = new FormGroup({});
      Object.entries(plan).forEach(arrOfKeyValue => {
        const headerSettings = Object.assign({},headers.find((el: any) => el.column == arrOfKeyValue[0]));
        const fC = new FormControl({disabled:!headerSettings.editable})

        const fCValidator = this.getValidator(arrOfKeyValue[0], headers);
        fC.setValidators(fCValidator);
        fG.addControl(arrOfKeyValue[0], fC);
      });
      fG.setValue(plan)
      return fG;
    }

  }

  formConstructor(sourceData: any, fBuilder: FormBuilder){

    const {data} = sourceData;
    const cForm = fBuilder.group({
      'main' : fBuilder.array([])
    });

    data.forEach((formGroupData: any) =>{
      const fG = new FormGroup({});
      Object.entries(formGroupData).forEach(arrOfKeyValue => {


        const fC = new FormControl(arrOfKeyValue[1])

        const fCValidator = this.getValidator(arrOfKeyValue[0], sourceData['header']);
        fC.setValidators(fCValidator);
        fG.addControl(arrOfKeyValue[0], fC);
      });
      (<FormArray>cForm.get('main')).push(fG);

    });

    return cForm;
  }



  getValidator(fieldName: any, header: any){


    const headerSettings = Object.assign({},header.find((el: any) => el.column == fieldName));

    switch(headerSettings.colType){
      case 'String':
        return [];
      case 'Integer':
        return [];

      case 'Money':
        return [];

      case 'Date':
        return [];

      default:
        return [];

    }

    return [Validators.pattern(pattern.name)];
  }


  dateValidator(control: FormControl) {
    if(control.value == ''){
      return null;
    }

    const value = new Date(control.value);
    if(value instanceof Date){
      return null;
    }
    return {validateDate: {valid: false}};
  }


}
