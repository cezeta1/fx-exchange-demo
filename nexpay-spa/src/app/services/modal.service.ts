import {
  Component,
  ComponentRef,
  Injectable,
  TemplateRef,
  Type,
} from '@angular/core';
import { NzModalRef, NzModalService, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalService: NzModalService) {}

  // public createModal<T>(comp: T): void {
  //   const modal = this.modalService.create<T, IModalData>({
  //     nzTitle: 'Modal Title',
  //     nzContent: Type<T>,
  //     nzViewContainerRef: this.viewContainerRef,
  //     nzData: {
  //       favoriteLibrary: 'angular',
  //       favoriteFramework: 'angular',
  //     },
  //     nzOnOk: () => new Promise((resolve) => setTimeout(resolve, 1000)),
  //     nzFooter: [
  //       {
  //         label: 'change component title from outside',
  //         onClick: (componentInstance) => {
  //           componentInstance!.title = 'title in inner component is changed';
  //         },
  //       },
  //     ],
  //   });
  //   const instance = modal.getContentComponent();
  //   modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
  //   // Return a result when closed
  //   modal.afterClose.subscribe((result) =>
  //     console.log('[afterClose] The result is:', result)
  //   );

  //   // delay until modal instance created
  //   setTimeout(() => {
  //     instance.subtitle = 'sub title is changed';
  //   }, 2000);
  // }
}
