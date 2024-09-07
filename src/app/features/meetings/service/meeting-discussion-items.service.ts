import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc
} from '@angular/fire/firestore';
import {
  DiscussionItem,
  DiscussionItemAdapter,
  DiscussionItemFirebaseDTO,
} from '../models/DiscussionItem';

@Injectable()
export class MeetingDiscussionItemsService {
  firestore = inject(Firestore);

  async getDiscussionItems(
    meeting_id: string | null
  ): Promise<DiscussionItem[]> {
    if (!meeting_id) {
      return [];
    }

    const meetingCollection = collection(
      this.firestore,
      'meetings',
      meeting_id,
      'discussion_items'
    );
    const discussionItemDocs = await getDocs(meetingCollection);

    if (discussionItemDocs.empty) {
      return [];
    } else {
      return discussionItemDocs.docs.map((doc) =>
        DiscussionItemAdapter.fromFirebaseDto(
          doc.id,
          doc.data() as DiscussionItemFirebaseDTO
        )
      );
    }
  }

  async createDiscussionItem(
    meeting_id: string | null,
    title: string
  ): Promise<void> {
    if (!meeting_id) {
      throw new Error('Meeting ID is required to create a discussion item');
    }

    const newDiscussionItem: DiscussionItemFirebaseDTO = {
      title,
      discussed: false,
    };

    const meetingCollection = collection(
      this.firestore,
      'meetings',
      meeting_id,
      'discussion_items'
    );
    await addDoc(meetingCollection, newDiscussionItem);
  }

  async updateDiscussionItem(
    meeting_id: string | null,
    discussion_item_id: string | null,
    discussed: boolean
  ): Promise<void> {
    if (!meeting_id) {
      throw new Error('Meeting ID is required to update a discussion item');
    } else if (!discussion_item_id) {
      throw new Error(
        'Discussion Item ID is required to update a discussion item'
      );
    }

    const meetingCollection = collection(
      this.firestore,
      'meetings',
      meeting_id,
      'discussion_items'
    );
    const docRef = doc(meetingCollection, discussion_item_id);
    await updateDoc(docRef, { discussed });
  }
}
