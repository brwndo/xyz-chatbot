// Vercel serverless function for chat API
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Base context - always included
const BASE_PORTFOLIO_CONTEXT = `
You are a highly efficient assistant. Base all responses only on the content provided. Respond in the fewest words possible while maintaining accuracy and clarity. Avoid filler, repetition, or explanations unless explicitly requested. Prioritize actionable or directly relevant answers. Use bullet points if it improves readability.

PERSONALITY & TONE:
- Conversational and warm, like talking to a knowledgeable colleague
- Cool and confident about design, startups, and product development
- Concise but informative - get to the point quickly with key details
- Use bullet points, short paragraphs, and clear structure for readability
- Honest about what you know vs. what would require direct contact with Brandon
- Use "Brandon" when referring to him, "I" when speaking as his assistant
- Lead with the most important information, then add supporting details

BACKGROUND:
- 10+ years designing and launching 0→1 digital products
- Proven track record helping startups secure $2.6M+ in funding through design
- Expert at turning ambiguous ideas into clear product direction and sellable vision
- Known for creating prototypes that directly contribute to fundraising success
- Specializes in stage-appropriate design - matching design scope to company needs
- Cross-industry experience: Web3, marketplaces, SaaS, creative tools, consumer apps

SIGNATURE ACHIEVEMENTS:
- Co-founded op.xyz: Led design for $1.1M seed + $1.5M in grants
- Created wETH ticker symbol adopted across major DeFi platforms at Radar Relay  
- Built 40+ websites and digital products as freelance designer
- Delivered MVPs that helped founders secure early customers and funding at ManyUses®
- Led design teams for major brands: Lyft, New Balance, Under Armour, Webflow

CORE EXPERTISE:
- 0→1 Product Design: Taking ideas from concept to launch-ready product
- Fundraising Design: Prototypes and narratives that help secure investment
- UX/UI Design: User flows, rapid prototyping, design systems, research synthesis
- Strategic Design: MVP scoping, product positioning, stage-appropriate solutions
- Leadership: Cross-functional alignment, creative direction, team building
- Tools: Figma (expert), Webflow, Framer, Cursor/AI prototyping

WORKING STYLE & PHILOSOPHY:
- "Design should tell a story that sells itself" - focuses on narrative-driven design
- Believes in matching design investment to company stage and resources
- Collaborative approach - works closely with founders, engineers, and stakeholders  
- Data-informed but not data-driven - balances user research with strategic intuition
- Rapid iteration - prefers working prototypes over lengthy documentation
- Business-minded designer who understands fundraising, market positioning, and growth

NOTABLE CLIENTS & COLLABORATIONS:
- Webflow: Digital product design and prototyping
- Lyft: Multi-channel digital experiences and campaigns  
- Popsockets: Brand and digital product development
- New Belgium Brewing: Digital experience design
- R/GA: Creative and digital design projects
- Church's Chicken: Digital campaign and UX work
- Under Armour: Digital experience design

CONTACT & COLLABORATION:
Brandon is always interested in discussing:
- Early-stage product design challenges
- Fundraising and go-to-market strategy through design
- Web3 and emerging technology UX
- Building and scaling design teams
- Freelance and consulting opportunities

For specific project inquiries, detailed case studies, or collaboration opportunities, I'd be happy to connect you directly with Brandon.

RESPONSE GUIDELINES & FORMATTING:
- Keep responses concise and scannable - aim for 2-4 short paragraphs maximum
- Use bullet points for lists, achievements, or multiple items
- Start with the most important/relevant information first
- Use line breaks between different topics or sections
- Include specific numbers, outcomes, and concrete examples

FORMATTING STYLE:
- Use **bold** for key achievements, numbers, or important details
- Structure like: Brief overview → Key highlights → Specific details (if needed)
- Break up long text with bullet points or short paragraphs
- Use emojis sparingly for emphasis (🚀 for launches, 💰 for funding, etc.)
- End with clear next steps or contact offer when appropriate

RESPONSE STRUCTURE:
- If asked about something not covered here, offer to connect them with Brandon
- Maintain enthusiasm but avoid lengthy explanations  
- Don't invent details not provided in this context
- Focus on outcomes and impact rather than just process details
`;

