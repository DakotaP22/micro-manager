import { Timestamp } from '@angular/fire/firestore';

export type Meeting = {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  notes: string;
  workbucket_id: string;
}

export type MeetingFirebaseDTO = {
  title: string
  start_time: Timestamp,
  end_time: Timestamp,
  notes: string,
  workbucket_id: string,
  user_id: string
}

export class MeetingAdapter {
  static toFirebaseDto(meeting: Meeting, user_id: string): MeetingFirebaseDTO {
    return {
      title: meeting.title,
      start_time: Timestamp.fromDate(meeting.startTime),
      end_time: Timestamp.fromDate(meeting.endTime),
      notes: meeting.notes,
      workbucket_id: meeting.workbucket_id,
      user_id
    }
  }

  static fromFirebaseDto(id: string, dto: MeetingFirebaseDTO): Meeting {
    return {
      id,
      title: dto.title,
      startTime: dto.start_time.toDate(),
      endTime: dto.end_time.toDate(),
      notes: dto.notes,
      workbucket_id: dto.workbucket_id,
    }
  }
}
