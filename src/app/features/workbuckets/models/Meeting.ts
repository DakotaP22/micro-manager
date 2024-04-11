import { Timestamp } from '@angular/fire/firestore';

export class Meeting  {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  notes: string;

  constructor(id: string, dto: MeetingFirebaseDTO) {
    this.id = id;
    this.title = dto.title;
    this.startTime = dto.start_time.toDate();
    this.endTime = dto.end_time.toDate();
    this.notes = dto.notes;
  }
}

export type MeetingFirebaseDTO = {
  title: string
  start_time: Timestamp,
  end_time: Timestamp,
  notes: string,
  workbuckt_id: string,
  workbucket_ref: string
}
