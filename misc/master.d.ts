import { License } from './auth'

export type About = {
  id: string;
  about_detail: string;
  about_img?: string;
  images?: { about_img: { src: string, name: string } };
};

export type Footer = {
  id: string;
  footer_detail: string;
};