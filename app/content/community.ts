import type { Locale } from '@/i18n';

type Metric = {
  value: string;
  label: string;
};

type OutreachContent = {
  badge: string;
  headingLines: string[];
  paragraphs: string[];
  ctaLabel: string;
};

export type CommunityContent = {
  header: {
    titleParts: [string, string];
    separator: string;
    description: string[];
    tokenNote: string;
    primaryCta: string;
    secondaryCta: string;
    secondaryHref: string;
  };
  metrics: {
    stats: Metric[];
    badge: string;
  };
  backedBadge: string;
  exchanges: {
    heading: string[];
    subtitle: string;
  };
  outreach: OutreachContent;
  governance: {
    badge: string;
    headingHighlight: string;
    headingSuffix: string;
    intro: string;
    details: string;
    history: string[];
    whyBadge: string;
    whyText: string;
  };
};

const sharedOutreach: Record<Locale, OutreachContent> = {
  en: {
    badge: 'A COMMUNITY AT THE FOREFRONT',
    headingLines: ['Join us on the', 'Research', 'Frontier'],
    paragraphs: [
      'Contribute to experiments, ship pilots, and help define the reference architecture for AI-native protocols.',
      'Come build with us at the intersection of AI and Web3.'
    ],
    ctaLabel: 'Community Hub'
  },
  cn: {
    badge: '站在社区前沿',
    headingLines: ['与我们一起奔赴', '研究', '前线'],
    paragraphs: ['提交实验、落地试点，共建 AI 原生协议的参考架构。', '在 AI 与 Web3 的交汇处与我们并肩构建。'],
    ctaLabel: 'Community Hub'
  },
  kr: {
    badge: '커뮤니티 최전선',
    headingLines: ['리서치', '프런티어에', '함께하세요'],
    paragraphs: ['실험을 기여하고 파일럿을 출시하며 AI 네이티브 프로토콜의 레퍼런스 아키텍처를 정의하세요.', 'AI와 Web3가 만나는 지점에서 우리와 함께 빌드하세요.'],
    ctaLabel: 'Community Hub'
  }
};

export const communityContent: Record<Locale, CommunityContent> = {
  en: {
    header: {
      titleParts: ['Community', 'Code'],
      separator: '>',
      description: ["We're not just building products, we're experimenting", ' with governance, consensus, and incentive models', ' that shape the future of web3 and coordination.'],
      tokenNote: 'The $PSTAKE token is the governance and incentivization layer powering this journey.',
      primaryCta: 'Get $PSTAKE',
      secondaryCta: 'Governance',
      secondaryHref: 'https://forum.pstake.finance/'
    },
    metrics: {
      stats: [
        { value: '$PSTAKE', label: 'By the Numbers' },
        { value: '14M', label: 'Market Cap' },
        { value: '0%', label: 'Value Inflation' },
        { value: '94%', label: 'Unlocked Supply' }
      ],
      badge: 'PROUDLY BACKED BY'
    },
    backedBadge: 'PROUDLY BACKED BY',
    exchanges: {
      heading: ['$PSTAKE',' Across Ecosystems'],
      subtitle: 'Available on leading CEXs and DEXs'
    },
    outreach: sharedOutreach.en,
    governance: {
      badge: 'PARTICIPATE IN GOVERNANCE',
      headingHighlight: '$PSTAKE',
      headingSuffix: 'Used For?',
      intro: '$PSTAKE holders guide key decisions:',
      details: 'Validator selection, incentive design, protocol evolution, and funding of new staking research initiatives. 21+ proposals already live.',
      history: ['Launched in', '2021', ' with 979,000+ CoinList participants, ', 'PSTAKE', ' began as a staking protocol and is now a living research lab.'],
      whyBadge: 'WHY IT MATTERS',
      whyText: "We're on a mission to co-create the next chapter of decentralized staking alongside researchers and the PSTAKE community."
    }
  },
  cn: {
    header: {
      titleParts: ['Community', 'Code'],
      separator: '>',
      description: ['我们不仅在构建产品，更在治理、', '共识与激励模型上做实验，以塑造 Web3 协作的未来。', '，以塑造 Web3 协作的未来。'],
      tokenNote: '$PSTAKE 代币是这一旅程中的治理与激励层。',
      primaryCta: '获取 $PSTAKE',
      secondaryCta: '治理论坛',
      secondaryHref: 'https://forum.pstake.finance/'
    },
    metrics: {
      stats: [
        { value: '$PSTAKE', label: '关键数据' },
        { value: '14M', label: '市值' },
        { value: '0%', label: '价值通胀' },
        { value: '94%', label: '流通供应' }
      ],
      badge: '战略合作伙伴'
    },
    backedBadge: '战略合作伙伴',
    exchanges: {
      heading: ['$PSTAKE', ' 跨生态布局'],
      subtitle: '上线多家主流 CEX 与 DEX'
    },
    outreach: sharedOutreach.cn,
    governance: {
      badge: '参与治理',
      headingHighlight: '$PSTAKE',
      headingSuffix: '的用处',
      intro: '$PSTAKE 持有者驱动核心决策：',
      details: '验证人选择、激励设计、协议演进，以及资助全新的质押研究计划。目前已有 21+ 提案上线。',
      history: [
        "推出于",
        "2021",
        "，拥有 979,000+ CoinList 参与者，",
        "PSTAKE",
        "最初是一个质押协议，现在是一个持续发展的研究实验室。"
      ],
      whyBadge: '为何重要',
      whyText: '我们正与研究者及社区一同，共创下一代去中心化质押篇章。'
    }
  },
  kr: {
    header: {
      titleParts: ['Community', 'Code'],
      separator: '>',
      description: ['우리는 단순히 제품을 만드는 것을 넘어,', ' 거버넌스·합의·인센티브 모델을 ', '실험하며 Web3 협업의 미래를 설계합니다.'],
      tokenNote: '$PSTAKE 토큰은 여정을 이끄는 거버넌스 및 인센티브 레이어입니다.',
      primaryCta: '$PSTAKE 받기',
      secondaryCta: '거버넌스 포럼',
      secondaryHref: 'https://forum.pstake.finance/'
    },
    metrics: {
      stats: [
        { value: '$PSTAKE', label: '핵심 지표' },
        { value: '14M', label: '시가총액' },
        { value: '0%', label: '가치 인플레이션' },
        { value: '94%', label: '유통 공급' }
      ],
      badge: '주요 파트너'
    },
    backedBadge: '주요 파트너',
    exchanges: {
      heading: ['$PSTAKE',' 멀티 체인 상장'],
      subtitle: '주요 CEX · DEX 에서 이용 가능'
    },
    outreach: sharedOutreach.kr,
    governance: {
      badge: '거버넌스에 참여하세요',
      headingHighlight: '$PSTAKE',
      headingSuffix: '의 역할',
      intro: '$PSTAKE 보유자는 핵심 결정을 이끕니다:',
      details: '검증인 선정, 인센티브 설계, 프로토콜 진화, 신규 스테이킹 연구 자금 지원까지 — 이미 21개 이상의 제안이 진행 중입니다.',
      history: [
        "출시된 해는",
        "2021",
        "이며 979,000명 이상의 CoinList 참가자를 보유한",
        "PSTAKE",
        "는 스테이킹 프로토콜로 시작해 지금은 살아있는 연구 실험실로 발전했습니다."
      ],
      whyBadge: '중요한 이유',
      whyText: '연구자 및 PSTAKE 커뮤니티와 함께 차세대 탈중앙 스테이킹 장을 써 내려가고 있습니다.'
    }
  }
};
