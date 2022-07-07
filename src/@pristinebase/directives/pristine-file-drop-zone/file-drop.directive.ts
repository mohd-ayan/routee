import {
  Output,
  Directive,
  HostBinding,
  HostListener,
  EventEmitter,
} from '@angular/core';

const hasDragNDrop: boolean = (function() {
  const div = document.createElement('div');
  return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
})();

@Directive({
  /* tslint:disable:directive-selector */
  selector: '[file-drop]',
})
export class FileDropDirective {
  @Output()
  public files: EventEmitter<FileList> = new EventEmitter();

  @HostBinding('class.has-drag-n-drop')
  public hasDragNDrop: boolean;
  
  @HostBinding('class.is-over')
  public isOver: boolean;
  
  constructor() {
    this.hasDragNDrop = hasDragNDrop;
  }

  @HostListener('drop', ['$event'])
  public handleDrop(event: DragEvent) {
    this.handleDrag(event);

    this.files.emit(event.dataTransfer.files);
  }

  @HostListener('drag', ['$event'])
  @HostListener('dragstart', ['$event'])
  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  @HostListener('dragleave', ['$event'])
  @HostListener('dragend', ['$event'])
  public handleDrag(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();

    this.isOver = ['dragenter', 'dragover'].indexOf(event.type) >= 0;
  }
}
