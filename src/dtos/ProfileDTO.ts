export interface ProfileDTO {
  followers: number;
	following: number;
	hasFollowed: boolean;
	user: {
		name: string;
		avatar_url: string;
	}
}