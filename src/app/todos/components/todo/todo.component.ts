import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoInterface } from '../../types/todo.interface';
import { TodosService } from '../../services/todo.service';

@Component({
  selector: 'app-todos-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
})
// export class TodoComponent implements OnInit, OnChanges {
export class TodoComponent implements OnInit, OnChanges {

  @Input({required: true}) todoObject!: TodoInterface;
  @Input({required: true}) isEditingTodo!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();

  @ViewChild('todoTextInput') todoTextInput?: ElementRef;

  editingText: string = '';
  todosService = inject(TodosService);

  ngOnInit(){
    this.editingText = this.todoObject.todoText;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditingTodo'].currentValue){
      setTimeout( () => {
        this.todoTextInput?.nativeElement.focus();
      } , 0);
    }
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

  deleteTodo(){
    this.todosService.removeTodo(this.todoObject.id);
  }

  toggleTodo(){
    this.todosService.toggleTodoSvc(this.todoObject.id);
  }
}
