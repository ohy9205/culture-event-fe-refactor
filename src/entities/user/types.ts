export type User = {
  id: number;
  email: string;
  nick: string;
};

export type MyComment = {
  id: number;
  User: User;
  Event: {
    title: string;
    eventPeriod: string;
    thumbnail: string;
  };
  eventId: number;
  commenter: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type FavoriteEvent = {
  id: number;
  period: string;
  thumbnail: string;
  title: string;
};

export type MyLikesState = {
  myLikes: FavoriteEvent[];
};
