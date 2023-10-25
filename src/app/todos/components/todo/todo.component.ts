import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoInterface } from '../../types/todo.interface';

@Component({
  selector: 'app-todos-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  @Input({required: true}) todoObject!: TodoInterface;
}
