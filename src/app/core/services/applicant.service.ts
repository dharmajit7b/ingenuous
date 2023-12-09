import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicantService {
  constructor() {}

  public getAllApplicantionData() {
    let applicationData: Array<any> =
    this.convertStringToJson(sessionStorage.getItem('applicationList')) || [];
    return applicationData;
  }

  public getApplicantionDataById(id:number) {
    let applicationData: Array<any> =
    this.convertStringToJson(sessionStorage.getItem('applicationList')) || [];
    let applicant = applicationData?.find(el=>el.id == id);
    return applicant;
  }
  //create Application
  public createData(data: any) {
    data = { ...data, id: Date.now() };
    let applicationData: Array<any> =
      this.convertStringToJson(sessionStorage.getItem('applicationList')) || [];
    applicationData.unshift(data);
    sessionStorage.setItem(
      'applicationList',
      this.convertJsonToString(applicationData)
    );
  }

  //create Application
  public updateData(data: any) {
    let applicationData: Array<any> =
      this.convertStringToJson(sessionStorage.getItem('applicationList')) || [];
    let index = applicationData?.findIndex(el=>el.id == data.id);
    if(index >-1){
      applicationData[index]=data;
    }
    sessionStorage.setItem(
      'applicationList',
      this.convertJsonToString(applicationData)
    );
  }

    //Delete Application
  public deleteData(data: any) {
    let applicationData: Array<any> =
    this.convertStringToJson(sessionStorage.getItem('applicationList')) || [];
    applicationData =applicationData?.filter(el=>el?.id != data?.id);
    sessionStorage.setItem(
      'applicationList',
      this.convertJsonToString(applicationData)
    );
  }
  // JSON-formatted string
  private convertJsonToString(value: any): string {
    return JSON.stringify(value);
  }
  // applicantIDTypeOptions
  private convertStringToJson(value: any): any {
    return JSON.parse(value);
  }
}
