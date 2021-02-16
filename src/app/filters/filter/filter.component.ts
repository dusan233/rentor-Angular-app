import { AfterViewInit, EventEmitter, Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit,  OnDestroy, AfterViewInit {
  @Input() filterName: string;
  @Output() filterClosed = new EventEmitter();
  showFilter: boolean = true;
  @ViewChild('fic') filterContentEl :ElementRef<HTMLDivElement>;
  @ViewChild('fib') filterBtn: ElementRef<HTMLDivElement>;

  constructor() { }

  onToggleFilterContent() {
    if(this.filterContentEl.nativeElement.style.display === 'block') {
      this.filterContentEl.nativeElement.style.display = 'none';
      this.filterClosed.emit();
    }else {
      this.filterContentEl.nativeElement.style.display = 'block';
    }
  }
  onWindowClick = (e: MouseEvent) => {
    if(!this.filterContentEl.nativeElement.contains((e.target as HTMLElement)) && this.filterBtn.nativeElement !== (e.target as HTMLElement) && this.filterContentEl.nativeElement.style.display === 'block') {
      this.filterContentEl.nativeElement.style.display = 'none';
      this.filterClosed.emit();
    }
  }
  

  ngAfterViewInit() {
    
    window.addEventListener('click', this.onWindowClick)
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    window.removeEventListener('click', this.onWindowClick)
  }
}
