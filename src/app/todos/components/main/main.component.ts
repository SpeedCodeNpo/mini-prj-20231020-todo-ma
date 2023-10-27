import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../services/todo.service';
import { FilterEnum } from '../../types/filter.enum';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, TodoComponent],
  templateUrl: './main.component.html',
})
export class MainComponent {
  todosService = inject(TodosService);
  editingId: string | null = null;

  visibleTodos = computed( () => {
    const todos = this.todosService.todoSignal$();
    const filter = this.todosService.filterSignal$();

    if (filter === FilterEnum.active) {
      return todos.filter( todoItem => !todoItem.isCompleted)
    }
    if (filter === FilterEnum.completed) {
      return todos.filter( todoItem => todoItem.isCompleted)
    }
    return todos;
  });

  setEditingId(editingIdFromTemplate: string | null):void{
    this.editingId = editingIdFromTemplate;
  }

}
