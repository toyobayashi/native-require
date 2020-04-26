export declare interface RequireFunction {
  (id: string): any;
  [key: string]: any;
}

export declare const nativeRequire: RequireFunction | undefined

export as namespace nr
