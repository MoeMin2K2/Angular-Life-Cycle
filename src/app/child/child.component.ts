import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent implements OnInit, OnChanges, OnDestroy{
  @Input() messageFromParent !: string;
  @Output() messageToParent = new EventEmitter<string>();

  childMessage: string = "Hello from Child Component!";
  constructor() {
    console.log('Child Component: Constructor is called.');
  }

  ngOnInit(): void {
    console.log('Child Component: ngOnInit method is called.');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Child Component: ngOnChanges method is called.');   
    console.log("Changes: ", changes);
  }

  ngOnDestroy(): void {
    console.log('Child Component: ngOnDestroy method is called.');
  }

  sendMessageToParent() {
    console.log("Child Component: sendMessageToParent method is called.")
    this.messageFromParent = "Hello from Parent Component in ngOnChanges!";
    this.messageToParent.emit(this.childMessage);
  }
}
