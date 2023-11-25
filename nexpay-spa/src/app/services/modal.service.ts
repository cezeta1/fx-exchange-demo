import { Component, EventEmitter, Injectable, Type } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root',
})
export class CZModalService {
  constructor(private modalService: NzModalService) {}

  public createModal<T extends Component>(
    compClass: Type<T>,
    onCloseEmitter: EventEmitter<any>
  ): NzModalRef {
    return this.modalService.create({
      nzTitle: 'Create new Contract',
      nzContent: compClass,
      nzAfterClose: onCloseEmitter,
      nzMaskClosable: false,
      nzKeyboard: false,
    });
  }
}
