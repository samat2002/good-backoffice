import {
  UserPlusIcon,
  LockIcon
} from 'vue-tabler-icons';

export interface menu {
  key?: string;
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: { header: string, childs: menu[] }[] = [
  {
    header: 'ข้อมูลหลัก',
    childs: [

    ],
  },
  {
    header: 'ตั้งค่าเว็บไซน์',
    childs: [
      {
        key: 'contact',
        title: 'ติดต่อเรา',
        icon: UserPlusIcon,
        to: '/contact'
      },
      {
        key: 'about',
        title: 'เกี่ยวกับฉัน',
        icon: UserPlusIcon,
        to: '/about'
      },
      {
        key: 'banner',
        title: 'แบนเนอร์',
        icon: UserPlusIcon,
        to: '/banner'
      },


      {
        key: 'experience',
        title: 'ประสบการณ์ของเรา',
        icon: UserPlusIcon,
        to: '/experience'
      },
      {
        key: 'product',
        title: 'สินค้าเเละบริการ',
        icon: LockIcon,
        to: '/product'
      },
      {
        key: 'skill',
        title: 'ทักษะ',
        icon: LockIcon,
        to: '/skill'
      },
      {
        key: 'skill-list',
        title: 'รูปทักษะ',
        icon: LockIcon,
        to: '/skill-list'
      },
      {
        key: 'portfolio',
        title: 'พอตฟอริโอ้',
        icon: UserPlusIcon,
        to: '/portfolio'
      },
      {
        key: 'portfolio-list',
        title: 'รูปพอตฟอริโอ้',
        icon: UserPlusIcon,
        to: '/portfolio-list'
      },
      {
        key: 'footer',
        title: 'ฟุตเตอร์',
        icon: UserPlusIcon,
        to: '/footer'
      },

    ],
  },
  {
    header: 'ข้อมูลบุคคล',
    childs: [{
      key: 'user',
      title: 'พนักงาน/ผู้ดูแล',
      icon: UserPlusIcon,
      to: '/user'
    },
    {
      key: 'user-position',
      title: 'ตำเเหน่ง',
      icon: UserPlusIcon,
      to: '/user-position'
    },
    {
      key: 'license',
      title: 'สิทธิ์การใช้งาน',
      icon: LockIcon,
      to: '/license'
    },
    ]
  },
];

export default sidebarItem