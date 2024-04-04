import * as jalaliMoment from "jalali-moment";
import { Pipe, PipeTransform } from "@angular/core";
import { formatDate } from "@angular/common";

@Pipe({ name: "persianDate", standalone: true })
export class PersianDatePipe implements PipeTransform {
  transform(value: string | null, withTime: boolean = true): any {
    if (value == null) return;
    if (withTime) {
      return jalaliMoment(
        formatDate(value, "yyyy/MM/dd - H:mm", "en-US", "+0330"),
        "YYYY/MM/DD - H:mm"
      ).format("jYYYY/jMM/jDD - H:mm");
    } else {
      return jalaliMoment(
        formatDate(value, "yyyy/MM/dd", "en-US", "+0330"),
        "YYYY/MM/DD"
      ).format("jYYYY/jMM/jDD");
    }
  }
}
