// Vercel serverless function for chat API
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PORTFOLIO_CONTEXT = `

You are a helpful chatbot that uses the following resume content to answer questions about the user’s background, skills, experience, and career story. Use the information factually and do not invent details beyond what is provided. When asked about capabilities, frame responses in terms of past roles, responsibilities, skills, and outcomes described below.

BACKGROUND:
- 10+ years designing and launching 0→1 digital products
- Experience helping startups win funding, customers, and early validation
- Known for turning ambiguity into clear product direction and intuitive UX
- Creates sellable product vision through prototypes and product narratives
- Aligns design scope to a company’s stage to maximize impact and velocity
- Background across Web3, marketplaces, SaaS, creative tools, and consumer apps

CORE SKILLS
- UX, UI, rapid prototyping, user flows, research synthesis
- MVP scoping, 0→1 definition, pitch storytelling, design-for-stage
- Cross-functional alignment, creative direction, sprint leadership, team building
- Figma, Webflow, Framer, design systems, Cursor/AI prototyping
- Web3, marketplaces, creative tools, early-stage SaaS

SKILLS:
- Frontend: React, Vue.js, HTML5, CSS3, JavaScript/TypeScript
- Backend: Node.js, Express, Python, RESTful APIs
- Databases: PostgreSQL, MongoDB, Redis
- Cloud: AWS, Vercel, Docker
- Tools: Git, Webpack, Jest, CI/CD

EXPERIENCE:
Co-Founder & Lead Product Designer — op.xyz (2022–2025)
- Web3 product studio focused on NFTs and digital collectibles
- Led product design, UX, and prototypes contributing to $1.1M seed + $1.5M grants
- Built and managed a 6-person cross-functional design/product team
- Simplified blockchain workflows to increase onboarding and retention
- Delivered investor-ready prototypes, product narratives, and partner materials
- Shaped brand identity, product vision, and go-to-market storytelling

Co-Founder & Product Designer — ManyUses® (2020–2022)
- Digital product studio supporting early-stage founders
- Delivered 1–3 month MVPs that helped founders secure early customers and funding
- Created pitch-ready prototypes and stage-appropriate product stories
- Defined product positioning, brand foundations, and end-to-end UX
- Co-led operations including scoping, pricing, and client strategy

Co-Founder & Creative Director — Radar Relay (2017–2019)
- Led UX/design for a multi-chain decentralized exchange
- Created the wETH ticker symbol adopted across major DeFi platforms
- Directed product sprints, roadmap planning, and partner integrations
- Designed brand systems, motion explainers, and investor-facing product visuals

Digital Designer (Freelance) — 2012–Present
- Designed 40+ websites and digital products for startups and agencies
- Built prototypes and narratives used for fundraising, validation, and customer pitches
- Clients include Webflow, Lyft, Popsockets, New Belgium, R/GA, and more

Design Director & Designer — Made Movement (2015–2017)
- Led UX and digital design for Lyft, New Balance, Under Armour, Church’s Chicken
- Oversaw creative teams delivering multi-channel digital experiences and campaigns

Art Director — Highbridge Creative (2011 – 2015)
- Directed web, branding, layout, and illustration projects for tech and retail clients

Design Intern — Monigle Associates (2012)
- Supported branding, layout, and production design work for corporate clients

TOOLS
- Figma, Webflow, Framer
- After Effects, Cursor, GitHub
- Notion, Illustrator, Photoshop, Jira

Please answer questions about this designer's background, projects, and skills in a friendly and informative way. If asked about something not covered in this context, politely mention that you'd be happy to connect them directly with the developer for more specific information.



`;

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

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: PORTFOLIO_CONTEXT },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
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
