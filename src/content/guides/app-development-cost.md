---
title: What does it cost to build an app in 2026?
description: App build costs by complexity, one phone platform or both, app store fees, yearly upkeep, timelines, and what pushes the price up or down.
eyebrow: MOBILE & CUSTOM SOFTWARE
published: 2026-11-19
order: 3
---

**The short answer:** a simple first version of an app (often called an MVP, for minimum viable product) costs about $15,000–$50,000 and takes 2–4 months. A fuller build with accounts, payments and connections to other systems costs $50,000–$150,000 and takes 4–6 months ([Framesixty][framesixty], [Rapid Developers][rapid]). After launch, budget 15–20% of the build cost every year to keep it working ([Netguru][netguru]).

The range is wide because "an app" can mean a booking tool for one kind of phone, or a product on iPhone and Android with live updates and health data. This guide covers cost by size of app, one phone or both, store fees, upkeep, timelines and what moves the price. It ends with whether you need an app at all, because a web app is sometimes the better buy.

## At a glance

| Type of app | Typical cost | Timeline | What it usually includes |
| --- | --- | --- | --- |
| Simple app or first version | $15,000–$50,000 | 2–4 months | One kind of phone (iPhone or Android), sign-in and the core task |
| Medium | $50,000–$150,000 | 4–6 months | Accounts, payments, connections to other systems and an admin panel |
| Complex | $150,000–$300,000+ | 6–12 months or more | Real-time features, regulated data or a large platform |

These ranges come from Framesixty and Rapid Developers and reflect US agency rates ([Framesixty][framesixty], [Rapid Developers][rapid]). On top of the build, plan for store fees of $99 a year at Apple ([Apple][apple-enroll]) and $25 once at Google ([Google][google-register]), and a commission of 15% for most small developers, up to 30%, on any digital sales ([Apple][apple-sbp], [Frankfurt Kurnit][fkks]).

**Averages mislead.** The average app project reviewed on Clutch costs $90,780, but most reviewed projects fall between $10,000 and $49,999 ([Clutch][clutch]). A few very large builds pull the average up.

