import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { CreateCommentDTO } from '../models/dto/Comment/CreateCommentDTO';
import { ReadCommentDTO } from '../models/dto/Comment/ReadCommentDTO';
import { WorkItemComment } from '../models/WorkItemComment';
import { timestamp } from 'rxjs';

@Injectable({providedIn: 'root'})
export class WorkItemCommentsService {
    firestore = inject(Firestore);
    auth = inject(Auth);

    async createComment(bucketId: string | null, workItemId: string | null, text: string | null) {
        const user = await this.auth.currentUser;

        if (!user || !bucketId || !workItemId || !text) {
            return;
        }

        const commentCollectionRef = collection(
            this.firestore,
            'users',
            user.uid,
            'workbuckets',
            bucketId,
            'workitems',
            workItemId,
            'comments'
        )
        
        const comment: CreateCommentDTO = {
            text,
            timestamp: Timestamp.now()
        }

        console.log('Creating Comment', comment);
        console.log('in', commentCollectionRef.path)

        await addDoc(commentCollectionRef, comment);
    }

    async getComments(bucketId: string | null, workItemId: string | null) {

        const user = await this.auth.currentUser;

        if (!user || !bucketId || !workItemId) {
            return;
        }

        const commentCollectionRef = collection(
            this.firestore,
            'users',
            user.uid,
            'workbuckets',
            bucketId,
            'workitems',
            workItemId,
            'comments'
        )



        const commentDocs = await getDocs(commentCollectionRef);
        

        const comments =  commentDocs.docs.map(comment => {
            const data = comment.data() as ReadCommentDTO;
            return {
                id: comment.id,
                ...data,
                timestamp: data.timestamp.toMillis()
            } as WorkItemComment;
        });

        return comments;
    }
    
}