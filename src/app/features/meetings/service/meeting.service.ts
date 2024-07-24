import { Injectable, inject } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Meeting, MeetingAdapter, MeetingFirebaseDTO } from '../models/Meeting';

@Injectable()
export class MeetingService {
  firestore = inject(Firestore)

  async getMeetingsForUserAndWorkbucketId(
    user_id: string | null,
    workbucket_id: string | null
  ): Promise<any> {
    if (!user_id || !workbucket_id) {
      return [];
    }


    const meetingCollection = collection(this.firestore, 'meetings');
    const q = query(meetingCollection, where('user_id', '==', user_id), where('workbucket_id', '==', workbucket_id));
    const meetingDocs = await getDocs(q);

    const meetings = meetingDocs.docs.map(
      doc => MeetingAdapter.fromFirebaseDto(doc.id, doc.data() as MeetingFirebaseDTO)
    );


    return meetings;
  }

  async getMeeting(meeting_id: string | null): Promise<Meeting | null> {
    if (!meeting_id) {
      return null;
    }

    const meetingCollection = collection(this.firestore, 'meetings');
    const docRef = doc(meetingCollection, meeting_id);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      return null;
    }

    const meeting = MeetingAdapter.fromFirebaseDto(docSnapshot.id, docSnapshot.data() as MeetingFirebaseDTO);
    return meeting;
  }

  async createMeetingForUserAndWorkbucketId(
    user_id: string | null,
    workbucket_id: string | null,
    title: string,
    startDate: Date,
    endDate: Date,
  ): Promise<any> {
    if (!user_id || !workbucket_id) {
      return;
    }

    const newMeeting: MeetingFirebaseDTO = {
      title,
      workbucket_id,
      user_id,
      start_time: Timestamp.fromDate(startDate),
      end_time: Timestamp.fromDate(endDate),
      notes: '',
    };

    const meetingCollection = collection(this.firestore, 'meetings');
    await addDoc(meetingCollection, newMeeting);
  }

  async updateMeetingNotes(meeting_id: string, notes: string): Promise<void> {
    const meetingCollection = collection(this.firestore, 'meetings');
    const docRef = doc(meetingCollection, meeting_id);
    await updateDoc(docRef, { notes });
  }
}
