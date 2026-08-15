export type Post = {
  id: number;
  image: string;
  title: string;
  content: string;
  createdAt: string;
  userFirstName: string;
  userLastName: string;
  likes: number;
  isLiked: 0 | 1;
};

export type StorePostInput = {
  imageUrl: string;
  title: string;
  content: string;
  userId: number;
};
