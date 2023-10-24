import { Injectable, signal } from '@angular/core';
import { TodoInterface } from '../types/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todoSignal$ = signal<TodoInterface[]>([]);

  addTodo(todoText: string): void {
    const newTodo : TodoInterface = {
      todoText,
      isCompleted: false,
      id: Math.random().toString(16),
    }

    this.todoSignal$.update(todos => [...todos, newTodo]);
  }
}
