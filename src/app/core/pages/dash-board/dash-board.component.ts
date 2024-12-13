import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [VirtualScrollerModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  items: string[] = [];
  totalRecords: number = 1000;

  ngOnInit(): void {
    this.loadInitialItems();
  }

  loadInitialItems(): void {
    this.items = Array.from({ length: 20 }).map((_, i) => `Item #${i}`);
  }

  loadItems(event: any): void {
    // التحقق من أن الحدث يحتوي على الخصائص المطلوبة
    if (event && event.first !== undefined && event.rows !== undefined) {
      const newItems = Array.from({ length: event.rows }).map(
        (_, i) => `Item #${event.first + i}`
      );
      this.items = [...this.items, ...newItems];
    } else {
      console.error('Invalid event data:', event);
    }
  }
}
