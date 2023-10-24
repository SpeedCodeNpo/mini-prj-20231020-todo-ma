import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from '../../todos.component';
import { TodosService } from '../../services/todo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  todosService = inject(TodosService);
  inputText: string = '';

  constructor(){
  }

  modifyTodoText(inputValue: string){
    this.inputText = inputValue;
    //console.log(this.inputText);
  }

  submitTodo(){
    this.todosService.addTodo(this.inputText);
    this.inputText = '';
    console.log(this.todosService.todoSignal$());
  }

}
