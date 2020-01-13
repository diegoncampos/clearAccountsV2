import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import { DomController } from '@ionic/angular';


@Directive({
  selector: '[appHideFab]'
})
export class HideFabDirective {

  @Input("appHideFab") scrollArea;
  @Input('fab') fab;
  private fabToHide;
  private storedScroll: number = 0;
  private threshold: number = 5;


  constructor(
    private renderer: Renderer,
    public element:ElementRef
    ) { }

  ngAfterViewInit() {
    this.fabToHide = this.element.nativeElement.getElementsByClassName("ion-fab")[0];

    this.scrollArea.ionScroll.subscribe(scrollEvent => {
      if (scrollEvent.detail.scrollTop - this.storedScroll > this.threshold) {
          this.fab.el.hidden = true;
      } else if (scrollEvent.detail.scrollTop - this.storedScroll < 0) {
        this.fab.el.hidden = false;
      }
      this.storedScroll = scrollEvent.detail.scrollTop;
    });
  }


}
