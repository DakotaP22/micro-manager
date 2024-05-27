import { Timestamp } from "@angular/fire/firestore";

export type FollowUpStatus = 'Needs Attention' | 'Task Assigned' | 'Work Item Assigened' | 'Meeting Scheduled';

export type FollowUp = {
  id: string;
  details: string;
  requiredByDate?: Date;
  status: FollowUpStatus;
}


export type FollowUpFirebaseDTO = {
  details: string;
  requiredByDate?: Timestamp;
  status: FollowUpStatus;
}

export class FollowUpAdapter {
  static toFirebaseDTO(followUp: FollowUp): FollowUpFirebaseDTO {
    return {
      details: followUp.details,
      requiredByDate: followUp.requiredByDate ? Timestamp.fromDate(followUp.requiredByDate) : undefined,
      status: followUp.status,
    }
  }

  static fromFirebaseDTO(id: string, dto: FollowUpFirebaseDTO): FollowUp {
    return {
      id,
      details: dto.details,
      requiredByDate: dto.requiredByDate ? dto.requiredByDate.toDate() : undefined,
      status: dto.status,
    }
  }
}
