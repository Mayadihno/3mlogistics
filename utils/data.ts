import { ICONS } from "./icons";
import image from "../public/carousel1.jpg";
import image2 from "../public/carousel2.jpg";
import image3 from "../public/carousel3.jpg";

export const headerData = [
  {
    id: 1,
    title: "Opening Hour",
    text: "Mon-Sun, 8:00am-10:00pm",
    icon: ICONS.time,
  },
  {
    id: 2,
    title: "Call Us",
    text: "+4542226658",
    icon: ICONS.phone,
  },
  {
    id: 3,
    title: "E-Mail Us",
    text: "mlogisticssolution@gmail.com",
    icon: ICONS.mail,
  },
];

export const navbarData = [
  {
    id: 1,
    text: "Home",
    link: "/home",
  },
  {
    id: 2,
    text: "Store",
    link: "/store",
  },
  {
    id: 3,
    text: "About",
    link: "/about",
  },
  {
    id: 4,
    text: "Contact",
    link: "/contact",
  },
];

export const carouselData = [
  {
    id: 1,
    image: image,
    text: "Happiness is not in Money, but in Shopping",
  },
  {
    id: 2,
    image: image2,
    text: "Shop Happily stay Healthy",
  },
  {
    id: 3,
    image: image3,
    text: "Keep Calm and Shop with us today",
  },
];

export const policyData = [
  {
    id: 1,
    title: "Free Shipping",
    text: "On all orders over Kr1000",
    icon: ICONS.truck,
  },
  {
    id: 2,
    title: "Free Returns",
    text: "Returns are free within 5 days",
    icon: ICONS.return,
  },
  {
    id: 3,
    title: "100% Payment Secure",
    text: "Your payment are safe with us.",
    icon: ICONS.secure,
  },
  {
    id: 4,
    title: "Support 24/7",
    text: "Contact us 24 hours a day",
    icon: ICONS.support,
  },
];
