export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageQuery: string;
  coordinates: [number, number];
  location: string;
  content: {
    intro: string;
    sections: Array<{
      heading: string;
      text: string;
    }>;
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "osteria-francescana-modena",
    title: "Osteria Francescana: A Three-Michelin-Star Experience in Modena",
    excerpt: "Massimo Bottura's legendary restaurant delivers an unforgettable culinary journey that challenges Italian tradition while honoring its roots. This is dining as art.",
    date: "January 28, 2026",
    readTime: "8 min read",
    category: "Fine Dining",
    imageQuery: "sourdough bread rustic",
    coordinates: [44.6471, 10.9252],
    location: "Modena, Italy",
    content: {
      intro: "Walking into Osteria Francescana feels like stepping into a contemporary art gallery—which makes sense, given Massimo Bottura's obsession with art and culture. This three-Michelin-star restaurant in Modena, Italy isn't just a meal; it's a statement about what Italian cuisine can become when tradition meets radical creativity.",
      sections: [
        {
          heading: "The Atmosphere",
          text: "The dining room is intimate, with only 12 tables, creating an exclusive yet surprisingly warm environment. Modern art adorns the walls, and the lighting is carefully calibrated to highlight each dish as it arrives. The service is impeccable—attentive without being intrusive, knowledgeable without being pretentious. You feel like you're in on a secret."
        },
        {
          heading: "The Tasting Menu",
          text: "We opted for the full tasting menu, and each course was a revelation. The 'Five Ages of Parmigiano Reggiano' showcased the cheese in textures from crunchy to creamy, demonstrating Bottura's ability to deconstruct familiar ingredients. The 'Oops! I Dropped the Lemon Tart' was simultaneously playful and technically brilliant—a deconstructed dessert that looked like an accident but tasted like precision."
        },
        {
          heading: "Final Verdict",
          text: "At €350 per person (before wine), this is undeniably a splurge. But it's also one of the most memorable dining experiences you'll ever have. Every dish tells a story, and Bottura's passion for pushing boundaries while respecting tradition is palpable. If you can secure a reservation—book months in advance—it's worth every euro. Rating: ★★★★★"
        }
      ]
    }
  },
  {
    slug: "thai-street-food-bangkok",
    title: "Jay Fai: Bangkok's Legendary Street Food Queen",
    excerpt: "This Michelin-starred street food stall serves some of the best crab omelette you'll ever taste. Yes, street food. Yes, Michelin star. Yes, absolutely worth it.",
    date: "January 25, 2026",
    readTime: "5 min read",
    category: "Street Food",
    imageQuery: "thai green curry bowl",
    coordinates: [13.7563, 100.5018],
    location: "Bangkok, Thailand",
    content: {
      intro: "Jay Fai isn't your typical street food vendor. She's a 77-year-old culinary legend who cooks over roaring charcoal flames while wearing her signature ski goggles to protect against the heat. Her tiny Bangkok stall earned a Michelin star, and the hype is completely justified.",
      sections: [
        {
          heading: "The Famous Crab Omelette",
          text: "The khai jiao pu (crab omelette) is what made Jay Fai famous, and it lives up to every bit of hype. Massive chunks of fresh crab meat are folded into fluffy, golden eggs and wok-fried to perfection. It arrives at your table looking almost architectural—crispy on the outside, impossibly tender inside. At 1,000 baht (about $30), it's expensive for street food, but the portion is generous and the quality is unmatched."
        },
        {
          heading: "The Wait",
          text: "Here's the thing: Jay Fai cooks everything herself, one dish at a time. We waited nearly two hours for a table, then another hour for our food. Bring patience, bring good company, and maybe bring a book. The wait is part of the experience, and watching her work the wok like a conductor leading an orchestra makes the time pass faster."
        },
        {
          heading: "Worth the Hype?",
          text: "Absolutely. This is Bangkok street food elevated to an art form without losing its soul. The drunken noodles are phenomenal, the tom yum is electric with flavor, and that crab omelette? It's the stuff of culinary legend. Go early, expect a wait, and prepare for one of the best meals of your life. Rating: ★★★★★"
        }
      ]
    }
  },
  {
    slug: "noma-copenhagen-review",
    title: "Noma Copenhagen: Foraging Meets Fine Dining",
    excerpt: "René Redzepi's groundbreaking restaurant redefined Nordic cuisine and continues to push boundaries. But is it still worth the pilgrimage?",
    date: "January 20, 2026",
    readTime: "10 min read",
    category: "Fine Dining",
    imageQuery: "chocolate chip cookies stack",
    coordinates: [55.6761, 12.5683],
    location: "Copenhagen, Denmark",
    content: {
      intro: "Noma has been called the best restaurant in the world multiple times, and it's certainly the most influential of the past two decades. René Redzepi's hyperlocal, foraged-focused approach changed how we think about fine dining. But with so many imitators, does the original still stand out?",
      sections: [
        {
          heading: "The Seasonal Menus",
          text: "Noma operates on three seasonal menus: vegetable season, game season, and ocean season. We visited during ocean season, and the focus on seafood from Nordic waters was extraordinary. Dishes featured sea urchin, mahogany clams, and incredibly fresh fish, all prepared with techniques that highlighted rather than masked their natural flavors. The presentation was stunning—edible landscapes that looked almost too beautiful to eat."
        },
        {
          heading: "Innovation and Technique",
          text: "What separates Noma from its imitators is the depth of technique behind the seemingly simple presentations. Fermentation plays a huge role—aged berry vinegars, koji-cured seafood, and house-made misos add layers of umami. Each bite reveals complexity that isn't immediately obvious. This is cooking that respects ingredients while pushing culinary boundaries."
        },
        {
          heading: "The Investment",
          text: "At around €500 per person with wine pairings, Noma is a significant investment. The meal lasts 3-4 hours, and reservations require planning months ahead. Is it worth it? If you're a serious food enthusiast, yes. The experience is educational, inspiring, and delicious. But if you're expecting comfort or indulgence, this might not be your restaurant. It's challenging, thought-provoking dining. Rating: ★★★★½"
        }
      ]
    }
  },
  {
    slug: "barcelona-tapas-bar",
    title: "Cal Pep: Barcelona's Best Kept Secret for Tapas",
    excerpt: "This bustling tapas bar near the Picasso Museum serves some of the freshest seafood in Barcelona. No reservations, no frills, just incredible food.",
    date: "January 15, 2026",
    readTime: "6 min read",
    category: "Casual Dining",
    imageQuery: "summer salad colorful vegetables",
    coordinates: [41.3851, 2.1734],
    location: "Barcelona, Spain",
    content: {
      intro: "Cal Pep is the antithesis of a tourist trap. Located in El Born, this small tapas bar doesn't take reservations, doesn't have a fancy interior, and absolutely doesn't need either. The seafood is spectacular, the atmosphere is electric, and the value is outstanding.",
      sections: [
        {
          heading: "Counter Seating Only",
          text: "There are no tables at Cal Pep—just counter seating where you can watch the chefs work their magic. Arrive when they open (7:30 PM) or prepare to wait. We got there at 7:15 and still had a 20-minute wait. But watching the kitchen hustle while sipping vermouth made the time fly."
        },
        {
          heading: "Let Pep Guide You",
          text: "Here's the secret: don't overthink the menu. Tell them what you like and let the staff guide you. We ended up with clams in white wine sauce that tasted like the ocean, perfectly grilled baby squid, the sweetest prawns I've ever had, and their famous tortilla española—creamy, rich, and addictive. Everything tasted impossibly fresh because it probably came off a boat that morning."
        },
        {
          heading: "Exceptional Value",
          text: "We ate until we were stuffed, drank wine, and the bill came to about €40 per person. In a city where mediocre paella costs twice that, Cal Pep is a steal. The quality rivals upscale restaurants charging triple. This is Barcelona at its best—authentic, unpretentious, and absolutely delicious. Rating: ★★★★★"
        }
      ]
    }
  },
  {
    slug: "new-york-steakhouse-review",
    title: "Peter Luger Steak House: Is the Hype Justified?",
    excerpt: "This Brooklyn institution has been serving dry-aged porterhouse since 1887. But does it still deserve its legendary status in today's competitive steak scene?",
    date: "January 10, 2026",
    readTime: "7 min read",
    category: "Steakhouse",
    imageQuery: "braised short ribs red wine",
    coordinates: [40.7092, -73.9626],
    location: "Brooklyn, New York",
    content: {
      intro: "Peter Luger has been a New York institution for over 130 years. It's won every award, earned every accolade, and maintains a loyal following that borders on cult-like. But in an era of modernized steakhouses with craft cocktails and Instagram-worthy sides, does this old-school Brooklyn legend still deliver?",
      sections: [
        {
          heading: "The Porterhouse",
          text: "Let's get to the point: the dry-aged porterhouse is exceptional. It arrives sizzling in butter, already sliced, with a deeply caramelized crust and a rich, funky aged-beef flavor that you simply can't find in wet-aged steaks. The meat quality is undeniable—USDA Prime beef dry-aged on-site for 28 days. For steak purists, this is as good as it gets."
        },
        {
          heading: "The Experience",
          text: "Peter Luger hasn't changed much since 1887, and that's both its charm and its limitation. The dining room is no-frills—wooden tables, gruff waiters, and an atmosphere that says 'we don't need to impress you.' They only accept their own Peter Luger card or cash (no major credit cards!), which feels anachronistic. The sides are basic—decent but nothing special. This place is about the steak, period."
        },
        {
          heading: "Value Proposition",
          text: "At around $150 per person (porterhouse for two, split with sides and drinks), it's expensive but not outrageous for high-end steak. The question is whether you value tradition and uncompromising quality over modern amenities. If you want the best steak in New York, Peter Luger delivers. If you want a well-rounded upscale dining experience, there are better options. Rating: ★★★★"
        }
      ]
    }
  },
  {
    slug: "tokyo-ramen-shop",
    title: "Tsuta: Tokyo's Michelin-Starred Ramen Worth the Queue",
    excerpt: "This tiny ramen shop in Sugamo became the first ramen restaurant to earn a Michelin star. The truffle-infused shoyu ramen is something special.",
    date: "January 5, 2026",
    readTime: "9 min read",
    category: "Ramen",
    imageQuery: "fresh pasta making flour",
    coordinates: [35.7328, 139.7392],
    location: "Tokyo, Japan",
    content: {
      intro: "Tsuta made history in 2015 as the first ramen shop to earn a Michelin star. In a city with thousands of ramen shops, that's saying something. The secret? Truffle oil in the shoyu (soy sauce) broth, along with obsessive attention to every component. Is it worth joining the inevitable queue?",
      sections: [
        {
          heading: "The Queue Strategy",
          text: "Tsuta uses a ticket system. Arrive early—we got there at 9:30 AM for 11:00 AM opening and were still number 15 in line. They distribute tickets for morning and afternoon sittings. Once you have your ticket, you can leave and come back at your designated time. The ramen itself takes about 10 minutes to prepare once you're seated."
        },
        {
          heading: "The Bowl",
          text: "The signature dish is the shoyu ramen with truffle oil, and it's remarkably balanced. The truffle is present but doesn't overpower—it adds an earthy richness that complements the deeply savory broth. The noodles are springy and perfect, the chashu pork is melt-in-your-mouth tender, and the ajitsuke tamago (marinated egg) has a perfectly jammy yolk. Each component is executed flawlessly."
        },
        {
          heading: "Final Thoughts",
          text: "At ¥1,200 (about $11), this might be the best value Michelin-starred meal on earth. Yes, you'll wait in line. Yes, it's just ramen. But it's ramen elevated to an art form—proof that simple food made with obsessive care and quality ingredients can be transcendent. If you're in Tokyo and love ramen, this is non-negotiable. Rating: ★★★★★"
        }
      ]
    }
  },
  // Montreal Restaurants
  {
    slug: "schwartz-deli-montreal",
    title: "Schwartz's Deli: Montreal's Legendary Smoked Meat Institution",
    excerpt: "Since 1928, this iconic deli has been serving the best smoked meat sandwiches in Montreal. The line out the door is always worth the wait.",
    date: "February 3, 2026",
    readTime: "5 min read",
    category: "Deli",
    imageQuery: "smoked meat sandwich",
    coordinates: [45.5155, -73.5772],
    location: "Montreal, Canada",
    content: {
      intro: "Walking past Schwartz's Deli on Boulevard Saint-Laurent, you'll always see a line. Rain or shine, summer or winter, locals and tourists alike queue up for what many consider the best smoked meat sandwich in the world. And they're not wrong.",
      sections: [
        {
          heading: "The Smoked Meat",
          text: "The smoked meat at Schwartz's is perfection. Hand-cut medium, with just the right amount of fat, piled impossibly high on fresh rye bread with a side of mustard. The meat is tender, smoky, peppery, and bursting with flavor. Each bite is a reminder of why this place has been a Montreal institution for nearly a century. Skip the lean—medium or medium-fat is the way to go."
        },
        {
          heading: "The Experience",
          text: "Schwartz's is not about ambiance—it's tiny, cramped, and you'll likely share a table with strangers. The servers are efficient to the point of being brusque. But that's part of the charm. You're here for one thing: the smoked meat. Order it, devour it, and leave happy. Also worth trying: the smoked meat poutine and the cherry Cott soda."
        },
        {
          heading: "The Verdict",
          text: "At around $15 for a sandwich, it's affordable and absolutely worth every penny. This is Montreal culinary history on a plate. If you only eat one thing in Montreal, make it Schwartz's. Rating: ★★★★★"
        }
      ]
    }
  },
  {
    slug: "joe-beef-montreal",
    title: "Joe Beef: Montreal's Bold Take on Fine Dining",
    excerpt: "This Little Burgundy restaurant combines French technique with Québécois heart. Creative, indulgent, and unapologetically rich—Joe Beef is an experience.",
    date: "February 1, 2026",
    readTime: "8 min read",
    category: "Fine Dining",
    imageQuery: "french bistro elegant",
    coordinates: [45.4765, -73.5672],
    location: "Montreal, Canada",
    content: {
      intro: "Joe Beef is where French culinary tradition meets Montreal's rebellious spirit. Founded by chefs David McMillan and Frédéric Morin, this restaurant doesn't do subtle. It does foie gras. It does lobster spaghetti. It does bone marrow and oysters and things soaked in butter and cream. And it does them spectacularly.",
      sections: [
        {
          heading: "The Menu",
          text: "The menu changes daily based on what's fresh and what the chefs feel like making. During our visit, we had the famous lobster spaghetti—decadent, rich, and worth every calorie. The foie gras double down (foie gras on foie gras) is absurd and delicious. Portions are generous, flavors are bold, and there's a playful irreverence to everything. Wine list is excellent, with a focus on natural wines and interesting bottles."
        },
        {
          heading: "The Atmosphere",
          text: "The dining room is cozy and eclectic, with taxidermy animals, vintage posters, and an open kitchen. It feels more like eating in a friend's living room than a fine dining establishment—if that friend happens to be an incredibly talented chef. Service is knowledgeable and friendly, striking the perfect balance between casual and professional."
        },
        {
          heading: "Worth It?",
          text: "Expect to spend $100-150 per person with wine. It's pricey, but the quality and creativity justify the cost. Reservations are essential—book well in advance. Joe Beef represents Montreal dining at its best: technically skilled, culturally rooted, and fun. Rating: ★★★★★"
        }
      ]
    }
  },
  {
    slug: "au-pied-de-cochon-montreal",
    title: "Au Pied de Cochon: Hedonism on a Plate",
    excerpt: "Chef Martin Picard's temple of Québécois excess serves foie gras poutine and duck in a can. It's outrageous, it's delicious, it's unforgettable.",
    date: "January 30, 2026",
    readTime: "7 min read",
    category: "Fine Dining",
    imageQuery: "poutine quebec food",
    coordinates: [45.5245, -73.5742],
    location: "Montreal, Canada",
    content: {
      intro: "Au Pied de Cochon is not for the faint of heart—or the faint of appetite. Chef Martin Picard has built a cult following by celebrating the richest, most indulgent dishes in Québécois cuisine. This is food that laughs in the face of dietary restrictions and dares you to keep up.",
      sections: [
        {
          heading: "The Foie Gras Poutine",
          text: "Yes, foie gras on poutine. It's as excessive as it sounds, and it's glorious. Crispy fries, squeaky cheese curds, rich gravy, and a slab of seared foie gras on top. It's decadent, over-the-top, and somehow perfectly balanced. This dish alone is worth the trip. Other highlights include the duck in a can (an entire duck cooked in a can with foie gras) and the pork hock."
        },
        {
          heading: "The Vibe",
          text: "The restaurant is loud, bustling, and energetic. The open kitchen adds to the theater, and the staff clearly loves what they do. It's fine dining that doesn't take itself too seriously. Come hungry, come with friends, and come ready to embrace excess."
        },
        {
          heading: "Final Thoughts",
          text: "At around $80-120 per person, it's an investment, but one that delivers memories. This isn't everyday dining—it's a celebration of indulgence. Book ahead, and don't plan on eating for 24 hours afterward. Rating: ★★★★★"
        }
      ]
    }
  },
  {
    slug: "st-viateur-bagel-montreal",
    title: "St-Viateur Bagel: The Montreal Bagel You've Been Missing",
    excerpt: "Wood-fired, honey-sweetened, and hand-rolled 24/7. This isn't a New York bagel—it's better.",
    date: "January 28, 2026",
    readTime: "4 min read",
    category: "Bakery",
    imageQuery: "bagel bakery fresh",
    coordinates: [45.5227, -73.5981],
    location: "Montreal, Canada",
    content: {
      intro: "The Montreal vs. New York bagel debate is fierce, but one bite of a fresh St-Viateur bagel—still warm from the wood-fired oven—will make you a believer. These bagels are smaller, denser, sweeter, and infinitely more satisfying than their American cousins.",
      sections: [
        {
          heading: "The Bagels",
          text: "St-Viateur has been baking bagels since 1957, using the same recipe and wood-fired ovens. The bagels are hand-rolled, boiled in honey water, and baked to golden perfection. Sesame is the classic choice, but the everything and poppy seed are also excellent. They're best eaten warm, plain, or with a schmear of cream cheese. The shop operates 24 hours, so you can satisfy a 3 AM bagel craving."
        },
        {
          heading: "Why They're Special",
          text: "Montreal bagels are smaller, denser, and sweeter than New York bagels. They have a larger hole and a chewier texture. The wood-fired oven gives them a subtle smokiness that you simply can't replicate in a conventional oven. St-Viateur's bagels are the gold standard—even locals argue about whether St-Viateur or Fairmount (their main rival) is better. The truth? Both are phenomenal, but St-Viateur edges ahead."
        },
        {
          heading: "The Value",
          text: "At around $1 per bagel, this is the best bargain in Montreal. Grab a dozen to take home—they freeze beautifully. This is simple food done with care and tradition. Rating: ★★★★★"
        }
      ]
    }
  },
  {
    slug: "toqué-montreal",
    title: "Toqué!: Contemporary Québécois Cuisine at Its Finest",
    excerpt: "Chef Normand Laprise's flagship restaurant showcases local ingredients with French technique. Elegant, refined, and quintessentially Montreal.",
    date: "January 26, 2026",
    readTime: "9 min read",
    category: "Fine Dining",
    imageQuery: "french bistro elegant",
    coordinates: [45.5089, -73.5617],
    location: "Montreal, Canada",
    content: {
      intro: "Toqué! has been at the forefront of Montreal's fine dining scene for over 30 years. Chef Normand Laprise pioneered the farm-to-table movement in Quebec, building relationships with local producers and celebrating regional ingredients with French culinary precision.",
      sections: [
        {
          heading: "The Tasting Menu",
          text: "The tasting menu is where Toqué! shines. Each course showcases seasonal Quebec ingredients—foie gras from the Laurentians, seafood from the Gaspésie, vegetables from nearby farms. The execution is flawless, the presentations are beautiful, and the flavors are clean and focused. Standout dishes during our visit included Quebec veal with wild mushrooms and arctic char with pickled vegetables. The wine pairings are excellent, with a focus on natural and organic wines."
        },
        {
          heading: "The Experience",
          text: "The dining room is modern and minimalist, letting the food take center stage. Service is impeccable—attentive, knowledgeable, and warm. The pacing is perfect, allowing you to savor each course without feeling rushed. This is fine dining done right: sophisticated but not stuffy, creative but not gimmicky."
        },
        {
          heading: "The Investment",
          text: "The tasting menu runs around $130-180 per person before wine. It's expensive, but the quality and consistency make it worth the splurge for special occasions. Toqué! is a Montreal institution that continues to innovate while honoring its roots. Rating: ★★★★★"
        }
      ]
    }
  },
  {
    slug: "kazu-montreal",
    title: "Kazu: Tiny Japanese Restaurant, Huge Flavors",
    excerpt: "This 20-seat izakaya in the Plateau serves some of the best Japanese comfort food in Montreal. Expect a wait, but it's worth it.",
    date: "January 24, 2026",
    readTime: "5 min read",
    category: "Japanese",
    imageQuery: "ramen bowl japanese",
    coordinates: [45.5152, -73.5735],
    location: "Montreal, Canada",
    content: {
      intro: "Kazu is a Montreal secret that's not really a secret anymore. This tiny restaurant, with just 20 seats and no reservations, serves exceptional Japanese comfort food at prices that seem frozen in time. The line starts forming before they open, and it doesn't stop.",
      sections: [
        {
          heading: "The Food",
          text: "Everything at Kazu is delicious, but the highlights are the chicken karaage (perfectly crispy and juicy), the pork gyoza (pan-fried to golden perfection), and the nabeyaki udon (a comforting noodle soup with tempura shrimp). The portions are generous, the flavors are authentic, and everything is made fresh to order. The tonkatsu is also excellent—crispy breaded pork cutlet with a tangy sauce."
        },
        {
          heading: "The Wait",
          text: "Here's the deal: Kazu doesn't take reservations, and the space is tiny. Arrive early (they open at 11:30 AM for lunch, 5:30 PM for dinner) or be prepared to wait 30-60 minutes. But the line moves reasonably quickly, and watching the chefs work in the open kitchen makes the time pass faster. Bring cash—they don't accept cards."
        },
        {
          heading: "Incredible Value",
          text: "A full meal at Kazu costs around $15-20 per person. For the quality and portion sizes, this is a steal. It's no-frills, cash-only, and absolutely delicious. This is the kind of neighborhood gem that makes Montreal special. Rating: ★★★★★"
        }
      ]
    }
  },
  {
    slug: "liverpool-house-montreal",
    title: "Liverpool House: Rustic Italian Comfort in Little Burgundy",
    excerpt: "Sister restaurant to Joe Beef, Liverpool House serves soulful Italian-inspired dishes in a relaxed, welcoming atmosphere.",
    date: "January 22, 2026",
    readTime: "6 min read",
    category: "Italian",
    imageQuery: "italian pasta restaurant",
    coordinates: [45.4768, -73.5680],
    location: "Montreal, Canada",
    content: {
      intro: "Liverpool House, the sister restaurant to Joe Beef, takes a different approach: rustic Italian comfort food with the same commitment to quality and flavor. It's more casual, more vegetable-forward, and just as delicious.",
      sections: [
        {
          heading: "The Menu",
          text: "The menu leans Italian, with house-made pastas, fresh seafood, and seasonal vegetables taking center stage. The lobster spaghetti (a Joe Beef signature) also appears here, but don't overlook the simpler dishes. The spaghetti alle vongole (clams, white wine, garlic, chili) is perfection. The roasted vegetables with burrata showcase the quality of local produce. The whole fish (market price) is expertly prepared and meant for sharing."
        },
        {
          heading: "The Vibe",
          text: "Liverpool House feels like a warm hug. The space is cozy and lived-in, with mismatched furniture and a vintage aesthetic. It's the kind of place where you linger over wine and good conversation. Service is friendly and unpretentious. It's fine dining that feels like home cooking—if your home cook happened to train in Italy."
        },
        {
          heading: "The Value",
          text: "Expect to spend $70-100 per person with wine. It's a bit more approachable than Joe Beef price-wise, but still a splurge. Reservations are recommended but slightly easier to get. This is soul-satisfying food that celebrates simplicity and quality. Rating: ★★★★½"
        }
      ]
    }
  },
  {
    slug: "lawrence-montreal",
    title: "Lawrence: The Brunch Spot That Defined a Neighborhood",
    excerpt: "This Mile End restaurant elevated Montreal brunch culture with British-inspired dishes and impeccable execution. Still the gold standard.",
    date: "January 20, 2026",
    readTime: "5 min read",
    category: "Brunch",
    imageQuery: "brunch cafe breakfast",
    coordinates: [45.5242, -73.5998],
    location: "Montreal, Canada",
    content: {
      intro: "Lawrence helped put Mile End on Montreal's culinary map. This British-inspired restaurant serves brunch and dinner in a bright, airy space that feels equally suited to lazy Saturday mornings and intimate dinners.",
      sections: [
        {
          heading: "The Brunch",
          text: "Lawrence's brunch is legendary for good reason. The smoked trout on toast with crème fraîche and capers is light, elegant, and perfectly balanced. The English breakfast—baked beans, Cumberland sausage, black pudding, eggs—is hearty and satisfying. The pastries are house-made and excellent, especially the scones with clotted cream and jam. The Bloody Mary is one of the best in the city."
        },
        {
          heading: "Dinner",
          text: "While Lawrence is known for brunch, dinner is equally impressive. The roast chicken with bread salad is simple and flawless. The steak and kidney pie is rich and comforting. The wine list is thoughtful, with interesting bottles at reasonable prices. The space transforms in the evening—candlelit and romantic."
        },
        {
          heading: "The Experience",
          text: "Brunch runs around $20-30 per person, dinner $50-70. Reservations are essential for weekend brunch—book well ahead. This is neighborhood dining at its best: consistent, welcoming, and delicious every time. Rating: ★★★★★"
        }
      ]
    }
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}