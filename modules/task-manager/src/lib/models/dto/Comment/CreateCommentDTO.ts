import { Timestamp } from "@angular/fire/firestore";

export type CreateCommentDTO = {
    timestamp: Timestamp;
    text: string;
}