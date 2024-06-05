import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-parent',
    standalone: true,
    templateUrl: './parent.component.html',
    styleUrl: './parent.component.css',
    imports: [ChildComponent,NgIf]
})
export class ParentComponent {

  parentMessage: string = "Hello from Parent Component!";
  childMessage !: string;

  receiveMessage(event: string) {
    console.log("Parent Component: Message From Child, ", event);
    console.log("Output() is working now.")
    this.childMessage = event;
  }
}
