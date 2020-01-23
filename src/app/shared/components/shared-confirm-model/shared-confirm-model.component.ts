import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shared-confirm-model',
  templateUrl: './shared-confirm-model.component.html',
  styleUrls: ['./shared-confirm-model.component.scss']
})
export class SharedConfirmModelComponent implements OnInit {

  faTimes = faTimes;
  submited = false;
  showEditLoader = false;


  @Input() headerText: string;
  @Input() bodyText: string;
  @Input() isModalOpen: boolean;
  @Input() data:any;
  @Output() confirmed = new EventEmitter();
  @Output() cancled = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  cancle(){
    this.cancled.emit(false);
  }

  confirm(){
    this.confirmed.emit(this.data);
  }

  closeModal(){
    this.cancled.emit(false);
  }

}
