import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'landing-custom-submit',
  templateUrl: './landing-custom-submit.component.html',
  styleUrls: ['./landing-custom-submit.component.scss']
})
export class LandingCustomSubmitComponent implements OnInit {

  @Input() text: string = "Save";
  @Input() styleObject: { btn: {} };
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}
