import { Component, inject } from '@angular/core';
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

  changeFilter(event: Event, filterName: FilterEnum ): void {
    event.preventDefault();
    this.todosService.changeFilterSvc(filterName);
  }
}
