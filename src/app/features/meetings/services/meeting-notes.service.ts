import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Meeting, MeetingAdapter, MeetingFirebaseDTO } from '../models/Meeting';
import {
  DiscussionItem,
  DiscussionItemAdapter,
  DiscussionItemFirebaseDTO,
} from '../models/DiscussionItem';
import {
  FollowUp,
  FollowUpAdapter,
  FollowUpFirebaseDTO,
} from '../models/FollowUp';

@Injectable()
export class MeetingNotesService {
  firestore = inject(Firestore);

  async getMeetingNotes(meeting_id: string | null): Promise<string> {
    if (!meeting_id) {
      throw new Error('Meeting ID is required to get meeting notes');
    }

    const meetingCollection = collection(this.firestore, 'meetings');
    const docRef = doc(meetingCollection, meeting_id);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      return '';
    }

    const meeting = MeetingAdapter.fromFirebaseDto(
      docSnapshot.id,
      docSnapshot.data() as MeetingFirebaseDTO
    );
    return meeting.notes;
  }

  async updateMeetingNotes(
    meeting_id: string | null,
    notes: string
  ): Promise<void> {
    if (!meeting_id) {
      throw new Error('Meeting ID is required to update meeting notes');
    }

    const meetingCollection = collection(this.firestore, 'meetings');
    const docRef = doc(meetingCollection, meeting_id);
    await updateDoc(docRef, { notes });
  }
}
