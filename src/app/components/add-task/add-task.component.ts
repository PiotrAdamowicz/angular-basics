import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../Task';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  showAddTask!: boolean;
  subscription!: Subscription;
  addFrom = {
    text: '',
    day: '',
    reminder: false,
  };

  constructor(private usService: UiService) {
    this.subscription = this.usService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  onSubmit() {
    if (!this.addFrom.text) {
      alert('Please add task!');
      return;
    }
    const newTask = {
      text: this.addFrom.text,
      day: this.addFrom.day,
      reminder: this.addFrom.reminder,
    };

    this.onAddTask.emit(newTask);

    this.addFrom.text = '';
    this.addFrom.day = '';
    this.addFrom.reminder = false;
  }
}
