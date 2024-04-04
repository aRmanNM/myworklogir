import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "duration",
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(value: string): string {
    const duration = moment.duration(value);
    return (
      duration.hours().toString().padStart(2, "0") +
      ":" +
      duration.minutes().toString().padStart(2, "0") +
      ":" +
      duration.seconds().toString().padStart(2, "0")
    );
  }
}
