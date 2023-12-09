import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'applicant-id-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applicant-id-type.component.html',
  styleUrl: './applicant-id-type.component.scss',
})
export class ApplicantIdTypeComponent {
  @Input({ required: true }) public isDisabled: boolean=false;
  @Input({ required: true }) public options: Array<string> = [];
  @Input({ required: true }) public selected: Array<string> = [];

  @Output() public selectedItemEmit: EventEmitter<Array<string>> =
    new EventEmitter<Array<string>>();

  private selectedItemList: Array<string> = [];

  public onItemSelect(data: any) {
    if(this.isDisabled) return;
    if(this.selected?.includes(data)){
      this.selectedItemList =this.selectedItemList?.filter(el=>el!=data);
    }else {
      this.selectedItemList.push(data);
      if (this.selectedItemList?.length > 2){
        this.selectedItemList.shift();
      }
    }

    this.selectedItemEmit.emit(this.selectedItemList);
  }
}
