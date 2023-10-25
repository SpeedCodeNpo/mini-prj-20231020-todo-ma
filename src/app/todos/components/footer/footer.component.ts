import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../services/todo.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  todosService = inject(TodosService);
  filterSignalFooter = this.todosService.filterSignal$;
  filterEnum = FilterEnum;
  activeCount = computed( () => {
    return this.todosService.todoSignal$().filter( todoItem => !todoItem.isCompleted).length;
  });

  isHideFooter = computed( () => this.todosService.todoSignal$().length === 0);
  itemsLeftText = computed( () => `item${ this.activeCount() !== 1 ? "s" : "" } left`);

  changeFilter(event: Event, filterName: FilterEnum ): void {
    event.preventDefault();
    this.todosService.changeFilterSvc(filterName);
  }
}
