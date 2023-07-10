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
      text: "I don't like expending more effort than i have to",
      imageURL: "https://i0.wp.com/quotetheanime.com/wp-content/uploads/2020/08/Classroom-Of-The-Elite-Quotes.-Ayanokouji-Kiyotaka-You-may-come-to-regret-trying-to-manipulate-me-1024x1024.jpg"
    },
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "test",
    createdAt: "2023-06-24T12:00:00Z",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
    {
      text: "Never trust anyone too much remember, the devil was once an angel",
      imageURL: "https://scontent.fhyd14-2.fna.fbcdn.net/v/t31.18172-8/17814580_1371329772913637_7635302899111049904_o.jpg?_nc_cat=108&cb=99be929b-59f725be&ccb=1-7&_nc_sid=9267fe&_nc_ohc=WNOnDPL5xKUAX-egGY_&_nc_ht=scontent.fhyd14-2.fna&oh=00_AfCnzAfXImI_sLodlmQvsmoypp-ddvoZJ3Hj6hOTawQdnA&oe=64BCB90B"
    },
    likes: {
      likeCount: 4,
      likedBy: [],
      dislikedBy: [],
    },
    username: "test",
    createdAt: "2023-05-25T15:00:00Z",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
    {
      text: "The world isn’t perfect. But it’s there for us, doing the best it can… that’s what makes it so damn beautiful.",
      imageURL: ""
    },
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "test",
    createdAt: "2023-05-15T18:00:00Z",
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
    createdAt: "2023-06-28T9:00:00Z",
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
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    username: "clankiller",
    createdAt: "2023-07-13T12:00:00Z",
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
      likeCount: 9999,
      likedBy: [],
      dislikedBy: [],
    },
    username: "clankiller",
    createdAt: "2039-07-13T12:00:00Z",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
    {
      text: "Yo, I’m Goku",
      imageURL: "https://pbs.twimg.com/media/EdX-9v0UcAERlvU?format=jpg&name=small"
    }
    ,
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    username: "kakarot",
    createdAt: "2022-07-13T11:00:00Z",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
    {
      text: "I Am Going To Be The Pirate King.",
      imageURL: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/02/one-piece.jpg?q=50&fit=crop&w=1500&dpr=1.5"
    }
    ,
    likes: {
      likeCount: 8,
      likedBy: [],
      dislikedBy: [],
    },
    username: "pirateking",
    createdAt: "2023-01-23T14:00:00Z",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
    {
      text: "It's time to settle this",
      imageURL: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/09/goku-saitama.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5"
    }
    ,
    likes: {
      likeCount: 10,
      likedBy: [],
      dislikedBy: [],
    },
    username: "capedbaldy",
    createdAt: "2022-12-11T12:00:00Z",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
    {
      text: "Let's do this",
      imageURL: "https://w0.peakpx.com/wallpaper/128/839/HD-wallpaper-vegito-blue-and-gogeta-blue-vegito-dragon-ball-anime-artist-artwork-digital-art-deviantart.jpg"
    }
    ,
    likes: {
      likeCount:0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "kakarot",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  
];
