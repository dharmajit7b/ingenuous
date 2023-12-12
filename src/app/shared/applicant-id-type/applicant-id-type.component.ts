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
    // @Input decorator is used to define input properties for the component
  @Input({ required: true }) public isDisabled: boolean=false;
  @Input({ required: true }) public options: Array<string> = [];
  @Input({ required: true }) public selected: Array<string> = [];

  // @Output decorator is used to define output properties for the component
  @Output() public selectedItemEmit: EventEmitter<Array<string>> =
    new EventEmitter<Array<string>>();

  // Private property to track selected items internally in the component
  private selectedItemList: Array<string> = [];

  // Method triggered when an item is selected
  public onItemSelect(data: any) {
    // If the component is disabled, do nothing
    if (this.isDisabled) return;

    // Toggle selection: If the selected items include the current item, remove it; otherwise, add it
    if (this.selected?.includes(data)) {
      this.selectedItemList = this.selectedItemList?.filter(el => el != data);
    } else {
      this.selectedItemList.push(data);

      // Ensure that only the last two selected items are kept
      if (this.selectedItemList?.length > 2) {
        this.selectedItemList.shift();
      }
    }

    // Emit the updated list of selected items using the output EventEmitter
    this.selectedItemEmit.emit(this.selectedItemList);
  }
}