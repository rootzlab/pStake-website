import type { Locale } from '@/i18n';

export type SocialLink = {
  icon: string;
  href: string;
  labels: Record<Locale, string>;
  suffix?: string;
};

export type SocialHubContent = {
  heading: string;
  highlight: string;
  description: string;
};

export const socialLinks: SocialLink[] = [
  {
    icon: '/img/icon33.svg',
    href: 'https://x.com/pStakeFinance',
    labels: {
      en: 'PSTAKE Finance',
      cn: 'PSTAKE Finance',
      kr: 'PSTAKE Finance'
    }
  },
  {
    icon: '/img/icon33.svg',
    href: 'https://x.com/pStakeresearch',
    labels: {
      en: 'PSTAKE Research',
      cn: 'PSTAKE Research',
      kr: 'PSTAKE Research'
    }
  },
  {
    icon: '/img/icon34.svg',
    href: 'https://discord.pstake.finance/',
    labels: {
      en: 'Discord',
      cn: 'Discord',
      kr: 'Discord'
    }
  },
  {
    icon: '/img/icon35.svg',
    href: 'https://t.me/pstakefinancechat',
    labels: {
      en: 'Telegram',
      cn: 'Telegram',
      kr: 'Telegram'
    }
  },
  {
    icon: '/img/icon36.svg',
    href: 'https://t.me/pSTAKE_china',
    labels: {
      en: 'Telegram',
      cn: 'Telegram',
      kr: 'Telegram'
    },
    suffix: 'CN'
  },
  {
    icon: '/img/icon36.svg',
    href: 'http://t.me/pSTAKE_Korea_Announcement',
    labels: {
      en: 'Telegram',
      cn: 'Telegram',
      kr: 'Telegram'
    },
    suffix: 'KR'
  }
];

export const socialHubContent: Record<Locale, SocialHubContent> = {
  en: {
    heading: 'Venture into the',
    highlight: 'PSTAKE Community',
    description: 'Research starts in the lab, but grows with the community.'
  },
  cn: {
    heading: '走进',
    highlight: 'PSTAKE 社区',
    description: '研究始于实验室，却依靠社区共同生长。'
  },
  kr: {
    heading: '함께하는',
    highlight: 'PSTAKE 커뮤니티',
    description: '연구는 실험실에서 시작되지만 커뮤니티와 함께 성장합니다.'
  }
};
