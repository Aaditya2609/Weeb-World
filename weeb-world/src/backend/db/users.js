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
    avatar:"https://avatarfiles.alphacoders.com/222/222762.jpg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Naruto",
    lastName: "Uzumaki",
    username: "hokage",
    password: "hokage",
    avatar:"https://avatarfiles.alphacoders.com/169/169761.jpg",
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
  },
];
