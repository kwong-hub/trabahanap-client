import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-submit-button',
  templateUrl: './custom-submit-button.component.html',
  styleUrls: ['./custom-submit-button.component.scss']
})
export class CustomSubmitButtonComponent implements OnInit {

  @Input() text: string = 'Save'
  @Input() styleObject: {'btn': {}};
  @Input() loading: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}
