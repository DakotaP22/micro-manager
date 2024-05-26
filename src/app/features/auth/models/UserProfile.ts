export type UserProfile = {
  id: string;
  username: string;
  email: string;
  defaultWorkbucketId: string;
};

export type UserProfileFirebaseDTO = {
  username: string;
  email: string;
  default_workbucket_id: string;
  access_token: string;
}

export class UserProfileAdapter {
  static toFirebaseDto(userProfile: UserProfile, access_token: string): UserProfileFirebaseDTO {
    return {
      username: userProfile.username,
      email: userProfile.email,
      default_workbucket_id: userProfile.defaultWorkbucketId,
      access_token
    }
  }

  static fromFirebaseDto(id: string, dto: UserProfileFirebaseDTO): UserProfile {
    return {
      id,
      username: dto.username,
      email: dto.email,
      defaultWorkbucketId: dto.default_workbucket_id
    }
  }
}

