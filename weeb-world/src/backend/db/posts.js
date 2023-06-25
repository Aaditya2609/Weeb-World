import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
    {
      text: "The future belongs to those who believe in the beauty of their dreams",
      imageURLURL: "https://pbs.twimg.com/media/EmObJcVVgAc7ZVI?format=jpg&name=medium"
    },
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "test",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
    {
      text: "Never trust anyone too much remember, the devil was once an angel",
      imageURLURL: "https://scontent.fhyd14-2.fna.fbcdn.net/v/t31.18172-8/17814580_1371329772913637_7635302899111049904_o.jpg?_nc_cat=108&cb=99be929b-59f725be&ccb=1-7&_nc_sid=9267fe&_nc_ohc=WNOnDPL5xKUAX-egGY_&_nc_ht=scontent.fhyd14-2.fna&oh=00_AfCnzAfXImI_sLodlmQvsmoypp-ddvoZJ3Hj6hOTawQdnA&oe=64BCB90B"
    },
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "test",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
    {
      text: "The world isn’t perfect. But it’s there for us, doing the best it can… that’s what makes it so damn beautiful.",
      imageURLURL: ""
    },
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "test",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
    {
      text: "It is foolish to fear what we have yet to see and know",
      imageURL: ""
    },
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "clankiller",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
    {
      text: "It is not wise to judge others based on your own perceptions and by their appearances",
      imageURL: ""
    }
    ,
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "clankiller",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
    {
      text: "This Level of genjutsu doesn't work on me.",
      imageURL: "https://qph.cf2.quoracdn.net/main-qimg-38633033b8e367017645ba8fadbe9adb-lq"
    }
    ,
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "clankiller",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
    {
      text: "You are already under my genjutsu",
      imageURL: "https://qph.cf2.quoracdn.net/main-qimg-2ce6f7eac70cffb83a2c3d648ff9181f-lq"
    }
    ,
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "clankiller",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
