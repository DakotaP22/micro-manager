import { Timestamp } from "@angular/fire/firestore";

export type FollowUpStatus = 'Needs Attention' | 'Task Assigned' | 'Work Item Assigened' | 'Meeting Scheduled';

export type FollowUp = {
  id: string;
  details: string;
  workItemReference?: string;
}


export type FollowUpFirebaseDTO = {
  details: string;
  workItemReference?: string;
};

export class FollowUpAdapter {
  static toFirebaseDTO(followUp: FollowUp): FollowUpFirebaseDTO {
    return {
      details: followUp.details,
      workItemReference: followUp.workItemReference,
    }
  }

  static fromFirebaseDTO(id: string, dto: FollowUpFirebaseDTO): FollowUp {
    return {
      id,
      details: dto.details,
      workItemReference: dto.workItemReference,
    }
  }
}
