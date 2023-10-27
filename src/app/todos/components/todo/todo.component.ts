import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoInterface } from '../../types/todo.interface';
import { TodosService } from '../../services/todo.service';

@Component({
  selector: 'app-todos-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  @Input({required: true}) todoObject!: TodoInterface;
  @Input({required: true}) isEditingTodo!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();

  editingText: string = '';
  todosService = inject(TodosService);

  ngOnInit(){
    this.editingText = this.todoObject.todoText;
  }

  changeText(event: Event){
    const valueFromEdit = (event.target as HTMLInputElement).value;
    this.editingText = valueFromEdit;
  }

  submitTodo(){
    this.todosService.modifyTodo(this.todoObject.id, this.editingText);
    this.setEditingId.emit(null);
  }

  setTodoInEditMode(): void{
    this.setEditingId.emit(this.todoObject.id);
  }
}
