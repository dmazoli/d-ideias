import { Component, input, output, computed, type Signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface PaginationMeta {
  count: number;
  page: number;
  pageSize: number;
}

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  meta = input.required<PaginationMeta>();
  pageChanged = output<number>();

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  totalPages: Signal<number> = computed<number>(() => {
    const { count, pageSize } = this.meta();
    return Math.ceil(count / pageSize);
  });

  isPreviousDisabled: Signal<boolean> = computed<boolean>(() => {
    return this.meta().page <= 1;
  });

  isNextDisabled: Signal<boolean> = computed<boolean>(() => {
    return this.meta().page >= this.totalPages();
  });

  constructor() {
    effect(() => {
      this.meta();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  onPreviousPage(): void {
    const currentPage = this.meta().page;
    if (currentPage > 1) {
      this.pageChanged.emit(currentPage - 1);
    }
  }

  onNextPage(): void {
    const currentPage = this.meta().page;
    if (currentPage < this.totalPages()) {
      this.pageChanged.emit(currentPage + 1);
    }
  }
}
