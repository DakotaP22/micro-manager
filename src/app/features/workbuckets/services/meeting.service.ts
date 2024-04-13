import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Meeting, MeetingFirebaseDTO } from '../models/Meeting';

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
      doc => new Meeting(doc.id, doc.data() as MeetingFirebaseDTO)
    );


    return meetings;
  }
}