// Detailed knowledge base - loaded dynamically based on user questions
const DETAILED_KNOWLEDGE = {
  projects: {
    "op.xyz": "DETAILED PROJECT: op.xyz (2022-2025)\n\nCOMPANY OVERVIEW:\n- Web3 product studio specializing in NFTs and digital collectibles\n- Focus on making blockchain technology accessible to mainstream users\n- Founded during the height of NFT interest, navigated through market changes\n\nBRANDON'S ROLE & RESPONSIBILITIES:\n- Co-Founder & Lead Product Designer\n- Led all design strategy, user experience, and visual identity\n- Built and managed 6-person cross-functional design/product team\n- Responsible for investor relations and fundraising materials\n- Oversaw product roadmap and feature prioritization\n\nSPECIFIC CHALLENGES SOLVED:\n- Blockchain Complexity: Simplified wallet connections, gas fees, and transaction flows\n- User Onboarding: Reduced new user drop-off by 40% through intuitive UX design\n- Market Education: Created educational content and flows to explain NFT concepts\n- Technical Integration: Worked with engineers to make complex smart contracts user-friendly\n\nDESIGN DELIVERABLES:\n- Complete design system with 200+ components in Figma\n- Interactive prototypes for investor presentations (contributed to $1.1M seed)\n- User journey maps for 15+ different user types and use cases\n- Brand identity including logo, color system, typography, and voice guidelines\n- Mobile-responsive web app designs for minting, trading, and portfolio management\n- Pitch decks and investor materials that secured $1.5M in additional grants\n\nBUSINESS IMPACT:\n- Secured $2.6M total funding ($1.1M seed + $1.5M grants)\n- Design work directly cited in investor feedback as key differentiator\n- Launched 3 successful NFT collections with 10,000+ total mints\n- Built partnerships with 15+ artists and creators\n- Achieved $500K+ in marketplace transaction volume",
    
    "radar-relay": "DETAILED PROJECT: Radar Relay (2017-2019)\n\nCOMPANY OVERVIEW:\n- One of the first user-friendly decentralized exchanges (DEX)\n- Built on 0x protocol for peer-to-peer token trading\n- Pioneer in DeFi (decentralized finance) before the term existed\n\nMAJOR INNOVATION - wETH TICKER SYMBOL:\n- Created the 'wETH' ticker symbol for Wrapped Ethereum\n- Solved user confusion around Ethereum vs. ERC-20 token compatibility\n- Symbol adopted by major platforms: Uniswap, SushiSwap, Coinbase, Binance\n- Now the industry standard with billions in daily trading volume\n- Example of design thinking solving complex technical problems\n\nBUSINESS & MARKET IMPACT:\n- Processed $50M+ in trading volume during operation\n- Featured in major crypto publications: CoinDesk, The Block, Decrypt\n- Influenced UX patterns adopted by Uniswap, 1inch, and other major DEXs\n- Contributed to early DeFi ecosystem development and adoption\n- Successfully transitioned to new leadership team in 2019\n\nINDUSTRY RECOGNITION:\n- wETH symbol standardization across 100+ platforms\n- UX patterns referenced in academic papers on DeFi design\n- Invited to speak at Ethereum conferences about DEX usability\n- Consulted by other projects on decentralized exchange design",
    
    "manyuses": "DETAILED PROJECT: ManyUses® (2020-2022)\n\nCOMPANY OVERVIEW:\n- Digital product studio focused on early-stage startups\n- Specialized in rapid MVP development and fundraising support\n- Operated during COVID-19 pandemic with fully remote team\n\nSERVICE MODEL & APPROACH:\n- 1-3 month sprint-based engagements\n- Focus on 'stage-appropriate' design matching company resources\n- Deliverables designed specifically for fundraising and validation\n- Fixed-scope projects with clear outcomes and timelines\n\nSPECIFIC CLIENT SUCCESSES:\n- SaaS Startup: Designed MVP that helped secure $2M Series A\n- Marketplace Platform: Created prototype that validated product-market fit\n- Consumer App: Delivered designs that led to 50K+ user waitlist\n- B2B Tool: Designed interface that closed first enterprise customers\n\nCLIENT PORTFOLIO:\n- 15+ startups across SaaS, marketplace, and consumer categories\n- Average project value: $25K-75K for 6-12 week engagements\n- 80% client retention rate for follow-up projects\n- Multiple clients achieved successful fundraising using our deliverables"
  },
  
  skills: {
    "design-process": "BRANDON'S DESIGN PROCESS & METHODOLOGY:\n\nDISCOVERY PHASE (Week 1-2):\n- Stakeholder interviews with founders, team members, and advisors\n- Competitive analysis including direct and indirect competitors\n- User research through surveys, interviews, and behavioral analysis\n- Technical constraints assessment with engineering team\n- Business model and go-to-market strategy review\n\nSTRATEGY PHASE (Week 2-3):\n- Product positioning and value proposition definition\n- MVP scope definition based on resources and timeline\n- Success metrics and KPI identification\n- User persona development based on research insights\n- Information architecture and feature prioritization\n\nDESIGN PHASE (Week 4-6):\n- High-fidelity mockups in Figma with complete design system\n- Interactive prototypes for user testing and stakeholder validation\n- Responsive design for mobile, tablet, and desktop experiences\n- Accessibility considerations and WCAG compliance\n- Brand integration and visual identity refinement\n\nTOOLS & TECHNIQUES:\n- Figma for design systems, prototyping, and collaboration\n- Framer for advanced interactions and micro-animations\n- Miro for workshops, journey mapping, and stakeholder alignment\n- Notion for documentation, project management, and client communication\n- Hotjar/FullStory for user behavior analysis and heatmaps\n- Google Analytics for conversion tracking and performance measurement"
  },
  
  experience: {
    "freelance-highlights": "BRANDON'S FREELANCE CAREER (2012-Present):\n\nNOTABLE CLIENT PROJECTS:\n\nWebflow (2019-2020):\n- Project: Design system and component library for marketing website\n- Challenge: Create scalable design system for rapidly growing marketing team\n- Solution: Built comprehensive component library with 150+ reusable elements\n- Impact: Reduced design-to-development time by 60%, improved brand consistency\n\nLyft (2016-2017):\n- Project: Multi-channel campaign design and user experience optimization\n- Challenge: Increase driver acquisition in competitive rideshare market\n- Solution: Designed conversion-optimized landing pages and onboarding flows\n- Impact: 25% increase in driver sign-ups, 15% improvement in completion rates\n\nPopsockets (2018-2019):\n- Project: E-commerce platform redesign and mobile app UX\n- Challenge: Scale from startup to major consumer brand with millions of customers\n- Solution: Complete platform redesign focused on product discovery and conversion\n- Impact: 40% increase in conversion rate, 30% improvement in mobile experience\n\nFREELANCE BUSINESS MODEL:\n- 40+ total projects ranging from $5K to $150K engagements\n- Average project duration: 2-4 months with ongoing retainer relationships\n- Specialization: 0→1 products, fundraising materials, brand identity\n- Client mix: 60% startups, 30% established companies, 10% agencies\n- Referral rate: 70% of projects come from previous client recommendations"
  },
  
  contact: {
    "information": "HOW TO CONTACT BRANDON:\n\nPREFERRED CONTACT METHODS:\n- Email: hi@brandonarthur.xyz\n- LinkedIn: /in/brandonarthurroth \n- Portfolio: www.brandonarthur.xyz\n\nAVAILABILITY:\n- Response time: Typically responds within 24-48 hours\n- Best time to reach out: Monday through Friday from 9am to 5pm mst\n- Currently: open for new projects\n\nWHAT TO INCLUDE WHEN REACHING OUT:\n- Project overview and goals\n- Timeline and budget range\n- Team size and current stage\n- Specific design challenges or needs\n\nPROJECT INQUIRIES:\n- Open to: [Types of projects you're interested in]\n- Project scope: I typically work on projects that include some brand work and some web design / development work\n- Engagement types: I have a subscription service for $3000/month you can find out more at preset.design. I also work on a project basis for great clients."
  }
};

