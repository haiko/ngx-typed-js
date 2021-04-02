import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import Typed, {TypedOptions} from 'typed.js';

@Component({
  selector: 'ngx-typed-js',
  templateUrl: 'ngx-typed-js.component.html',
  styleUrls: ['ngx-typed-js.component.css']
})
export class NgxTypedJsComponent implements AfterViewInit {

  private _strings?: string[];

  @Input()
  get strings(): string[] { return this._strings; }
  set strings(strings: string[]) { this._strings = strings; }


  @Input()  cursorColor?: string;
  @Input()   stringsElement?: string;
  @Input()   typeSpeed?: number;
  @Input()   startDelay?: number;
  @Input()   backSpeed?: number;
  @Input()   smartBackspace?: boolean;
  @Input()   shuffle?: boolean;
  @Input()   backDelay?: number;
  @Input()   fadeOut?: boolean;
  @Input()   fadeOutClass?: string;
  @Input()   fadeOutDelay?: boolean;
  @Input()   loop?: boolean;
  @Input()   loopCount?: number;
  @Input()   showCursor?: boolean;
  @Input()   cursorChar?: string;
  @Input()   autoInsertCss?: boolean;
  @Input()   attr?: string;
  @Input()   bindInputFocusEvents?: boolean;
  @Input()   contentType?: string;

  @Output()   completed: EventEmitter<void> = new EventEmitter<void>();
  @Output()   preStringTyped: EventEmitter<number> = new EventEmitter<number>();
  @Output()   stringTyped: EventEmitter<number> = new EventEmitter<number>();
  @Output()   lastStringBackspaced: EventEmitter<void> = new EventEmitter<void>();
  @Output()   typingPaused: EventEmitter<number> = new EventEmitter<number>();
  @Output()   typingResumed: EventEmitter<number> = new EventEmitter<number>();
  @Output()   reset: EventEmitter<void> = new EventEmitter<void>();
  @Output()   stopped: EventEmitter<number> = new EventEmitter<number>();
  @Output()   started: EventEmitter<number> = new EventEmitter<number>();
  @Output()   destroyed: EventEmitter<void> = new EventEmitter<void>();

    typed: Typed;
  @ViewChild('wrapper')   content;

  ngAfterViewInit(): void {
    this.typed = new Typed(
      this.content.nativeElement.querySelector('.typing'),
      this.options,
    );

    if (this.showCursor !== false) {
      this.updateCursorStyle();
    }
  }

  public toggle(): void {
    this.typed.toggle();
  }

  public stop(): void {
    this.typed.stop();
  }

  public start(): void {
    this.typed.start();
  }

  public destroy(): void {
    this.typed.destroy();
  }

  public doReset(restart?: boolean): void {
    this.typed.reset(restart);
  }

    get options(): TypedOptions {
    const emit: (emitter: EventEmitter<void>) => (self: Typed) => void
      = (emitter: EventEmitter<void>) => () => emitter.emit();

    const emitIndex: (emitter: EventEmitter<number>) => (index: number, self: Typed) => void
      = (emitter: EventEmitter<number>) => (index: number) => emitter.emit(index);

    const opts = {
      strings: this._strings,
      stringsElement: this.stringsElement,
      typeSpeed: this.typeSpeed,
      startDelay: this.startDelay,
      backSpeed: this.backSpeed,
      smartBackspace: this.smartBackspace,
      shuffle: this.shuffle,
      backDelay: this.backDelay,
      fadeOut: this.fadeOut,
      fadeOutClass: this.fadeOutClass,
      fadeOutDelay: this.fadeOutDelay,
      loop: this.loop,
      loopCount: this.loopCount,
      showCursor: this.showCursor,
      autoInsertCss: this.autoInsertCss,
      attr: this.attr,
      bindInputFocusEvents: this.bindInputFocusEvents,
      contentType: this.contentType,
      onComplete: emit(this.completed),
      preStringTyped: emitIndex(this.preStringTyped),
      onStringTyped: emitIndex(this.stringTyped),
      onLastStringBackspaced: emit(this.lastStringBackspaced),
      onTypingPaused: emitIndex(this.typingPaused),
      onTypingResumed: emitIndex(this.typingResumed),
      onReset: emit(this.reset),
      onStop: emitIndex(this.stopped),
      onStart: emitIndex(this.started),
      onDestroy: emit(this.destroyed),
    } as TypedOptions;

    Object.keys(opts).forEach(key => {
      if (opts[key] === undefined) {
        delete opts[key];
      }
    });

    return opts;
  }

    updateCursorStyle(): void {
    const textElementStyle = getComputedStyle(this.content.nativeElement.querySelector('.typing'));
    const cursorElementStyle = this.content.nativeElement.querySelector('.typed-cursor').style;

    cursorElementStyle.fontSize = textElementStyle.fontSize;
    cursorElementStyle.color = this.cursorColor || textElementStyle.color;
  }
}
