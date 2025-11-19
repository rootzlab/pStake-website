import type { Locale } from '@/i18n';

export type RichTextSegment =
  | { type: 'text'; value: string }
  | { type: 'highlight'; value: string }
  | { type: 'lineBreak' };

export type RoadmapListItemContent = {
  segments: RichTextSegment[];
  children?: RoadmapListItemContent[];
};

export type RoadmapPhaseContent = {
  title: string;
  timeRange: string;
  label: string | string[];
  position: 'left' | 'right';
  milestones: RoadmapListItemContent[];
};

export type RoadmapHeroContent = {
  firstLine: string;
  secondLinePrefix: string;
  secondLineSuffix: string;
  iconAlt: string;
  ctaLabel: string;
};

export type RoadmapContent = {
  hero: RoadmapHeroContent;
  phases: RoadmapPhaseContent[];
};

const text = (value: string): RichTextSegment => ({ type: 'text', value });
const highlight = (value: string): RichTextSegment => ({ type: 'highlight', value });
const lineBreak = (): RichTextSegment => ({ type: 'lineBreak' });

const sharedPhasesEn: RoadmapPhaseContent[] = [
  {
    title: 'Phase 0',
    timeRange: 'Q1 - Q2, 2025',
    label: 'Foundation & Research Layer',
    position: 'left',
    milestones: [
      {
        segments: [
          text('Launch of the '),
          highlight('PSTAKE Research Hub'),
          lineBreak(),
          text('featuring open-access papers, simulations,'),
          lineBreak(),
          text('and collaborative experiments.')
        ]
      },
      {
        segments: [
          text('Core research focused on '),
          highlight('generic '),
          highlight('sectors '),
          text('including Music, healthcare, supply chain, infrastructure, and media.')
        ]
      },
      {
        segments: [
          text('Formation of the '),
          highlight('PSTAKE Research Team'),
          lineBreak(),
          text('with multidisciplinary expertise.')
        ]
      },
      {
        segments: [
          text('Strategic partnerships established with'),
          lineBreak(),
          highlight('academic institutions'),
          text(' and'),
          highlight('AI labs'),
          text(' for '),
          lineBreak(),
          text('co-publication, data validation, '),
          text('and knowledge exchange.')
        ]
      }
    ]
  },
  {
    title: 'Phase 1',
    timeRange: 'Q3 - Q4, 2025',
    label: 'Ecosystem Activation & Innovation Fund',
    position: 'right',
    milestones: [
      {
        segments: [
          text('Launch of '),
          highlight('$50 Million AI–Web3'),
          lineBreak(),
          highlight('Innovation Fund, '),
          text('backing research, pilot'),
          lineBreak(),
          text('projects, and strategic acquisitions.')
        ]
      },
      {
        segments: [
          text('Open call for '),
          highlight('builders, researchers'),
          text(', and'),
          lineBreak(),
          highlight('startups'),
          text(' to apply for funding.')
        ]
      },
      {
        segments: [
          highlight('10+ pilot projects'),
          text('selected and '),
          lineBreak(),
          text('incubated under PSTAKE Research.')
        ]
      },
      {
        segments: [
          text('Publication of the '),
          highlight('AI + Web3 Market'),
          lineBreak(),
          highlight('Intelligence Report.'),
        ]
      },
      {
        segments: [
          text('Launch of the '),
          highlight('PSTAKE Pioneer'),
          lineBreak(),
          highlight('Ambassador Program:'),
        ],
        children: [
          {
            segments: [
              text('500+ applicants screened; '),
              highlight('30'),
              lineBreak(),
              highlight('selected as PSTAKE Elites.'),
            ]
          },
          {
            segments: [
              text('Ambassadors lead '),
              highlight('community-'),
              lineBreak(),
              highlight('driven research'),
              text(', translation, and education initiatives.')
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Phase 2',
    timeRange: 'Q1 - Q2, 2026',
    label: 'Applied Research',
    position: 'left',
    milestones: [
      {
        segments: [
          text('Dissemination of key '),
          highlight('research findings'),
          lineBreak(),
          text('for practical applications and builder adoption.')
        ]
      },
      {
        segments: [
          text('Research partnerships with '),
          highlight('leading'),
          lineBreak(),
          highlight('protocols'),
          lineBreak(),
          text('and '),
          highlight('institutional players'),
          text(' to drive cross-'),
          lineBreak(),
          text('sector adoption.')
        ]
      },
      {
        segments: [
          text('Expansion of the '),
          highlight('Innovation Fund'),
          text(' to support enterprise-level '),
          highlight('AI + Web3 collaborations'),
          text('.')
        ]
      }
    ]
  },
  {
    title: 'Phase 3',
    timeRange: 'Q3 - Q4, 2026',
    label: ['AI Implementation &', 'Applied Intelligence'],
    position: 'right',
    milestones: [
      {
        segments: [
          text('Deployment of'),
          highlight('AI-Driven Governance'),
          lineBreak(),
          highlight('Systems'),
          text(' for real-time policy simulations and adaptive protocol optimization.')
        ]
      },
      {
        segments: [
          text('Rollout of '),
          highlight('AI-Powered Provenance '),
          lineBreak(),
          highlight('Solutions '),
          text('in '),
          highlight('healthcare, music, '),
          text('and'),
          lineBreak(),
          highlight('financial data ecosystems.'),
        ]
      },
      {
        segments: [
          text('Collaboration with'),
          highlight('enterprise partners '),
          lineBreak(),
          text('for pilot integrations across'),
          highlight('supply'),
          lineBreak(),
          highlight('chain, fintech, '),
          text('and '),
          highlight('energy sectors.'),
        ]
      },
      {
        segments: [
          text('Culmination in the development of an'),
          lineBreak(),
          highlight('AI-as-a-Service (AiaS) Layer; '),
          text('enabling '),
          lineBreak(),
          text('adaptive, verifiable intelligence for Web3 ecosystems.')
        ]
      }
    ]
  },
  {
    title: 'Phase 4',
    timeRange: 'Q1 - Q2, 2027',
    label: 'Cross-Industry Integration',
    position: 'left',
    milestones: [
      {
        segments: [
          text('Expand PSTAKE Research into '),
          highlight('multi-sector collaborations'),
          text(': fintech, energy,'),
          lineBreak(),
          text(' logistics, and creative industries.')
        ]
      },
      {
        segments: [
          text('Establish '),
          highlight('interoperable AI standards'),
          text('for '),
          lineBreak(),
          text('data provenance, consent, and usage across blockchains.')
        ]
      },
      {
        segments: [
          text('Publish the '),
          highlight('AI x Web3 Industry'),
          highlight(' Integration Whitepaper '),
          text('highlighting'),
          lineBreak(),
          text('proven economic models.')
        ]
      },
      {
        segments: [
          text('Onboard '),
          highlight('enterprise partners'),
          text(' to run pilot'),
          lineBreak(),
          text('projects using AI-governed'),
          lineBreak(),
          text(' infrastructure.')
        ]
      }
    ]
  },
  {
    title: 'Phase 5',
    timeRange: 'Q3 - Q4, 2027',
    label: 'Global Research Alliances',
    position: 'right',
    milestones: [
      {
        segments: [
          text('Form the '),
          highlight('PSTAKE Research Alliance (PRA)'),
          lineBreak(),
          text('connecting universities, AI labs, and blockchain foundations worldwide.')
        ]
      },
      {
        segments: [
          text('Host annual '),
          highlight('AI + Web3 Symposium,'),
          lineBreak(),
          text('uniting researchers and policymakers to'),
          lineBreak(),
          text('set interoperability and ethics'),
          lineBreak(),
          text(' standards.')
        ]
      },
      {
        segments: [
          text('Launch '),
          highlight('cross-border AI data registries'),
          lineBreak(),
          text('powered by PSTAKE\'s provenance layer.')
        ]
      },
      {
        segments: [
          text('Co-develop '),
          highlight('education and certification'),
          lineBreak(),
          highlight('programs '),
          text('on decentralized AI research.')
        ]
      }
    ]
  },
  {
    title: 'Phase 6',
    timeRange: 'Q1 - Q2, 2028',
    label: 'Cross-Industry Integration',
    position: 'left',
    milestones: [
      {
        segments: [
          text('Launch of the '),
          highlight('PSTAKE Intelligence '),
          lineBreak(),
          highlight('Network'),
          text(' — an open, decentralized layer '),
          lineBreak(),
          text(' for verified AI systems.')
        ]
      },
      {
        segments: [
          text('Onboard '),
          highlight('industry and government'),
          lineBreak(),
          highlight('partners'),
          text('to utilize the Intelligence Layer for policy, finance, and infrastructure modeling.')
        ]
      },
      {
        segments: [
          text('Enable '),
          highlight('AI-native tokens and incentive '),
          lineBreak(),
          highlight('mechanisms'),
          text('for global research participation.')
        ]
      },
      {
        segments: [
          text('Full integration of '),
          highlight('AI, blockchain, and'),
          lineBreak(),
          highlight('real-world data flows'),
          text(' across finance, healthcare, and energy systems.')
        ]
      }
    ]
  }
];

const enContent: RoadmapContent = {
  hero: {
    firstLine: 'Building the',
    secondLinePrefix: 'Intelligence',
    secondLineSuffix: 'Layer',
    iconAlt: 'orbital accent',
    ctaLabel: 'PSTAKE Research Roadmap'
  },
  phases: sharedPhasesEn
};

const cnPhases: RoadmapPhaseContent[] = [
  {
    title: '阶段 0',
    timeRange: '2025 年 Q1 - Q2',
    label: '基础与研究层',
    position: 'left',
    milestones: [
      {
        segments: [
          text('上线 '),
          highlight('PSTAKE Research Hub'),
          lineBreak(),
          text('提供开放论文、仿真与协作实验。')
        ]
      },
      {
        segments: [
          text('围绕 '),
          highlight('音乐、医疗、供应链、基础设施与媒体'),
          text(' 等泛行业场景展开核心研究。')
        ]
      },
      {
        segments: [
          text('组建 '),
          highlight('PSTAKE 研究团队'),
          text('，聚合密码学、AI、治理与市场设计多学科专家。')
        ]
      },
      {
        segments: [
          text('与 '),
          highlight('高校与 AI 实验室'),
          text(' 建立战略合作，共同发表、校验数据并进行知识互换。')
        ]
      }
    ]
  },
  {
    title: '阶段 1',
    timeRange: '2025 年 Q3 - Q4',
    label: '生态激活与创新基金',
    position: 'right',
    milestones: [
      {
        segments: [
          text('启动 '),
          highlight('5,000 万美元 AI–Web3 创新基金'),
          lineBreak(),
          text('，支持研究、试点与并购。')
        ]
      },
      {
        segments: [
          text('面向 '),
          highlight('开发者、研究者与创业团队'),
          text(' 开放基金申请。')
        ]
      },
      {
        segments: [
          highlight('10+ 个试点项目'),
          text(' 入选并在 PSTAKE Research 孵化。')
        ]
      },
      {
        segments: [
          text('发布 '),
          highlight('AI + Web3 市场情报报告'),
          text('。')
        ]
      },
      {
        segments: [
          text('推出 '),
          highlight('PSTAKE Pioneer 大使计划'),
          text('：')
        ],
        children: [
          {
            segments: [
              text('筛选 500+ 申请者，'),
              highlight('30 名成为 PSTAKE Elites'),
              text('。')
            ]
          },
          {
            segments: [
              text('大使牵头 '),
              highlight('社区研究、翻译与教育项目'),
              text('。')
            ]
          }
        ]
      }
    ]
  },
  {
    title: '阶段 2',
    timeRange: '2026 年 Q1 - Q2',
    label: '应用型研究',
    position: 'left',
    milestones: [
      {
        segments: [
          text('发布关键 '),
          highlight('研究成果'),
          lineBreak(),
          text('，加速落地与 Builder 采用。')
        ]
      },
      {
        segments: [
          text('与 '),
          highlight('头部协议与机构'),
          lineBreak(),
          text('共建试点，推动跨行业应用。')
        ]
      },
      {
        segments: [
          text('扩容 '),
          highlight('创新基金'),
          text('，支持企业级 '),
          highlight('AI + Web3 协作'),
          text('。')
        ]
      }
    ]
  },
  {
    title: '阶段 3',
    timeRange: '2026 年 Q3 - Q4',
    label: ['AI 落地', '与智能执行'],
    position: 'right',
    milestones: [
      {
        segments: [
          text('部署 '),
          highlight('AI 驱动的治理系统'),
          text('，用于实时政策模拟与协议调优。')
        ]
      },
      {
        segments: [
          text('推出 '),
          highlight('AI 驱动的溯源方案'),
          text('，适配医疗、音乐与金融数据生态。')
        ]
      },
      {
        segments: [
          text('与 '),
          highlight('企业伙伴'),
          text(' 共建供应链、金融科技、能源场景的试点集成。')
        ]
      },
      {
        segments: [
          text('打造 '),
          highlight('AI-as-a-Service (AIaS) 智能层'),
          text('，为 Web3 经济提供可验证的智能服务。')
        ]
      }
    ]
  },
  {
    title: '阶段 4',
    timeRange: '2027 年 Q1 - Q2',
    label: '跨行业融合',
    position: 'left',
    milestones: [
      {
        segments: [
          text('拓展 '),
          highlight('多行业协作'),
          text('：金融、能源、物流、创意产业等。')
        ]
      },
      {
        segments: [
          text('制定 '),
          highlight('可互操作的 AI 标准'),
          text('，保障跨链数据来源、授权与使用。')
        ]
      },
      {
        segments: [
          text('发布 '),
          highlight('AI × Web3 行业融合白皮书'),
          lineBreak(),
          text('总结可验证的经济模型。')
        ]
      },
      {
        segments: [
          text('吸引 '),
          highlight('企业伙伴'),
          text(' 基于 AI 治理基础设施开展试点。')
        ]
      }
    ]
  },
  {
    title: '阶段 5',
    timeRange: '2027 年 Q3 - Q4',
    label: '全球研究联盟',
    position: 'right',
    milestones: [
      {
        segments: [
          text('成立 '),
          highlight('PSTAKE Research Alliance (PRA)'),
          text('，连接全球高校、AI 实验室与链上基金会。')
        ]
      },
      {
        segments: [
          text('举办年度 '),
          highlight('AI + Web3 峰会'),
          text('，汇集研究者与政策制定者，共商标准与伦理。')
        ]
      },
      {
        segments: [
          text('上线 '),
          highlight('跨境 AI 数据注册系统'),
          text('，由 PSTAKE 溯源层提供支持。')
        ]
      },
      {
        segments: [
          text('共建 '),
          highlight('教育与认证体系'),
          text('，聚焦去中心化 AI 研究。')
        ]
      }
    ]
  },
  {
    title: '阶段 6',
    timeRange: '2028 年 Q1 - Q2',
    label: '智能层部署',
    position: 'left',
    milestones: [
      {
        segments: [
          text('发布 '),
          highlight('PSTAKE Intelligence Network'),
          text('，打造开放、去中心化的可验证 AI 层。')
        ]
      },
      {
        segments: [
          text('引入 '),
          highlight('产业与公共部门伙伴'),
          text('，用于政策、金融与基础设施建模。')
        ]
      },
      {
        segments: [
          text('启用 '),
          highlight('AI 原生代币与激励机制'),
          text('，激发全球研究参与。')
        ]
      },
      {
        segments: [
          text('实现 '),
          highlight('AI、区块链与现实世界数据流'),
          text(' 在金融、医疗、能源场景的全面融合。')
        ]
      }
    ]
  }
];

const cnContent: RoadmapContent = {
  hero: {
    firstLine: '构建面向未来的',
    secondLinePrefix: '智能层',
    secondLineSuffix: '蓝图',
    iconAlt: '轨道装饰',
    ctaLabel: 'PSTAKE 研究路线图'
  },
  phases: cnPhases
};

const krPhases: RoadmapPhaseContent[] = [
  {
    title: 'Phase 0',
    timeRange: '2025년 1-2분기',
    label: '기초 및 리서치 레이어',
    position: 'left',
    milestones: [
      {
        segments: [
          text('오픈 액세스 논문·시뮬레이션·협업 실험을 담은 '),
          highlight('PSTAKE Research Hub'),
          lineBreak(),
          text('을 출시합니다.')
        ]
      },
      {
        segments: [
          text('음악, 헬스케어, 공급망, 인프라, 미디어 등 '),
          highlight('핵심 산업군'),
          text('을 대상으로 기초 연구를 진행합니다.')
        ]
      },
      {
        segments: [
          highlight('다학제 전문가'),
          text('로 구성된 '),
          highlight('PSTAKE 리서치 팀'),
          text('을 조직합니다.')
        ]
      },
      {
        segments: [
          text('공동 연구와 데이터 검증을 위해 '),
          highlight('대학 및 AI 연구소'),
          text('와 전략적 파트너십을 맺습니다.')
        ]
      }
    ]
  },
  {
    title: 'Phase 2',
    timeRange: '2026년 1-2분기',
    label: '응용 연구 단계',
    position: 'left',
    milestones: [
      {
        segments: [
          text('핵심 '),
          highlight('연구 결과'),
          text('를 공개해 빌더와 커뮤니티의 채택을 촉진합니다.')
        ]
      },
      {
        segments: [
          highlight('주요 프로토콜 및 기관'),
          text('과 협력해 교차 산업 시범 사업을 전개합니다.')
        ]
      },
      {
        segments: [
          highlight('Innovation Fund'),
          text('를 확대하여 기업 규모의 '),
          highlight('AI + Web3 협업'),
          text('을 지원합니다.')
        ]
      }
    ]
  },
  {
    title: 'Phase 4',
    timeRange: '2027년 1-2분기',
    label: '산업 간 통합',
    position: 'left',
    milestones: [
      {
        segments: [
          text('금융·에너지·물류·크리에이티브 산업 등 '),
          highlight('멀티 섹터 협업'),
          text('으로 연구 범위를 확장합니다.')
        ]
      },
      {
        segments: [
          text('데이터 출처·동의·사용을 위한 '),
          highlight('상호 운용 AI 표준'),
          text('을 수립합니다.')
        ]
      },
      {
        segments: [
          text('검증된 경제 모델을 담은 '),
          highlight('AI × Web3 산업 통합 백서'),
          text('를 발간합니다.')
        ]
      },
      {
        segments: [
          text('AI 거버넌스 인프라를 사용한 파일럿을 위해 '),
          highlight('기업 파트너'),
          text('를 온보딩합니다.')
        ]
      }
    ]
  },
  {
    title: 'Phase 6',
    timeRange: '2028년 1-2분기',
    label: '인텔리전스 레이어 배포',
    position: 'left',
    milestones: [
      {
        segments: [
          text('검증된 AI 시스템을 위한 개방형 레이어인 '),
          highlight('PSTAKE Intelligence Network'),
          text('를 출시합니다.')
        ]
      },
      {
        segments: [
          highlight('산업 및 공공 파트너'),
          text('를 온보딩해 정책·금융·인프라 모델링에 활용합니다.')
        ]
      },
      {
        segments: [
          highlight('AI 네이티브 토큰과 인센티브 구조'),
          text('를 도입해 글로벌 연구 참여를 장려합니다.')
        ]
      },
      {
        segments: [
          text('금융·헬스케어·에너지 전반에서 '),
          highlight('AI, 블록체인, 현실 데이터 흐름'),
          text('을 완전히 통합합니다.')
        ]
      }
    ]
  },
  {
    title: 'Phase 1',
    timeRange: '2025년 3-4분기',
    label: '에코시스템 활성화 & 혁신 펀드',
    position: 'right',
    milestones: [
      {
        segments: [
          text('연구·파일럿·인수를 지원하는 '),
          highlight('5천만 달러 AI–Web3 혁신 펀드'),
          text('를 개설합니다.')
        ]
      },
      {
        segments: [
          highlight('빌더·연구자·스타트업'),
          text('을 대상으로 공모를 진행합니다.')
        ]
      },
      {
        segments: [
          highlight('10개 이상의 파일럿'),
          text('을 선정해 PSTAKE Research에서 인큐베이팅합니다.')
        ]
      },
      {
        segments: [
          highlight('AI + Web3 마켓 인텔리전스 리포트'),
          text('를 발행합니다.')
        ]
      },
      {
        segments: [
          text(''),
          highlight('PSTAKE Pioneer 앰배서더 프로그램'),
          text('을 시작합니다:')
        ],
        children: [
          {
            segments: [
              text('500+ 지원자 중 '),
              highlight('30명을 PSTAKE Elites'),
              text('로 선발합니다.')
            ]
          },
          {
            segments: [
              text('앰배서더가 '),
              highlight('커뮤니티 주도의 연구·번역·교육'),
              text('을 이끕니다.')
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Phase 3',
    timeRange: '2026년 3-4분기',
    label: ['AI 구현', '및 지능형 운영'],
    position: 'right',
    milestones: [
      {
        segments: [
          text('실시간 정책 시뮬레이션과 프로토콜 최적화를 위한 '),
          highlight('AI 기반 거버넌스 시스템'),
          text('을 배포합니다.')
        ]
      },
      {
        segments: [
          highlight('AI 기반 프로비넌스 솔루션'),
          text('을 헬스케어·음악·금융 데이터 영역에 적용합니다.')
        ]
      },
      {
        segments: [
          highlight('엔터프라이즈 파트너'),
          text('와 협력하여 공급망·핀테크·에너지 파일럿을 실행합니다.')
        ]
      },
      {
        segments: [
          highlight('AI-as-a-Service (AIaS) 레이어'),
          text('를 개발해 Web3 경제에 검증 가능한 지능을 제공합니다.')
        ]
      }
    ]
  },
  {
    title: 'Phase 5',
    timeRange: '2027년 3-4분기',
    label: '글로벌 리서치 얼라이언스',
    position: 'right',
    milestones: [
      {
        segments: [
          text('전 세계 대학·AI 연구소·블록체인 재단을 잇는 '),
          highlight('PSTAKE Research Alliance (PRA)'),
          text('를 설립합니다.')
        ]
      },
      {
        segments: [
          text('연구자와 정책 입안자를 연결하는 연례 '),
          highlight('AI + Web3 심포지엄'),
          text('을 개최합니다.')
        ]
      },
      {
        segments: [
          highlight('국경 간 AI 데이터 레지스트리'),
          text('를 PSTAKE 프로비넌스 레이어 위에서 구동합니다.')
        ]
      },
      {
        segments: [
          highlight('탈중앙화 AI 연구 교육·인증 프로그램'),
          text('을 공동 개발합니다.')
        ]
      }
    ]
  }
];

const krContent: RoadmapContent = {
  hero: {
    firstLine: '함께 완성하는',
    secondLinePrefix: '지능 레이어',
    secondLineSuffix: '로드맵',
    iconAlt: '궤도 아이콘',
    ctaLabel: 'PSTAKE 리서치 로드맵'
  },
  phases: krPhases
};

export const roadmapContent: Record<Locale, RoadmapContent> = {
  en: enContent,
  cn: cnContent,
  kr: krContent
};
