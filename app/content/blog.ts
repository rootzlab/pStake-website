import type { Locale } from '@/i18n';

export type BlogContent = {
  header: {
    titleLines: string[];
    highlightIconAlt: string;
    ctaLabel: string;
  };
  intro: {
    heading: string;
    highlight: string;
    description: string;
  };
  emptyState: {
    title: string;
    subtitle: string;
  };
  articles: {
    noCover: string;
    dateAlt: string;
    readAlt: string;
    readTimeLabel: (minutes: number) => string;
  };
};

export const blogContent: Record<Locale, BlogContent> = {
  en: {
    header: {
      titleLines: ['Open Research', 'Real', 'Impact'],
      highlightIconAlt: 'impact graphic',
      ctaLabel: 'Blog & Research Posts'
    },
    intro: {
      heading: 'Venture into the',
      highlight: 'PSTAKE Community',
      description: 'Research starts in the lab, but grows with the community.'
    },
    emptyState: {
      title: 'No articles to display yet',
      subtitle: 'Please check back soon or visit Medium for the latest updates.'
    },
    articles: {
      noCover: 'No cover image',
      dateAlt: 'Published date',
      readAlt: 'Estimated reading time',
      readTimeLabel: (minutes: number) => `${Math.max(1, minutes)} MIN READ`
    }
  },
  cn: {
    header: {
      titleLines: ['开放研究', '创造真实', '影响'],
      highlightIconAlt: '影响力图案',
      ctaLabel: '博客与研究文章'
    },
    intro: {
      heading: '走进',
      highlight: 'PSTAKE 社区',
      description: '研究始于实验室，但依靠社区共同成长。'
    },
    emptyState: {
      title: '暂时没有可展示的文章',
      subtitle: '请稍后再试，或前往 Medium 查看最新动态。'
    },
    articles: {
      noCover: '暂无封面',
      dateAlt: '发布日期',
      readAlt: '预计阅读时长',
      readTimeLabel: (minutes: number) => `${Math.max(1, minutes)} 分钟阅读`
    }
  },
  kr: {
    header: {
      titleLines: ['오픈 리서치', '실제', '임팩트'],
      highlightIconAlt: '임팩트 그래픽',
      ctaLabel: '블로그 & 리서치 포스트'
    },
    intro: {
      heading: '함께하는',
      highlight: 'PSTAKE 커뮤니티',
      description: '연구는 실험실에서 시작되지만 커뮤니티와 함께 성장합니다.'
    },
    emptyState: {
      title: '표시할 게시물이 없습니다',
      subtitle: '곧 다시 확인하거나 Medium에서 최신 소식을 확인하세요.'
    },
    articles: {
      noCover: '표지 이미지 없음',
      dateAlt: '게시 날짜',
      readAlt: '예상 읽기 시간',
      readTimeLabel: (minutes: number) => `${Math.max(1, minutes)}분 소요`
    }
  }
};
