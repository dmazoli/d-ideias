import { Component, OnDestroy, inject, input, output } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';

export type SortBy = 'recent' | 'id' | 'date' | 'updated' | 'votes' | 'dislike';

interface SortOption {
  value: SortBy;
  label: string;
}

@Component({
  selector: 'app-sort-dropdown',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './sort-dropdown.component.html',
  styleUrl: './sort-dropdown.component.css',
})
export class SortDropdownComponent implements OnDestroy {
  private readonly document = inject(DOCUMENT);

  currentSort = input<SortBy>('date');
  sortChanged = output<SortBy>();

  faSortAmountDown = faSortAmountDown;
  faChevronDown = faChevronDown;

  isOpen = false;

  sortOptions: SortOption[] = [
    { value: 'date', label: 'Por data de criação' },
    { value: 'updated', label: 'Por data de atualização' },
    { value: 'votes', label: 'Por votos' },
    { value: 'dislike', label: 'Por dislikes' },
    { value: 'id', label: 'Por ID' },
  ];

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    this.syncBodyClass();
  }

  selectSort(sort: SortBy): void {
    this.sortChanged.emit(sort);
    this.isOpen = false;
    this.syncBodyClass();
  }

  ngOnDestroy(): void {
    this.document.body.classList.remove('sort-dropdown-open');
  }

  private syncBodyClass(): void {
    this.document.body.classList.toggle('sort-dropdown-open', this.isOpen);
  }
}
