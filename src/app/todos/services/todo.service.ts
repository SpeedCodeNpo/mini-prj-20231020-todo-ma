import { Injectable, signal } from '@angular/core';
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todoSignal$ = signal<TodoInterface[]>([]);
  filterSignal$ = signal<FilterEnum>(FilterEnum.all);

  addTodo(todoText: string): void {
    const newTodo : TodoInterface = {
      todoText,
      isCompleted: false,
      id: Math.random().toString(16),
    }

    this.todoSignal$.update(todos => [...todos, newTodo]);
  }

  
}