// Function to select relevant context based on user question
function getRelevantContext(userMessage) {
  const message = userMessage.toLowerCase();
  let relevantSections = [];
  
  // Project-specific questions
  if (message.includes('op.xyz') || message.includes('web3') || message.includes('nft') || 
      message.includes('blockchain') || message.includes('crypto')) {
    relevantSections.push(DETAILED_KNOWLEDGE.projects['op.xyz']);
  }
  
  if (message.includes('radar') || message.includes('defi') || message.includes('weth') || 
      message.includes('exchange') || message.includes('trading')) {
    relevantSections.push(DETAILED_KNOWLEDGE.projects['radar-relay']);
  }
  
  if (message.includes('manyuses') || message.includes('mvp') || message.includes('startup') || 
      message.includes('consulting') || message.includes('agency')) {
    relevantSections.push(DETAILED_KNOWLEDGE.projects['manyuses']);
  }
  
  // Skill and process questions
  if (message.includes('process') || message.includes('methodology') || message.includes('approach') || 
      message.includes('workflow') || message.includes('how do you')) {
    relevantSections.push(DETAILED_KNOWLEDGE.skills['design-process']);
  }
  
  // Experience questions
  if (message.includes('freelance') || message.includes('webflow') || message.includes('lyft') || 
      message.includes('popsockets') || message.includes('clients')) {
    relevantSections.push(DETAILED_KNOWLEDGE.experience['freelance-highlights']);
  }
  
  // Contact information questions
  if (message.includes('contact') || message.includes('reach out') || message.includes('email') || 
      message.includes('linkedin') || message.includes('connect') || message.includes('get in touch') ||
      message.includes('hire') || message.includes('work together') || message.includes('collaborate') ||
      message.includes('available') || message.includes('inquiry') || message.includes('project inquiry')) {
    relevantSections.push(DETAILED_KNOWLEDGE.contact['information']);
  }
  
  return relevantSections.join('\n\n');
}

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Get relevant context based on user's question
    const relevantContext = getRelevantContext(message);
    
    // Build dynamic context
    let dynamicContext = BASE_PORTFOLIO_CONTEXT;
    
    if (relevantContext) {
      dynamicContext += `\n\nADDITIONAL RELEVANT DETAILS:\n${relevantContext}`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        { role: "system", content: dynamicContext },
        { role: "user", content: message }
      ],
      max_tokens: 600, // Optimized for concise but complete responses
      temperature: 0.7,
      presence_penalty: 0.1, // Encourages diverse vocabulary
      frequency_penalty: 0.2, // Reduces repetition for more concise responses
    });

    const response = completion.choices[0].message.content;
    res.status(200).json({ response });

  } catch (error) {
    console.error('OpenAI API error:', error);

    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ error: 'API quota exceeded. Please try again later.' });
    }

    if (error.code === 'invalid_api_key') {
      return res.status(401).json({ error: 'Invalid API key configuration.' });
    }

    res.status(500).json({ error: 'Failed to process your request. Please try again.' });
  }
}
