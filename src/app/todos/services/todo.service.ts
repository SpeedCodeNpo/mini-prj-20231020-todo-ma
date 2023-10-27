import { Injectable, signal } from '@angular/core';
import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todoSignal$ = signal<TodoInterface[]>([]);
  filterSignal$ = signal<FilterEnum>(FilterEnum.all);

  addTodo(todoText: string): void {
    const newTodo: TodoInterface = {
      todoText,
      isCompleted: false,
      id: Math.random().toString(16),
    };

    this.todoSignal$.update((todos) => [...todos, newTodo]);
  }

  changeFilterSvc(newFilter: FilterEnum): void {
    this.filterSignal$.set(newFilter);
  }

  modifyTodo(id: string, inputText: string): void {
    //* There are two options to update the value of the 'todoText' in a TodoInterface object
    //*
    //* === Method 1 ===
    //* This is a shorter method but less readable
    //* It uses the { ...todoObj, todoText } syntax to substitute the todoText property of a  TodoInterface object
    //* the way it does that is that it must have the name of the property 'todoText' and have that
    //* property with the alue we get in this modifyTodo() function.
    //* But since the name of our input argument is inputText then we need to create a const todoText and pass the 
    //* inputText's value into todoText.
    //* So this is a shorter code but is less straight forward (more like magic code with behind the scenes logic)

    // const todoText = inputText; //todoText is a prop of a todo interface object
    // this.todoSignal$.update(
    //   (todos) =>
    //     todos.map((todoObj) =>
    //       (todoObj.id === id ? { ...todoObj, todoText } : todoObj)
    //     ) //map
    // );

    //* === Method 2 ===
    //* This is a more straight forward solution, no "behind the scenes magic"
    //* It is self explantory and comments are included inside
    this.todoSignal$.update(
      (todos) =>
        todos.map((todoObj) => {
          if (todoObj.id === id) {
            // Copy the todoObj object int newTodoObj
            const newTodoObj = { ...todoObj };

            // Modify the newTodoObj by changing the value of its todoText property
            newTodoObj.todoText = inputText;

            // Return the modified newTodoObj object
            return newTodoObj;
          } else {
            return todoObj;
          }
        }) //map
    );
  } // modifyTodo

  removeTodo(id: string): void{
    this.todoSignal$.update( (todos) => todos.filter ( (todo) => todo.id !== id));
  }
}
