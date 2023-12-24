import { Timestamp } from "@angular/fire/firestore";

export type ReadCommentDTO = {
    timestamp: Timestamp;
    text: string;
}