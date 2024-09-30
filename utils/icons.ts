import { IoTimeOutline } from "react-icons/io5";
import { FaPhoneAlt, FaTruck, FaInstagram, FaWhatsapp } from "react-icons/fa";
import {
  MdMail,
  MdOutlineFacebook,
  MdLocationOn,
  MdAddShoppingCart,
  MdClose,
  MdDelete,
  MdAdd,
} from "react-icons/md";
import { HiShoppingCart } from "react-icons/hi";
import { GoArrowSwitch } from "react-icons/go";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FcOnlineSupport } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineGoogle } from "react-icons/ai";
import { HiOutlineMinusSm } from "react-icons/hi";

export const ICONS = {
  time: IoTimeOutline,
  phone: FaPhoneAlt,
  mail: MdMail,
  cart: HiShoppingCart,
  truck: FaTruck,
  return: GoArrowSwitch,
  secure: RiSecurePaymentFill,
  support: FcOnlineSupport,
  facebook: MdOutlineFacebook,
  twitter: FaXTwitter,
  google: AiOutlineGoogle,
  instagram: FaInstagram,
  location: MdLocationOn,
  whatsapp: FaWhatsapp,
  addToCart: MdAddShoppingCart,
  close: MdClose,
  delete: MdDelete,
  add: MdAdd,
  minus: HiOutlineMinusSm,
};
