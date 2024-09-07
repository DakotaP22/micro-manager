import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs
} from '@angular/fire/firestore';
import {
  FollowUp,
  FollowUpAdapter,
  FollowUpFirebaseDTO,
} from '../models/FollowUp';

@Injectable()
export class MeetingFollowUpsService {
  firestore = inject(Firestore);

  async getFollowUpItems(meeting_id: string | null): Promise<FollowUp[]> {
    if (!meeting_id) {
      return [];
    }

    const meetingCollection = collection(
      this.firestore,
      'meetings',
      meeting_id,
      'follow-ups'
    );
    const followUpDocs = await getDocs(meetingCollection);

    if (followUpDocs.empty) {
      return [];
    } else {
      return followUpDocs.docs.map((doc) =>
        FollowUpAdapter.fromFirebaseDTO(
          doc.id,
          doc.data() as FollowUpFirebaseDTO
        )
      );
    }
  }

  async createFollowUpItem(
    meeting_id: string | null,
    details: string
  ): Promise<void> {
    if (!meeting_id) {
      throw new Error('Meeting ID is required to create a follow up item');
    }

    const newFollowUpItem: FollowUpFirebaseDTO = {
      details,
    };

    const meetingCollection = collection(
      this.firestore,
      'meetings',
      meeting_id,
      'follow-ups'
    );
    await addDoc(meetingCollection, newFollowUpItem);
  }

  async deleteFollowUpItem(
    meeting_id: string | null,
    follow_up_id: string | null
  ): Promise<void> {
    if (!meeting_id) {
      throw new Error('Meeting ID is required to delete a follow up item');
    } else if (!follow_up_id) {
      throw new Error('Follow Up ID is required to delete a follow up item');
    }

    const meetingCollection = collection(
      this.firestore,
      'meetings',
      meeting_id,
      'follow-ups'
    );
    const docRef = doc(meetingCollection, follow_up_id);
    await deleteDoc(docRef);
  }
}