**In Maryland, add 3% sales tax.** Since July 1, 2025, Maryland charges 3% sales tax on custom software and app development ([Comptroller of Maryland][md-tax]). See [the Maryland notes](#maryland-sales-tax-and-startup-funding) below.

## A simple first version vs a full build

A first version covers one kind of phone and only the core task, so it costs far less than a full build. Published guides agree on the tiers, but disagree on where a real first version lands.

### What each level buys

- **First version:** one platform, sign-in, the core task, payments, an admin panel (the screens your staff use to manage the app) and one or two connections to other systems ([Rapid Developers][rapid]).
- **Medium build:** both iPhone and Android, user accounts, payments, connections to other systems and an admin panel ([Tvisha][tvisha]).
- **Complex build:** real-time features, heavy backend work or regulated data. The backend is the servers and database behind the app, which hold accounts and data. Netguru reports a median of $76,000 for its own first versions built for both phones, rising to $118,000 when health-privacy compliance or real-time features are added at that stage; it doesn't publish how it measured this ([Netguru][netguru]).

### Why the published ranges disagree

| Source | Simple or first version | Medium | Complex |
| --- | --- | --- | --- |
| [Framesixty][framesixty] | $15,000–$50,000 | $50,000–$150,000 | $150,000–$300,000+ |
| [Rapid Developers][rapid] | $10,000–$50,000 | $50,000–$150,000 | Higher, taking 6–12 months or more |
| [Netguru][netguru] | $15,000–$50,000; $25,000–$60,000 for a first version on one platform | $50,000–$150,000 | $150,000–$300,000+ |
| [Quash][quash] | $5,000–$50,000 | $50,000–$120,000 | $120,000–$300,000+ |

The same guide that starts simple apps at $5,000 puts a production-ready first version at $50,000–$150,000 ([Quash][quash]), while most projects reviewed on Clutch cost under $50,000 ([Clutch][clutch]). The lower figures usually mean a shorter feature list or an offshore team, not a cheaper version of the same app. How complex the features are, and how much backend work they need, move the price more than the choice of platform ([TechnBrains][technbrains]).

## iPhone and Android separately, or one shared codebase

A native app is built separately for iPhone or for Android. A cross-platform app is built once, from one shared codebase (one set of code), and runs on both phones, using a tool such as React Native or Flutter.

One shared codebase for both phones costs 30–45% less than two separate native apps ([Netguru][netguru]); Framesixty puts the saving at 30–50% ([Framesixty][framesixty]). Two native apps roughly double the price, and developers charge the same hourly rate for either platform ([Clutch][clutch]).

| Approach | Cost | Trade-off | Best when |
| --- | --- | --- | --- |
| One native app, iPhone or Android only | The baseline | Reaches only part of your customers | You're testing an idea, and most customers use one kind of phone |
| Two native apps | About double one app ([Clutch][clutch]) | Two codebases to build, test and update | The app leans on the newest phone features or heavy graphics |
| One shared codebase | 60–70% of the cost of two native apps with React Native, 65–75% with Flutter ([Netguru][netguru]) | Can hit performance or feature limits, says Clutch, without giving figures ([Clutch][clutch]) | Most business apps: forms, lists, bookings, payments |
| Web app that works on phones | No store fees and no store review; see [website and web app costs](/guides/small-business-website-cost) | No app store listing, and fewer phone features | The app is mostly content, forms or a customer portal |

Upkeep follows the same pattern. Keeping up with each year's new phone software takes 40–80 engineering hours per platform ([Netguru][netguru]), so two native apps cost more to maintain than one shared one.

## App store fees

Listing an app costs $99 a year at Apple ([Apple][apple-enroll]) and $25 once at Google ([Google][google-register]). The larger cost is the commission on digital sales, and most local businesses don't pay it, because physical goods and in-person services are paid for outside the stores' payment systems ([Apple][apple-guidelines]). Both stores' US rules changed in 2025 and 2026 ([Frankfurt Kurnit][fkks]), so older articles are out of date.

### Getting listed

| Step | Apple | Google |
| --- | --- | --- |
| Enrolling as a business | You must be a legal entity, not a trade name, with a D-U-N-S number (a business ID number, which Apple says is free in most places), a public website and email on your business's domain ([Apple][apple-enroll]) | Identity verification; the requirements vary by account type ([Google][google-register]) |
| Before the first release | App review ([Apple][apple-guidelines]) | New personal accounts must run a closed test with at least 12 testers for 14 days in a row, then apply for production access; Google usually reviews within 7 days ([Google][google-testing]) |
| Fee waivers | Accredited educational institutions can have the fee waived ([Apple][apple-enroll]) | None listed |

### Commission on digital sales

The commission applies only to some kinds of sales:

- **Covered:** digital goods used inside the app, such as subscriptions, premium content and paid features. Apple requires its own in-app purchase system for these, under guideline 3.1.1 ([Apple][apple-guidelines]).
- **Not covered:** physical goods, and services used outside the app, such as a haircut booking, a food order or a product shipment. Apple says these must use other payment methods, such as Apple Pay or a card form, under guideline 3.1.3(e) ([Apple][apple-guidelines]). You pay your normal card-processing rate instead, for example 2.9% + 30¢ per transaction through Stripe ([Netguru][netguru]).

| Fee | Apple (US) | Google Play (US, since June 30, 2026) |
| --- | --- | --- |
| Small developer rate | 15% under the Small Business Program, for developers with up to $1 million a year in proceeds ([Apple][apple-sbp]) | 10% on the first $1 million a year, plus a 5% billing fee when Google's billing is used ([Google][google-fees]) |
| Standard rate | 30% ([Frankfurt Kurnit][fkks]) | 20% on purchases from new installs and 25% from existing installs, plus the 5% billing fee ([Google][google-fees]) |
| Subscriptions | 15% under the Small Business Program ([Apple][apple-sbp]) | 10%, plus the 5% billing fee ([Google][google-fees]) |
| Paying on your own website through a link | Allowed in the US, with no Apple commission for now ([Frankfurt Kurnit][fkks]) | 20% on external web links at the standard rate; since October 1, 2026, developers must report these sales and pay Google's fees on them ([Frankfurt Kurnit][fkks]) |

Google's fee table has several layers, so read Google's own page before you model revenue ([Google][google-fees]).

- **Apple's rule on linking out isn't settled.** On December 11, 2025, an appeals court ruled that Apple may charge a fee tied to its actual costs on purchases made through external links, and sent the case back to set that fee. On June 30, 2026, the Supreme Court agreed to hear a related question, with a decision expected in 2027. Until then, US link-outs stay commission-free, and apps that link out must still offer Apple's in-app purchase ([Frankfurt Kurnit][fkks]).
- **Growing past the small developer rate:** at Apple, passing $1 million in proceeds in a year moves your later sales to the standard rate. You can qualify again the following year if proceeds fall back ([Apple][apple-sbp]).

## What it costs to keep an app running

Budget 15–20% of the build cost every year to keep an app working, and more in the first year ([Framesixty][framesixty], citing Imaginovation). An app you leave alone doesn't stay as it is: both stores set technical deadlines, and an app that misses them can't ship updates or loses visibility ([Apple][apple-reqs], [Google][google-target]).

| Running cost | Typical amount |
| --- | --- |
| Yearly maintenance | 15–20% of the build cost; the first year can reach 50% ([Framesixty][framesixty], citing Imaginovation) |
| Total spend after launch | 40–60% of the build budget within two years ([Netguru][netguru]) |
| Keeping up with new phone software | 40–80 engineering hours per platform a year ([Netguru][netguru]) |
| Hosting and backend | From $70 a month for small apps; $200–$800 a month for serverless hosting (billed by use) under 50,000 monthly users; $1,500–$5,000 a month for dedicated servers ([Netguru][netguru]) |
| AI features billed by usage | $500–$3,000 a month at moderate volume ([Netguru][netguru]) |
| Health-privacy compliance (HIPAA) | $8,000–$15,000 a year, after $25,000–$60,000 up front ([Netguru][netguru]) |

### Deadlines the stores set

- **Apple:** since April 28, 2026, apps uploaded to the App Store must be built with Xcode 26 (Apple's app-building software) and the iOS 26 software kit or later ([Apple][apple-reqs]).
- **Google:** since August 31, 2026, new apps and updates must target Android 16. Existing apps must target Android 15 or higher to stay available to new users on newer phones; people who already installed the app keep it ([Google][google-target]).

### A worked example

Take a $60,000 app built from one shared codebase. Using the figures above, maintenance runs $9,000–$12,000 a year, hosting $840–$9,600 a year, and Apple's fee $99. That comes to roughly $10,000–$22,000 a year, or about $830–$1,800 a month, before any new features.

## How long it takes

A simple app takes 2–4 months, a medium one 4–6 months, and a complex one 6–12 months or more ([Rapid Developers][rapid]). Framesixty puts complex builds at 9–12 months ([Framesixty][framesixty]).

| Stage or project | Typical time |
| --- | --- |
| Agency kickoff | 1–2 weeks ([Netguru][netguru]) |
| Lean first version, two developers plus shared testing | About 14 weeks ([Netguru][netguru]) |
| Average project reviewed on Clutch | About 11 months ([Clutch][clutch]) |
| Google's closed test for a new personal account | 14 days of testing, then about 7 days of review ([Google][google-testing]) |
| Apple business enrollment | Not stated; verification can require notarized documents ([Apple][apple-enroll]) |

**Store setup is the step owners forget.** Start Apple's business enrollment and Google's closed test while the app is still being built, or the launch can slip by weeks. Clutch's 11-month average, like its cost average, is pulled up by large builds.

## What pushes the price up or down

An app's price is hours multiplied by an hourly rate, so the two levers are how much the app does and who builds it.

| What drives the cost | Costs more | Costs less |
| --- | --- | --- |
| Features | Real-time updates, location, complex calculations, advanced animation ([Clutch][clutch]) | One core task done well |
| Backend | Custom server logic and many connections to other systems | A ready-made hosted backend service, and one or two connections |
| Platforms | Two native apps, at about double the price ([Clutch][clutch]) | One platform first, or a shared codebase |
| Regulated data | Health-privacy compliance adds $25,000–$60,000, and card-data compliance $15,000–$40,000 ([Netguru][netguru]) | Using a payment provider's own checkout, and collecting less data |
| Design | Custom animation and many unique screens | The phone's standard buttons, menus and layouts |
| Testing | Skipped testing that comes back as rework | Budgeting 20–25% of development hours for it up front ([Netguru][netguru]) |
| Team location | US and Canada | Offshore or nearshore teams, 30–60% less ([Framesixty][framesixty]) |

Connections to other systems, such as a payment, booking or accounting service, usually run through that system's API (application programming interface): the access point it offers so other software can exchange data with it. Each one adds design, build and testing time.

### Hourly rates

Blended agency rates by role ([Netguru][netguru]):

| Region | Junior | Mid-level | Senior |
| --- | --- | --- | --- |
| US and Canada | $80–$110 | $120–$160 | $160–$220 |
| Western Europe | $60–$90 | $90–$130 | $130–$180 |
| Eastern Europe | $35–$55 | $55–$80 | $80–$120 |
| Asia | $15–$30 | $30–$50 | $50–$75 |

Clutch's directory tells a different story: its most common hourly band is $25–$49, including for firms listed in the US ([Clutch][clutch]). The gap suggests many US-listed firms do the work offshore, so ask any firm directly who will do the work, and where.

## How app projects are usually priced

Most app quotes are an estimate of hours multiplied by rates. One guide writes the formula as team size × months × hours × blended rate (the average rate across the team), plus a 10–15% buffer for risk ([Fora Soft][forasoft]). Because scope drives the cost, a firm price is only as good as the written feature list behind it. That's why a fixed price usually follows a paid discovery phase (a short planning stage that produces the feature list), or a feature list you write yourself. The red flags below list what else a sound quote should show.

## Do you need an app at all?

Many small businesses that ask for an app need a good mobile website or web app. An app earns its cost when it uses something only a phone app does well, and Apple rejects apps that are little more than a website in a wrapper ([Apple][apple-guidelines]).

**An app is worth it when you need:**

- **Phone features:** the camera, offline use, push notifications or in-store payments. One guide suggests first asking whether a well-made mobile web app would do for the first version; if the app needs these features, budget for it as real software, not as a brochure ([goLance][golance]).
- **Repeat use:** the same customers use it often, and an icon on their home screen plus notifications bring them back.
- **A store listing:** your customers search for businesses like yours in the app stores.

**A website or web app is usually enough when:**

- **It's mostly content:** the app would mainly show information, a catalog, a form or a booking page. Apple's guideline 4.2 requires an app to offer features and an interface beyond a repackaged website, and says apps shouldn't be mainly marketing material or a collection of links ([Apple][apple-guidelines]).
- **Use is occasional:** customers would use it once or rarely, so few would install anything.
- **The budget is small:** under about $15,000, you're near the bottom of every published range above.

**The middle path:** build the web version first, learn what customers use, then add a shared-codebase app that reuses the same backend. The backend, accounts and payments carry over; only the phone screens are new. A web app also avoids the store costs above: no commission on digital sales, no yearly store deadlines, and no review before each update. For what a web app or customer portal costs, see [what a small business website costs](/guides/small-business-website-cost).

## Red flags when hiring an app developer

The expensive mistakes are losing control of the store listing or the code, and signing a fixed price for a scope nobody wrote down.

| Red flag | Why it matters | Look for instead |
| --- | --- | --- |
| The developer publishes the app under their own Apple or Google account | The account holder controls the listing, the reviews and the payouts; Apple shows the enrolled legal entity as the seller ([Apple][apple-enroll]) | You enroll in your business's name and add the developer as a team member |
| No clause on who owns the code | You can't move to another developer | A contract that assigns the code to you, with access to the code repository (where the code is stored) from day one |
| A fixed price before any discovery | Scope drives the cost, so an unscoped price is a guess | A paid discovery phase or a written feature list first |
| A quote far below the published ranges | Clutch's most common rate is $25–$49 an hour ([Clutch][clutch]), against $160–$220 for senior US developers ([Netguru][netguru]) | A direct answer on who does the work, and where |
| Two separate native apps, with no reason given | That roughly doubles the price ([Clutch][clutch]) | A stated reason, or a shared codebase |
| No line for testing | Testing takes 20–25% of development hours ([Netguru][netguru]) | Testing listed as its own item |
| No plan or price for upkeep | Maintenance runs 15–20% of the build cost a year ([Netguru][netguru]), and both stores set deadlines | A maintenance quote alongside the build quote |
| A guaranteed launch date or guaranteed store approval | Approval is Apple's and Google's decision, and a new personal Google account needs a 14-day test first ([Google][google-testing]) | A schedule that includes enrollment and store review |
| A revenue plan that ignores store commission | Subscriptions and digital goods pay 15–30% to the store, as set out in [commission on digital sales](#commission-on-digital-sales) | Projections net of commission |
| An app that is a website in a wrapper | Apple can reject it under guideline 4.2 ([Apple][apple-guidelines]) | Features that need a phone, or a web app instead |

## Maryland sales tax and startup funding

This section is general information, not tax advice: check with a tax professional, and confirm current rules with the Comptroller of Maryland, because they change. [Maryland's 3% tax on IT and software services](/guides/maryland-tax-on-it-services) covers the tax in more detail.

### The 3% tax

- **What's taxed:** since July 1, 2025, Maryland taxes custom software programming and development at 3%, along with mobile application publishing. The earlier exemption for customized software was repealed the same day ([Comptroller of Maryland][md-tax]).
- **What it adds:** $1,800 on a $60,000 app. Later development work falls in the same category ([Comptroller of Maryland][md-tax]); ask an accountant how a maintenance contract is classified.
- **Use in more than one state:** if your business will use the software both inside and outside Maryland, you can give the developer a multiple-points-of-use certificate and pay tax only on the Maryland share ([Comptroller of Maryland][md-tax]).

### Funding for Maryland technology startups

- **TEDCO's Pre-Seed Builder Fund:** TEDCO, the state's technology development corporation, runs this fund for very early-stage (pre-seed) technology startups whose main place of business is in Maryland. It typically invests $100,000 at first through convertible notes, an investment that starts as a loan and can turn into shares ([TEDCO][tedco-builder]).
- **Who qualifies:** the Builder Fund has ownership requirements tied to founders who show economic disadvantage ([TEDCO][tedco-sif]).
- **Larger rounds:** TEDCO's Social Impact Funds can invest up to $750,000 in one round ([TEDCO][tedco-builder]). Its 2026 announcements include $100,000 to Sommos, an AI storytelling company, on May 18 ([TEDCO][tedco-sommos]), and $200,000 to Ufarmx on February 19 ([TEDCO][tedco-ufarmx]).

## Sources

Everything here is as of November 2026. Apple's and Google's own pages are the firmest figures; the cost guides are published by development firms, and several give different figures on the same page, so treat their ranges as planning figures, not quotes.

**Official and government pages:** [Apple: Enrollment support][apple-enroll] · [Apple: App Store Small Business Program][apple-sbp] · [Apple: App Review Guidelines][apple-guidelines] · [Apple: Upcoming requirements][apple-reqs] · [Google Play: Service fees][google-fees] · [Google Play: Registration][google-register] · [Google Play: App testing requirements for new personal accounts][google-testing] · [Google Play: Target API level requirements][google-target] · [Comptroller of Maryland, Technical Bulletin No. 56 notice (June 2025)][md-tax]

**Maryland funding:** [TEDCO: Pre-Seed Builder Fund][tedco-builder] · [TEDCO: Social Impact Funds][tedco-sif] · [TEDCO press release: Sommos][tedco-sommos] · [TEDCO press release: Ufarmx][tedco-ufarmx]

**Legal analysis:** [Frankfurt Kurnit Klein & Selz: External purchase developments for Apple and Google][fkks]

**Industry cost guides:** [Clutch][clutch] · [Netguru][netguru] · [Framesixty][framesixty] · [Rapid Developers][rapid] · [Quash][quash] · [Tvisha][tvisha] · [TechnBrains][technbrains] · [Fora Soft][forasoft] · [goLance][golance]

[apple-enroll]: https://developer.apple.com/support/enrollment/
[apple-sbp]: https://developer.apple.com/app-store/small-business-program/
[apple-guidelines]: https://developer.apple.com/app-store/review/guidelines/
[apple-reqs]: https://developer.apple.com/news/upcoming-requirements/
[google-fees]: https://support.google.com/googleplay/android-developer/answer/112622
[google-register]: https://support.google.com/googleplay/android-developer/answer/6112435
[google-testing]: https://support.google.com/googleplay/android-developer/answer/14151465
[google-target]: https://support.google.com/googleplay/android-developer/answer/11926878
[md-tax]: https://www.marylandcomptroller.gov/legal-library/tb-30-jun-2025.html
[tedco-builder]: https://www.tedcomd.com/social-impact-funds/pre-seed-builder-fund
[tedco-sif]: https://www.tedcomd.com/social-impact-funds
[tedco-sommos]: https://www.tedcomd.com/news-events/press-releases/2026/tedco-invests-sommos
[tedco-ufarmx]: https://www.tedcomd.com/news-events/press-releases/2026/tedco-announces-builder-funds-investment-ufarmx
[fkks]: https://fkks.com/passle-post/update-your-app-external-purchase-developments-for-apple-google/
[clutch]: https://clutch.co/app-developers/resources/how-much-does-app-development-cost
[netguru]: https://netguru.com/blog/mobile-app-development-cost
[framesixty]: https://framesixty.com/how-much-does-mobile-app-development-cost/
[rapid]: https://www.rapidevelopers.com/cost/app-development-cost
[quash]: https://quashbugs.com/blog/how-much-does-it-cost-to-build-an-app
[tvisha]: https://www.tvisha.com/blog/cost-of-mobile-app-development
[technbrains]: https://www.technbrains.com/blog/app-development-cost/
[forasoft]: https://www.forasoft.com/blog/article/mobile-app-development-costs-guide-2025
[golance]: https://golance.com/blogs/how-much-to-build-a-mobile-app-2026
