import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-custom-overlay',
  templateUrl: './custom-overlay.component.html',
  styleUrls: ['./custom-overlay.component.scss']
})
export class CustomOverlayComponent implements OnInit {

  @Input() show: boolean;
  @Output() closeEvent = new EventEmitter();
  faTimes = faTimes;

  constructor() { }

  ngOnInit() {
  }

  hideOverlay() {
    this.closeEvent.emit();
  }

}
