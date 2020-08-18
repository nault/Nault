import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "rai",
})
export class RaiPipe implements PipeTransform {
  precision = 6;

  mrai = 1000000000000000000000000000000;
  krai = 1000000000000000000000000000;
  rai = 1000000000000000000000000;
  banano = 100000000000000000000000000000;
  banoshi = 1000000000000000000000000000;
  raw = 1;

  transform(value: any, args?: any): any {
    const opts = args.split(",");
    const denomination = opts[0] || "mrai";
    const hideText = opts[1] || false;

    switch (denomination.toLowerCase()) {
      default:
      case "banano":
        if ((value / this.banoshi) % 1) {
          const newVal = value / this.banano < 0.01 ? 0 : value / this.banano; // New more precise toFixed function, but bugs on huge raw numbers
          return `${this.toFixed(newVal, this.precision)}${
            !hideText ? " BANANO" : ""
          }`;
        } else {
          return `${(value / this.banano).toFixed(2)}${
            !hideText ? " BANANO" : ""
          }`;
        }
      case "banoshi":
        return `${(value / this.banoshi).toFixed(0)}${
          !hideText ? " banoshi" : ""
        }`;
      case "xrb":
        return `${(value / this.mrai).toFixed(6)}${!hideText ? " NANO" : ""}`;
      case "mnano":
        const hasRawValue = (value / this.rai) % 1;
        if (hasRawValue) {
          // New more precise toFixed function, but bugs on huge raw numbers
          const newVal = value / this.mrai < 0.000001 ? 0 : value / this.mrai;
          return `${this.toFixed(newVal, this.precision)}${
            !hideText ? " NANO" : ""
          }`;
        } else {
          return `${(value / this.mrai).toFixed(6)}${!hideText ? " NANO" : ""}`;
        }
      case "knano":
        return `${(value / this.krai).toFixed(3)}${!hideText ? " knano" : ""}`;
      case "nano":
        return `${(value / this.rai).toFixed(0)}${!hideText ? " nano" : ""}`;
      case "raw":
        return `${value}${!hideText ? " raw" : ""}`;
      case "dynamic":
        const rai = value / this.rai;
        if (rai >= 1000000) {
          return `${(value / this.mrai).toFixed(this.precision)}${
            !hideText ? " mRai" : ""
          }`;
        } else if (rai >= 1000) {
          return `${(value / this.krai).toFixed(this.precision)}${
            !hideText ? " kRai" : ""
          }`;
        } else if (rai >= 0.00001) {
          return `${(value / this.rai).toFixed(this.precision)}${
            !hideText ? " Rai" : ""
          }`;
        } else if (rai === 0) {
          return `${value}${!hideText ? " mRai" : ""}`;
        }
        if (rai >= 1000000) {
          return `${(value / this.banano).toFixed(this.precision)}${
            !hideText ? " mRai" : ""
          }`;
        } else if (rai >= 1000) {
          return `${(value / this.banoshi).toFixed(this.precision)}${
            !hideText ? " kRai" : ""
          }`;
        } else if (rai >= 0.00001) {
          return `${(value / this.raw).toFixed(this.precision)}${
            !hideText ? " Rai" : ""
          }`;
        } else if (rai === 0) {
          return `${value}${!hideText ? " mRai" : ""}`;
        } else {
          return `${value}${!hideText ? " raw" : ""}`;
        }
    }
  }

  toFixed(num, fixed) {
    if (isNaN(num)) {
      return 0;
    }
    const re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
    return num.toString().match(re)[0];
  }
}
