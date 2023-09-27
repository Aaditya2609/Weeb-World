import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Test",
    lastName: "User",
    username: "test",
    password: "1234",
    avatar:"https://wallpapers-clan.com/wp-content/uploads/2022/09/one-piece-pfp-4.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    cover:"https://c4.wallpaperflare.com/wallpaper/291/819/697/illustration-city-anime-painting-wallpaper-preview.jpg"
  },
  {
    _id: uuid(),
    firstName: "Naruto",
    lastName: "Uzumaki",
    username: "hokage",
    password: "hokage",
    avatar:"https://avatarfiles.alphacoders.com/169/169761.jpg",
    cover:"https://c4.wallpaperflare.com/wallpaper/738/62/544/naruto-chidori-naruto-naruto-uzumaki-rasengan-naruto-sasuke-uchiha-hd-wallpaper-preview.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Monkey",
    lastName: "D. Luffy",
    username: "pirateking",
    password: "meat",
    avatar:"https://avatarfiles.alphacoders.com/267/267409.jpg",
    cover:"https://c4.wallpaperflare.com/wallpaper/838/806/561/satoru-gojo-one-piece-hd-wallpaper-preview.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Son",
    lastName: "Goku",
    username: "kakarot",
    password: "ultrainstinct",
    avatar:"https://avatarfiles.alphacoders.com/242/242622.jpg",
    cover:"https://c4.wallpaperflare.com/wallpaper/548/274/337/dbz-dragon-ball-z-goku-dragon-ball-super-wallpaper-preview.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Saitama",
    lastName: "",
    username: "capedbaldy",
    password: "onepunch",
    avatar:"https://avatarfiles.alphacoders.com/451/45103.png",
    cover:"https://c4.wallpaperflare.com/wallpaper/119/175/804/one-punch-man-saitama-anime-wallpaper-preview.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Itachi",
    lastName: "Uchicha",
    username: "clankiller",
    avatar:"https://avatarfiles.alphacoders.com/331/331604.jpg",
    password: "sasuke",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    cover:"https://c4.wallpaperflare.com/wallpaper/365/244/884/uchiha-itachi-naruto-shippuuden-anbu-silhouette-wallpaper-preview.jpg",
  },
];
