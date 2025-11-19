import type { Locale } from '@/i18n';

export type ResearchContent = {
  header: {
    titleLines: string[];
    subtitle: string;
  };
  intro: {
    heading: string;
    highlight: string;
    description: string;
  };
  fund: {
    badge: string;
    highlight: string;
    title: string;
    paragraphs: string[];
    ctaLabel: string;
    stats: { value: string; label: string }[];
  };
  articles: {
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    buttonLabel: string;
    moreLabel: string;
    emptyState: string;
    noCover: string;
    dateAlt: string;
    readAlt: string;
    readTimeLabel: (minutes: number) => string;
  };
};

export const researchContent: Record<Locale, ResearchContent> = {
  en: {
    header: {
      titleLines: ['Research is Done', 'Better', 'Together'],
      subtitle: 'Get involved with the global PSTAKE community, onchain, in person, and online, to help build the future of Web3 and AI.'
    },
    intro: {
      heading: 'Venture into the',
      highlight: 'PSTAKE Community',
      description: 'Research starts in the lab, but grows with the community.'
    },
    fund: {
      badge: "INTRODUCING THE PSTAKE FOUNDATION'S",
      highlight: '',
      title: '$50M AI–Web3 Innovation Fund',
      paragraphs: [
        'Grants, pilots, partnerships, and acquisitions for AI-native assets, tooling, and market layers.',
        'We back rigorous research and teams shipping real products.'
      ],
      ctaLabel: 'Applications Open',
      stats: [
        { value: '$50M', label: 'Innovation Fund' },
        { value: '20+', label: 'Industry Partners' },
        { value: '8', label: 'Researchers' },
        { value: '7', label: 'Continents' }
      ]
    },
    articles: {
      titlePrefix: 'Open Findings,',
      titleHighlight: 'Real Impact',
      description: 'We publish reference designs for decentralized AI marketplaces, adaptive consensus, and AI-powered auditing—so builders can go from PoC to production.',
      buttonLabel: 'View All Articles',
      moreLabel: 'More from PSTAKE',
      emptyState: 'No articles to display yet. Please check back soon.',
      noCover: 'No cover image',
      dateAlt: 'Published date',
      readAlt: 'Estimated reading time',
      readTimeLabel: (minutes: number) => `${Math.max(1, minutes)} MIN READ`
    }
  },
  cn: {
    header: {
      titleLines: ['研究更需要', '协作', '完成'],
      subtitle: '邀请全球 PSTAKE 社区在线上与线下共同参与，构建 Web3 与 AI 的未来。'
    },
    intro: {
      heading: '走进',
      highlight: 'PSTAKE 社区',
      description: '研究始于实验室，但依靠社区共同成长。'
    },
    fund: {
      badge: 'PSTAKE 基金会推出',
      highlight: '',
      title: '$50M AI–Web3 创新基金',
      paragraphs: ['为 AI 原生资产、工具链与市场层提供资助、试点、合作与收购支持。', '我们支持严谨研究与真正落地的团队。'],
      ctaLabel: '开放申请',
      stats: [
        { value: '$50M', label: '创新基金' },
        { value: '20+', label: '产业伙伴' },
        { value: '8', label: '研究者' },
        { value: '7', label: '覆盖洲别' }
      ]
    },
    articles: {
      titlePrefix: '开放研究，',
      titleHighlight: '创造真实影响',
      description: '我们发布去中心化 AI 市场、自适应共识与 AI 审计的参考设计，助力团队从 PoC 迈向量产。',
      buttonLabel: '查看全部文章',
      moreLabel: '更多 PSTAKE 内容',
      emptyState: '暂时没有可展示的文章。欢迎稍后再来。',
      noCover: '暂无封面',
      dateAlt: '发布日期',
      readAlt: '预计阅读时长',
      readTimeLabel: (minutes: number) => `${Math.max(1, minutes)} 分钟阅读`
    }
  },
  kr: {
    header: {
      titleLines: ['리서치는 함께할 때', '더 잘', '완성됩니다'],
      subtitle: '온체인과 오프라인을 넘나들며 전 세계 PSTAKE 커뮤니티와 함께 Web3와 AI의 미래를 만드세요.'
    },
    intro: {
      heading: '함께하는',
      highlight: 'PSTAKE 커뮤니티',
      description: '연구는 실험실에서 시작되지만 커뮤니티와 함께 성장합니다.'
    },
    fund: {
      badge: 'PSTAKE 재단의',
      highlight: '',
      title: '$50M AI–Web3 이노베이션 펀드',
      paragraphs: ['AI 네이티브 자산, 툴링, 마켓 레이어를 위한 그랜트·파일럿·파트너십·인수 프로그램.', '우리는 철저한 연구와 실제 제품을 만드는 팀을 지원합니다.'],
      ctaLabel: '신청하기',
      stats: [
        { value: '$50M', label: '혁신 펀드' },
        { value: '20+', label: '산업 파트너' },
        { value: '8', label: '연구자' },
        { value: '7', label: '대륙 커버리지' }
      ]
    },
    articles: {
      titlePrefix: '오픈 리서치,',
      titleHighlight: '실제 임팩트',
      description: '분산형 AI 마켓플레이스, 적응형 합의, AI 기반 감사에 대한 레퍼런스 설계를 공유해 팀이 PoC에서 프로덕션으로 나아가도록 돕습니다.',
      buttonLabel: '모든 글 보기',
      moreLabel: '더 많은 PSTAKE 소식',
      emptyState: '표시할 게시물이 없습니다. 곧 다시 확인해주세요.',
      noCover: '표지 이미지 없음',
      dateAlt: '게시 날짜',
      readAlt: '예상 읽기 시간',
      readTimeLabel: (minutes: number) => `${Math.max(1, minutes)}분 소요`
    }
  }
};
