import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'meetingTimeDisplay',
  standalone: true
})
export class MeetingTimeDisplayPipe implements PipeTransform {

  transform({start, end}: {start: Date | null | undefined, end: Date | null | undefined}): string {

    if (!start || !end) {
      return 'No Timeframe Available';
    }

    const date1 = new Date(start);
    const date2 = new Date(end);

    const d1Date = `${date1.getMonth()}/${date1.getDate()}/${date1.getFullYear()}`;
    const d1Time = `${
      date1.getHours() > 12
        ? this.formatHour(date1.getHours() - 12)
        : this.formatHour(date1.getHours())
    }:${this.formatMinute(date1.getMinutes())}`;
    const d1TOD = `${date1.getHours() > 12 ? 'PM' : 'AM'}`;

    const d2Date = `${date2.getMonth()}/${date2.getDate()}/${date2.getFullYear()}`;
    const d2Time = `${
      date2.getHours() > 12
        ? this.formatHour(date2.getHours() - 12)
        : this.formatHour(date2.getHours())
    }:${this.formatMinute(date2.getMinutes())}`;
    const d2TOD = `${date2.getHours() > 12 ? 'PM' : 'AM'}`;

    if (date1.getDate() === date2.getDate()) {
      return `${d1Date} @ ${d1Time} ${d1TOD} - ${d2Time} ${d2TOD}`;
    } else {
      return `${d1Date} @ ${d1Time} ${d1TOD} - ${d2Date} @ ${d2Time} ${d2TOD}`;
    }
  }

  private formatHour(num: number): string {
    const formatted = num < 10 ? `0${num}` : `${num}`;
    return formatted === '00' ? '12' : formatted;
  }

  private formatMinute(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }


}
