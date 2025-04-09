// Angular
import { Component, EventEmitter, inject, Injectable, Type } from '@angular/core';
// NgZorro
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Injectable({ providedIn: 'root' })
export class CZModalService {

  private modalService = inject(NzModalService);

  public createModal = <T extends Component>(
    compClass: Type<T>,
    onCloseEmitter: EventEmitter<any>
  ): NzModalRef =>
    this.modalService.create({
      nzTitle: 'Create new Contract',
      nzContent: compClass,
      nzAfterClose: onCloseEmitter,
      nzMaskClosable: false,
      nzKeyboard: false,
    });
}
