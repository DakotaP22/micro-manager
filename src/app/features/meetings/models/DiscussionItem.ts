export type DiscussionItem = {
  id: string;
  title: string;
  discussed: boolean;
}

export type DiscussionItemFirebaseDTO = {
  title: string;
  discussed: boolean;
}

export class DiscussionItemAdapter {
  static toFirebaseDto(
    discussionItem: DiscussionItem
  ): DiscussionItemFirebaseDTO {
    return {
      title: discussionItem.title,
      discussed: discussionItem.discussed,
    };
  }

  static fromFirebaseDto(
    id: string,
    dto: DiscussionItemFirebaseDTO
  ): DiscussionItem {
    return {
      id,
      title: dto.title,
      discussed: dto.discussed,
    };
  }
}
