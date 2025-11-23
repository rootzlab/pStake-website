import type { Locale } from '@/i18n';

type Metric = {
  value: string;
  label: string;
};

type Unit3Card = {
  highlight: string;
  title: string;
  description: string;
};

type HeroContent = {
  titleLines: string[];
  descriptionHighlight: string;
  description: string[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

type Unit1Content = {
  metrics: Metric[];
  highlight: string;
  headline: string;
  badge: string;
  paragraph: string;
};

type Unit2Content = {
  badge: string;
};

type Unit3Content = {
  headingHighlight: string;
  headingTitle: string;
  badge: string;
  cards: Unit3Card[];
  footerBadge: string;
  footerLeft: string[];
  footerRight: string;
};

type Unit4Content = {
  badge: string;
  headlineHighlight: string;
  headlineTitle: string;
  paragraphs: string[];
  ctaLabel: string;
  stats: Metric[];
};

type Unit5Content = {
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  featuredLabel: string;
};

type Unit6Content = {
  badge: string;
  headingLines: string[];
  paragraphs: string[];
  ctaLabel: string;
};

type ArticleMetaContent = {
  dateAlt: string;
  readAlt: string;
  noCover: string;
  emptyState: string;
  readTimeLabel: (minutes: number) => string;
};

export type HomeContent = {
  hero: HeroContent;
  unit1: Unit1Content;
  unit2: Unit2Content;
  unit3: Unit3Content;
  unit4: Unit4Content;
  unit5: Unit5Content;
  unit6: Unit6Content;
  articles: ArticleMetaContent;
};

export const homeContent: Record<Locale, HomeContent> = {
  en: {
    hero: {
      titleLines: ['The Research Layer for', 'Web3 & AI Collaboration'],
      descriptionHighlight: 'PSTAKE Research',
      description: ['primitives with autonomous action,', ' modular assets, and cross-chain interoperability.'],
      primaryCta: { label: 'Learn More', href: '/research' },
      secondaryCta: { label: 'Get Started', href: '/community' }
    },
    unit1: {
      metrics: [
        { value: '$50M', label: 'Innovation Fund' },
        { value: '100+', label: 'Papers Reviewed' },
        { value: '20+', label: 'Strategic Partners' },
        { value: '5+', label: 'Pilot Researches' }
      ],
      highlight: 'PSTAKE',
      headline: 'is a research collective exploring how decentralized networks and AI evolve together.',
      badge: 'OUR STRENGTH IS IN KNOWLEDGE',
      paragraph:
        "PSTAKE is a research collective exploring how decentralized networks evolve. We're not just building products, we're experimenting with governance, consensus, and incentive models that shape the future of web3 and coordination."
    },
    unit2: {
      badge: 'PROUDLY BACKED BY'
    },
    unit3: {
      headingHighlight: 'Targeted Research',
      headingTitle: 'Achieving Targeted Results',
      badge: 'AREAS OF FOCUS',
      cards: [
        {
          highlight: 'Onchain',
          title: 'Reasoning',
          description: 'AI systems that validate and adapt protocol logic in real time.'
        },
        {
          highlight: 'Modular',
          title: 'Routing',
          description: 'Intelligent pathways for assets across chains and liquidity layers.'
        },
        {
          highlight: 'Verifiable',
          title: 'AI Flows',
          description: 'Transparent attribution and audit trails for AI-native assets.'
        },
        {
          highlight: 'Predictive',
          title: 'Optimizing',
          description: 'Agents that optimize liquidity, incentives, and governance with data.'
        }
      ],
      footerBadge: "WHAT WE'RE ALL ABOUT",
      footerLeft: ['Researching the intelligence layer connecting', ' AI, Web3, and the traditional economy.'],
      footerRight: 'PSTAKE Research explores the intelligence layer where AI, Web3, and traditional finance converge; shaping the future of verifiable economies.'
    },
    unit4: {
      badge: "INTRODUCING THE PSTAKE FOUNDATION'S",
      headlineHighlight: '$50M',
      headlineTitle: 'AI–Web3 Innovation Fund',
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
    unit5: {
      titlePrefix: 'Open Research,',
      titleHighlight: 'Real Impact',
      description:
        'We publish reference designs for decentralized AI marketplaces, adaptive consensus, and AI-powered auditing—so builders can go from PoC to production.',
      featuredLabel: 'FEATURED READS'
    },
    unit6: {
      badge: 'A COMMUNITY AT THE FOREFRONT',
      headingLines: ['Join us on the', 'Research', 'Frontier'],
      paragraphs: [
        'Contribute to experiments, ship pilots, and help define the reference architecture for AI-native protocols.',
        'Come build with us at the intersection of AI and Web3.'
      ],
      ctaLabel: 'Community Hub'
    },
    articles: {
      dateAlt: 'Published date',
      readAlt: 'Estimated reading time',
      noCover: 'No cover image',
      emptyState: 'No articles to display yet. Please check back soon.',
      readTimeLabel: (minutes: number) => {
        const rounded = Math.max(1, minutes);
        return `${rounded} MINUTE${rounded > 1 ? 'S' : ''} READ`;
      }
    }
  },
  cn: {
    hero: {
      titleLines: ['Web3 与 AI 协作的', '研究层'],
      descriptionHighlight: 'PSTAKE Research',
      description: ['拥有自主行动、', '模块化资产与跨链互操作性的研究原语。'],
      primaryCta: { label: '了解更多', href: '/research' },
      secondaryCta: { label: '开始使用', href: '/community' }
    },
    unit1: {
      metrics: [
        { value: '$50M', label: '创新基金' },
        { value: '100+', label: '评审论文' },
        { value: '20+', label: '战略合作伙伴' },
        { value: '5+', label: '试点研究' }
      ],
      highlight: 'PSTAKE',
      headline: '是一个探索去中心化网络与 AI 并行演进的研究型集体。',
      badge: '知识即核心竞争力',
      paragraph:
        'PSTAKE 深入研究去中心化网络的演化。不止于产品，我们更在治理、共识与激励机制上做实验，塑造 Web3 协作的未来。'
    },
    unit2: {
      badge: '战略合作伙伴'
    },
    unit3: {
      headingHighlight: '聚焦研究',
      headingTitle: '驱动可验证成果',
      badge: '重点方向',
      cards: [
        {
          highlight: '链上',
          title: '推理',
          description: 'AI 系统实时校验并自适应协议逻辑。'
        },
        {
          highlight: '模块化',
          title: '路由',
          description: '跨链与跨流动性层的智能资产通路。'
        },
        {
          highlight: '可验证',
          title: 'AI 流程',
          description: '为 AI 原生资产提供透明的归因与审计轨迹。'
        },
        {
          highlight: '预测式',
          title: '优化',
          description: '利用数据优化流动性、激励与治理的智能代理。'
        }
      ],
      footerBadge: '我们的使命',
      footerLeft: ['研究连接', 'AI、Web3 与传统经济的智能层。'],
      footerRight: 'PSTAKE Research 探索 AI、Web3 与传统金融交汇的智能层，塑造可验证经济的未来。'
    },
    unit4: {
      badge: 'PSTAKE 基金会推出',
      headlineHighlight: '$50M',
      headlineTitle: 'AI–Web3 创新基金',
      paragraphs: [
        '为 AI 原生资产、工具链与市场层提供资助、试点、合作与收购支持。',
        '我们支持严谨研究与真正落地的团队。'
      ],
      ctaLabel: '开放申请',
      stats: [
        { value: '$50M', label: '创新基金' },
        { value: '20+', label: '产业伙伴' },
        { value: '8', label: '研究者' },
        { value: '7', label: '覆盖洲别' }
      ]
    },
    unit5: {
      titlePrefix: '开放研究，',
      titleHighlight: '创造真实影响',
      description: '我们发布去中心化 AI 市场、自适应共识与 AI 审计的参考设计，助力团队从 PoC 迈向量产。',
      featuredLabel: '精选阅读'
    },
    unit6: {
      badge: '站在社区前沿',
      headingLines: ['与我们一起奔赴', '研究', '前线'],
      paragraphs: ['提交实验、落地试点，共建 AI 原生协议的参考架构。', '在 AI 与 Web3 的交汇处与我们并肩构建。'],
      ctaLabel: 'Community Hub'
    },
    articles: {
      dateAlt: '发布日期',
      readAlt: '预计阅读时长',
      noCover: '暂无封面',
      emptyState: '暂时没有可展示的文章，欢迎稍后再来。',
      readTimeLabel: (minutes: number) => `${Math.max(1, minutes)} 分钟阅读`
    }
  },
  kr: {
    hero: {
      titleLines: ['Web3와 AI 협업을 위한', '리서치 레이어'],
      descriptionHighlight: 'PSTAKE Research',
      description: ['자율 실행,', '모듈형 자산, 체인 간 상호운용성을 갖춘 연구 프리미티브입니다.'],
      primaryCta: { label: '더 알아보기', href: '/research' },
      secondaryCta: { label: '시작하기', href: '/community' }
    },
    unit1: {
      metrics: [
        { value: '$50M', label: '혁신 펀드' },
        { value: '100+', label: '검토 논문' },
        { value: '20+', label: '전략 파트너' },
        { value: '5+', label: '파일럿 연구' }
      ],
      highlight: 'PSTAKE',
      headline: '는 분산 네트워크와 AI가 함께 진화하는 방식을 탐구하는 리서치 컬렉티브입니다.',
      badge: '지식이 우리의 힘',
      paragraph: 'PSTAKE는 분산 네트워크의 진화를 탐구합니다. 제품을 만드는 데 그치지 않고, 거버넌스·합의·인센티브 모델을 실험하며 Web3 협업의 미래를 설계합니다.'
    },
    unit2: {
      badge: '주요 파트너'
    },
    unit3: {
      headingHighlight: '정교한 연구',
      headingTitle: '정확한 성과',
      badge: '집중 영역',
      cards: [
        {
          highlight: '온체인',
          title: '추론',
          description: '실시간으로 프로토콜 로직을 검증하고 적응하는 AI 시스템.'
        },
        {
          highlight: '모듈형',
          title: '라우팅',
          description: '체인과 유동성 레이어를 넘나드는 지능형 자산 경로.'
        },
        {
          highlight: '검증 가능한',
          title: 'AI 플로우',
          description: 'AI 네이티브 자산을 위한 투명한 추적과 감사지표.'
        },
        {
          highlight: '예측형',
          title: '최적화',
          description: '데이터로 유동성∙인센티브∙거버넌스를 최적화하는 에이전트.'
        }
      ],
      footerBadge: '우리의 미션',
      footerLeft: ['AI, Web3, 전통 경제를', '잇는 지능 계층을 연구합니다.'],
      footerRight: 'PSTAKE Research는 AI·Web3·전통 금융이 만나는 지능 계층을 탐구하며 검증 가능한 경제의 미래를 설계합니다.'
    },
    unit4: {
      badge: 'PSTAKE 재단의',
      headlineHighlight: '$50M',
      headlineTitle: 'AI–Web3 이노베이션 펀드',
      paragraphs: [
        'AI 네이티브 자산, 툴링, 마켓 레이어를 위한 그랜트·파일럿·파트너십·인수 프로그램.',
        '우리는 철저한 연구와 실제 제품을 만드는 팀을 지원합니다.'
      ],
      ctaLabel: '신청하기',
      stats: [
        { value: '$50M', label: '혁신 펀드' },
        { value: '20+', label: '산업 파트너' },
        { value: '8', label: '연구자' },
        { value: '7', label: '대륙 커버리지' }
      ]
    },
    unit5: {
      titlePrefix: '오픈 리서치,',
      titleHighlight: '실제 임팩트',
      description: '분산형 AI 마켓플레이스, 적응형 합의, AI 기반 감사에 대한 레퍼런스 설계를 공개해 팀이 PoC에서 프로덕션으로 나아가도록 돕습니다.',
      featuredLabel: '추천 읽을거리'
    },
    unit6: {
      badge: '커뮤니티 최전선',
      headingLines: ['리서치', '프런티어에', '함께하세요'],
      paragraphs: ['실험을 기여하고 파일럿을 출시하며 AI 네이티브 프로토콜의 레퍼런스 아키텍처를 정의하세요.', 'AI와 Web3가 만나는 지점에서 우리와 함께 빌드하세요.'],
      ctaLabel: 'Community Hub'
    },
    articles: {
      dateAlt: '게시 날짜',
      readAlt: '예상 읽기 시간',
      noCover: '표지 이미지 없음',
      emptyState: '표시할 게시물이 없습니다. 곧 다시 확인해주세요.',
      readTimeLabel: (minutes: number) => `${Math.max(1, minutes)}분 소요`
    }
  }
};
