import { DestroyRef, Injector } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { OperatorFunction } from "rxjs";

export const cz_takeUntilDestroyed = (_inj: Injector): OperatorFunction<any, any> => 
  takeUntilDestroyed(_inj.get(DestroyRef));