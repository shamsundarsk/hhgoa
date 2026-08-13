const TITLE_PATTERNS: Array<{
  keywords: string[];
  titles: string[];
}> = [
  {
    keywords: ['AI', 'PYTHON', 'ML', 'LLM', 'PYTORCH', 'TENSORFLOW', 'LANGCHAIN'],
    titles: [
      'THE DATA ALCHEMIST',
      'THE TENSOR SHAMAN',
      'THE NEURAL ARCHITECT',
      'THE MODEL WHISPERER',
      'THE SYNTHETIC INTELLECT'
    ]
  },
  {
    keywords: ['RUST', 'LINUX', 'C++', 'C', 'SYSTEMS', 'OS', 'KERNEL', 'EMBEDDED'],
    titles: [
      'THE LOW-LEVEL WIZARD',
      'THE BARE-METAL OPERATOR',
      'THE MEMORY GUARDIAN',
      'THE KERNEL HACKER',
      'THE RUSTACEAN COMMANDER'
    ]
  },
  {
    keywords: ['THREE.JS', 'WEBGL', 'FIGMA', 'ANIMATION', 'CSS', 'CANVAS', 'DESIGN', 'SHADERS'],
    titles: [
      'THE PIXEL ARCHITECT',
      'THE SHADER WEAVER',
      'THE DIMENSIONAL ARTIST',
      'THE VECTOR SAMURAI',
      'THE UI OVERLORD'
    ]
  },
  {
    keywords: ['NEXT.JS', 'SUPABASE', 'TYPESCRIPT', 'REACT', 'POSTGRES', 'NODE'],
    titles: [
      'THE SHIP MACHINE',
      'THE FULL-STACK WARRIOR',
      'THE ZERO-TO-ONE ENGINE',
      'THE PRODUCT FORGE',
      'THE REPO WRANGLER'
    ]
  },
  {
    keywords: ['SOLANA', 'WEB3', 'ETHEREUM', 'CRYPTO', 'SMART CONTRACTS', 'SOLIDITY'],
    titles: [
      'THE ON-CHAIN PROTOCOL',
      'THE DECENTRALIZED ALCHEMIST',
      'THE BLOCKCHAIN ARCHITECT',
      'THE PROOF OF WORKER'
    ]
  },
  {
    keywords: ['GO', 'DOCKER', 'KUBERNETES', 'AWS', 'DEVOPS', 'GRAPHQL'],
    titles: [
      'THE DISTRIBUTED WITCH',
      'THE INFRASTRUCTURE MONK',
      'THE CONTAINER COMMANDER',
      'THE PIPELINE TITAN'
    ]
  }
];

const GENERIC_TITLES = [
  'THE NIGHT BUILDER',
  'THE SIGNAL CREATOR',
  'THE GOA HACKER',
  'THE SHIPPER OF THINGS',
  'THE CODE CRAFTSMAN',
  'THE PROTO-TYPER',
  'THE RECURSIVE MAKER',
  'THE TERMINAL SURFER',
  'THE ZERO-SLEEP ENGINE',
  'THE INTENTIONAL BUILDER'
];

export function deriveTitleFromStack(stack: string[], role: string): string {
  const combined = [...stack, role].map(s => s.toUpperCase().trim());
  
  for (const pattern of TITLE_PATTERNS) {
    const matches = pattern.keywords.some(kw => 
      combined.some(item => item.includes(kw) || kw.includes(item))
    );
    if (matches) {
      // Pick first title deterministically or based on stack length
      const index = (combined.join('').length) % pattern.titles.length;
      return pattern.titles[index];
    }
  }

  // Fallback if no specific stack keyword matched
  if (role.toLowerCase().includes('design') || role.toLowerCase().includes('ui')) {
    return 'THE PIXEL ARCHITECT';
  }
  if (role.toLowerCase().includes('ai') || role.toLowerCase().includes('data')) {
    return 'THE DATA ALCHEMIST';
  }
  if (role.toLowerCase().includes('system') || role.toLowerCase().includes('backend')) {
    return 'THE LOW-LEVEL WIZARD';
  }

  return GENERIC_TITLES[0];
}

export function getRandomBuilderTitle(currentTitle?: string): string {
  const allTitles = [...TITLE_PATTERNS.flatMap(p => p.titles), ...GENERIC_TITLES];
  const filtered = currentTitle ? allTitles.filter(t => t !== currentTitle) : allTitles;
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex] || 'THE DATA ALCHEMIST';
}
