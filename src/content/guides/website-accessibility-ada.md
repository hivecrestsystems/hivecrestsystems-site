---
title: Website accessibility (ADA) for small businesses and local governments
description: What the ADA asks of business and government websites, the Title II deadlines, common WCAG failures, what audits and fixes cost, and red flags.
eyebrow: ACCESSIBILITY
published: 2026-11-19
order: 6
---

**The short answer:** state and local governments must make their websites and mobile apps meet WCAG 2.1 Level AA by April 26, 2027 if they serve 50,000 people or more, or by April 26, 2028 if they are smaller or are special districts ([Justice Department][doj-rule]). Private businesses have no written standard and no deadline, but the Justice Department says the ADA already covers their websites ([Justice Department][doj-guidance]). Auditing and fixing a small business site typically costs $1,500–$7,500 ([Accessible.org][accessible-cost]).

The answer depends on who you are, because two parts of the Americans with Disabilities Act (ADA) apply. Governments fall under Title II, which now has a federal rule with a named standard and fixed dates. Businesses open to the public fall under Title III, which has neither, and they are the ones facing lawsuits. This guide covers each group in its own section, then explains the standard, the Web Content Accessibility Guidelines (WCAG), in plain words, along with what a check involves, what fixing a site costs, and the red flags when you hire help.

This guide is general information, not legal advice. Check your situation with an attorney who handles ADA matters. The rules change (the government deadlines moved in 2026), so confirm current dates on the Justice Department's ADA site, [ada.gov][doj-rule], before you rely on them.

## At a glance

| Who | Law | Standard | Deadline |
| --- | --- | --- | --- |
| Businesses open to the public | ADA Title III | None set by regulation; the Justice Department points to WCAG as guidance ([Justice Department][doj-guidance]) | No date; the duty applies now ([Justice Department][doj-guidance]) |
| Governments serving 50,000 people or more | ADA Title II rule | WCAG 2.1 Level AA | April 26, 2027 ([Justice Department][doj-rule]) |
| Governments serving under 50,000, and special districts | ADA Title II rule | WCAG 2.1 Level AA | April 26, 2028 ([Justice Department][doj-rule]) |

**The government dates moved in 2026.** The original dates were April 24, 2026 and April 26, 2027. On April 20, 2026, the Justice Department published an interim final rule that pushed each date back by a year ([Justice Department][doj-rule]; [Jackson Lewis][jackson-lewis]). Articles and vendor pages written before then still show the old dates.

Go straight to your part: [private businesses](#for-private-businesses-the-ada-and-lawsuits) or [state and local governments](#for-state-and-local-governments-the-title-ii-rule). The sections after those apply to both.

## For private businesses: the ADA and lawsuits

The ADA covers a business's website, but no regulation says exactly what the site must do. Lawsuits fill that gap. One count puts federal website accessibility lawsuits at more than 3,000 in 2025 ([Seyfarth Shaw, via Accessibility Checker][a11y-checker]), and other trackers find most cases are aimed at online stores ([Continual Engine][continual-engine]; [AudioEye][audioeye-retail]).

### What the Justice Department says

Its guidance for businesses, dated March 18, 2022, makes three points ([Justice Department][doj-guidance]):

- **The ADA reaches the web.** It applies to the goods and services a business open to the public offers, including those it offers online.
- **There is no detailed federal standard.** The Department has no regulation setting detailed standards for business websites. You can choose how to make your site accessible, but it has to be accessible.
- **WCAG is guidance, not a requirement.** The guidance names WCAG and the federal government's own Section 508 standards as helpful references.

### How many lawsuits are filed

Lawsuit counts come from law firms and from companies that sell accessibility services, and each tracker counts differently. Some count federal court only, some add state courts, and none count demand letters that are settled before a lawsuit is filed. Read each figure as its source's count, not as an official total.

| Measure | Figure | Source |
| --- | --- | --- |
| Federal website accessibility lawsuits, 2025 | 3,117, up 27% from 2,452 in 2024 | Seyfarth Shaw ([Accessibility Checker][a11y-checker]) |
| Share of all federal ADA Title III filings, 2025 | About a third of 8,667 | Seyfarth Shaw ([KEYT][keyt]) |
| Federal and state website lawsuits combined, 2025 | 3,948 | EcomBack ([Accessibility Checker][a11y-checker]) |
| Where those were filed | New York 1,108; Florida 950; California 787; Illinois 576; about 87% together | EcomBack ([Accessibility Checker][a11y-checker]) |
| Fastest growth | Illinois, up 526% from 92 in 2024 | EcomBack ([Accessibility Checker][a11y-checker]) |
| Share aimed at online stores | 69% in the first half of 2025; 78% by another count | UsableNet ([Continual Engine][continual-engine]); [AudioEye][audioeye-retail] |
| First half of 2026 | 5,006 federal ADA Title III filings of all kinds, up 9% and the highest mid-year total since 2021; website cases about 430 ahead of the same period in 2025 | [Seyfarth Shaw][seyfarth]; [KEYT][keyt] |

### Why businesses get sued

- **No written standard.** Because the Justice Department hasn't set detailed standards for business sites ([Justice Department][doj-guidance]), each claim argues from the ADA's general duty rather than a checklist.
- **A few law firms file most cases.** The top 15 plaintiff firms filed 86.76% of website accessibility lawsuits in 2024, according to TestParty ([TestParty][tp-trends]).
- **State laws add money.** Cases filed under state law can add damages for each violation ([AudioEye][audioeye-legal]). California's civil rights law adds $4,000 or more per violation ([DYNO Mapper][dynomapper]).
- **Online checkouts are easy to document.** A store has many forms, buttons and steps where a barrier can be recorded ([AudioEye][audioeye-legal]).
- **Small businesses are frequent targets,** according to reporting on the 2026 filings ([KEYT][keyt]).

### Health care practices have a separate rule

The Department of Health and Human Services (HHS) set its own web accessibility requirements for organizations that receive its funding, with a compliance date of May 11, 2026 ([Jackson Lewis][jackson-lewis]). That date has passed, and the sources for this guide don't confirm whether it was later extended. If you run a medical or dental practice, check the current requirement with HHS.

### If you get a demand letter or a lawsuit

- **Get advice before you reply.** What you say in a reply can matter, so talk to a lawyer who handles ADA matters first.
- **Budget for repairs on top of any settlement.** The settlement amount doesn't pay for fixing the site. Settlements usually add a repair plan with a named standard and a deadline ([TestParty][tp-fixes]). Fixes on that deadline run $2,000–$8,000 for small sites and $15,000–$50,000+ for online stores ([TestParty][tp-fixes]).
- **Don't buy a widget as the fix.** The Federal Trade Commission acted against exactly that promise, as covered in [red flags](#red-flags-when-you-hire-help).

## For state and local governments: the Title II rule

Every state and local government, of any size, must bring its web content and mobile apps up to WCAG 2.1 Level AA by its compliance date ([Justice Department][doj-rule]). The rule was published on April 24, 2024 under Title II of the ADA, and only its dates changed in 2026 ([Justice Department][doj-rule]).

### Who is covered

- **Governments:** all state and local governments and their agencies and departments, plus special purpose districts and commuter authorities ([Justice Department][doj-rule]).
- **Contractors:** companies that provide public services for those governments ([Justice Department][doj-rule]).
- **Mobile apps:** any app a government provides or makes available, including apps a third party runs under an arrangement with the government ([Justice Department][doj-rule]).

Because a vendor's work for you is covered, name WCAG 2.1 Level AA in the contract for any site, portal or app a vendor builds or hosts, and ask for evidence that it was tested. For how agencies and prime contractors usually buy this kind of work, see [How agencies and primes buy from small IT firms](/guides/how-government-buys-it-services).

### Which date applies

| Government | Compliance date | Original date |
| --- | --- | --- |
| Population of 50,000 or more | April 26, 2027 | April 24, 2026 |
| Population under 50,000 | April 26, 2028 | April 26, 2027 |
| Special district governments | April 26, 2028 | April 26, 2027 |

All dates are from the Justice Department's fact sheet, which carries a note on the 2026 change ([Justice Department][doj-rule]).

- **Population comes from the 2020 Census** ([Justice Department][doj-rule]). A unit with no population of its own, such as a city police department or library, uses the population of the government it belongs to. County and city school districts use the county's or city's population.
- **The extension is narrow.** The interim final rule (91 Fed. Reg. 20902, April 20, 2026) moved the dates and left the substance of the 2024 rule unchanged ([Consumer Financial Services Law Monitor][cfslm]). The older duty not to exclude people with disabilities from government services hasn't been paused ([Consumer Financial Services Law Monitor][cfslm]).

### Five exceptions

| Exception | What qualifies | What doesn't |
| --- | --- | --- |
| Archived web content | Made before the compliance date, kept only for reference, stored in a marked archive area, and unchanged since; all four must be true | Old pages still in everyday use |
| Older documents | Word, PDF, presentation or spreadsheet files posted before the compliance date | Any still used to apply for or receive a service, such as a current form |
| Content posted by others | Comments and posts by members of the public | Content from a vendor or contractor working for the government, and tools the government adds |
| Individual password-protected documents | Files about one person, property or account, behind a password, such as a utility bill | The page or portal that delivers them |
| Older social media posts | Posts made before the compliance date | New posts |

The exceptions are summarized from the Justice Department's fact sheet ([Justice Department][doj-rule]). An exception doesn't remove the duty to communicate effectively: if someone asks for an excepted document in an accessible format, you may still have to provide it ([Justice Department][doj-rule]).

### Other parts of the rule

- **A separate "accessible version" isn't a way out.** It's allowed only when a technical or legal limit prevents fixing the main content ([Justice Department][doj-rule]).
- **Undue burden:** you don't have to take an action that would be an undue burden or would fundamentally change a program. This is judged case by case ([Justice Department][doj-rule]).
- **Small misses:** a minor departure from the standard with minimal effect on access may not be a violation. The government has to prove that, and it can't be used to avoid trying ([Justice Department][doj-rule]).

### Planning from November 2026

As of November 19, 2026, April 26, 2027 is about five months away and April 26, 2028 about seventeen. A small site can be audited in 1–3 weeks, but a complex application audit takes 4–8 weeks or more, and rush work costs extra ([TestParty][tp-audit]). If you still need to buy an audit, fix your templates and work through years of PDFs, that work should be under contract now.

## What WCAG 2.1 AA means in practice

WCAG is a published set of guidelines for making sites usable by people who are blind or deaf, have low vision, or can't use a mouse. It has three levels, and AA is the middle one ([W3C][w3c]). It's also the level the federal rule for governments names ([Justice Department][doj-rule]). Six kinds of error account for 96% of the errors detected on the top million home pages ([WebAIM][webaim]), so most of the work comes down to a few habits.

### The four principles

WCAG is organized around four principles ([W3C][w3c]):

| Principle | In plain words |
| --- | --- |
| Perceivable | Visitors can see or hear the content: images have text descriptions, videos have captions, and text stands out from its background |
| Operable | Visitors can use it: everything works from a keyboard, there's enough time, and navigation is clear |
| Understandable | Visitors can follow it: text is readable, pages behave predictably, and forms help people fix mistakes |
| Robust | It works with screen readers and other assistive tools, now and as they change |

### The failures found most often

These come from WebAIM's scan of the top million home pages, using February 2026 data ([WebAIM][webaim]):

| Failure | Home pages | What it means for a visitor | The fix |
| --- | --- | --- | --- |
| Low-contrast text | 83.9% | Pale gray text can't be read by people with low vision | Darker text or a different background |
| Images with no text description | 53.1% | A screen reader says "image" and nothing more | A short description on each meaningful image |
| Form fields with no label | 51% | A blind visitor can't tell which box is for the email address | A visible label tied to each field |
| Empty links | 46.3% | A link, often an icon, is announced with no name | Text for every link |
| Empty buttons | 30.6% | The same, for buttons such as a menu or search icon | A name for every button |
| No page language set | 13.5% | A screen reader may read the page in the wrong accent | One line of code |

Overall, 95.9% of those home pages had detectable accessibility failures, and the average home page had 56.1 detectable errors ([WebAIM][webaim]).

The Justice Department's guidance for businesses lists much the same barriers: poor color contrast, color used as the only signal, images without descriptions, videos without captions, forms without labels or error messages, and navigation that only works with a mouse ([Justice Department][doj-guidance]).

### WCAG 2.1 or 2.2?

WCAG 2.2 is newer, and W3C says the guidelines are organized the same way in both versions ([W3C][w3c]). The federal rule for governments names 2.1 ([Justice Department][doj-rule]). If a vendor tests against 2.2, ask for the report to show where you stand on 2.1 Level AA as well.

## What an accessibility check involves

### Three checks you can do yourself

These are quick habits rather than a formal test, and they take no tools:

- **Put the mouse away and use the Tab key.** Every link, button and form field should be reachable, in a sensible order, with a visible outline showing where you are.
- **Zoom the browser to 200%.** Nothing should be cut off or overlap.
- **Try your main task with a screen reader.** Turn on the built-in screen reader on your phone or computer, and try to finish the main task on your site, such as booking or checking out.

### What scanners find, and what they miss

Free tools such as WAVE, axe and Lighthouse find errors in minutes, at no cost ([TestParty][tp-audit]). They don't settle the question. One audit firm estimates that automated detection finds roughly 60–70% of the issues in its own work, with the rest needing a person ([TestParty][tp-audit]). That firm sells audits, and the figure is its own estimate.

A useful audit includes a person testing real tasks with a keyboard and a screen reader, and a report of what was tested, what failed and what was fixed. Its scope should name your documents, videos and any third-party tools embedded in the site, such as booking, chat or payment widgets.

### Types of check, and how long they take

| Type of check | Typical time | Typical cost |
| --- | --- | --- |
| Free automated scan (WAVE, axe, Lighthouse) | Minutes | $0 |
| Automated monitoring | Set up in days | From $19 a month for one site |
| Audit combining scans and expert manual testing, small site | 1–3 weeks | $1,250–$5,000 |
| Full manual audit | 2–6 weeks | $100–$250 per main page; $2,500–$10,000 for up to about 12 pages |
| Conformance report (VPAT) | About a week | $350–$950 on top of an audit |

Times and costs are from TestParty, which draws on Accessible.org, DigitalA11Y and ADA Compliance Pros ([TestParty][tp-audit]). A VPAT (Voluntary Product Accessibility Template) is a formal conformance report written for government buyers. A complex application audit takes 4–8 weeks or more. For the first round of fixes, one firm works in 14-day cycles ([TestParty][tp-audit]); there's no independent benchmark for how long fixes take.

## What it costs

Auditing and fixing a small business site typically costs $1,500–$7,500 ([Accessible.org][accessible-cost]). A filed lawsuit typically runs $15,000–$90,000 or more once the settlement, defense lawyers and rushed repairs are added ([TestParty][tp-lawsuit]). Nearly all of these figures come from firms that sell accessibility services, so read them as the market's own estimates.

### Getting your site checked and fixed

| Item | Typical cost |
| --- | --- |
| Audit, fixes and a re-check, most sites | $1,500–$7,500 ([Accessible.org][accessible-cost]) |
| The same, for a small site whose own developers make the fixes | $1,500–$3,500 ([Accessible.org][accessible-cost]) |
| Fixes by outside help | $100–$200 an hour, or your own developers' time ([Accessible.org][accessible-rates]) |
| Small business audit, another estimate | $3,000–$5,000 to start ([ADA Compliance Pros][ada-pros]) |
| First-year program for a small business, higher estimate | $5,000–$20,000 ([TestParty][tp-program]) |

### What a lawsuit costs

| Item | Typical cost |
| --- | --- |
| Most common settlement | $5,000–$25,000, before defense lawyers ([TestParty][tp-settlement]) |
| Whole cost of a filed lawsuit, small or mid-sized business | $15,000–$90,000+, including the settlement, lawyers and rushed fixes ([TestParty][tp-fixes]) |
| Fixes under a settlement deadline | $2,000–$8,000 for small sites; $15,000–$50,000+ for online stores ([TestParty][tp-fixes]) |

### The federal tax credit for small businesses

- **Who qualifies:** a business with $1 million or less in gross receipts, or no more than 30 full-time employees, in the previous tax year. Meeting either test is enough ([CMS Max][cms-max], describing IRS Form 8826).
- **How much:** 50% of eligible accessibility spending between $250 and $10,250 in a year, so at most $5,000. It's claimed on IRS Form 8826, in any year with eligible spending ([BeAccessible][beaccessible-credit]; [Instead][instead]).
- **Example:** working through those rules, spending $5,000 on an audit and fixes gives a credit of $2,375, which is half of the $4,750 above the first $250. Your real cost is $2,625.
- **Check before you count on it:** whether a given website expense qualifies is a tax question. Ask a tax professional, and use the IRS's own instructions for Form 8826 rather than summaries like these.

## What makes it cost more or less

Building accessibility in from the start costs far less than repairing a finished site. One estimate puts repair at 2.5 to 4 times the cost ([Project Cost Estimator][pce]). Full manual audits are priced per main page ([TestParty][tp-audit]), so the cost follows the number of distinct page layouts and interactive parts more than the total page count.

| What drives the cost | Costs more | Costs less |
| --- | --- | --- |
| Timing | Fixing a finished site, or fixing under a legal deadline | Requiring WCAG 2.1 AA in the original build |
| Page layouts | Many one-off designs | A few templates reused across the site |
| Interactive parts | Checkout, booking, account areas, custom menus and pop-ups | Mostly text and images |
| Documents | Years of PDFs, each needing a fix or a replacement | Content published as web pages |
| Video and audio | A library without captions | Captions added as each video is made |
| Third-party tools | Embedded booking, chat, maps or payment widgets you can't edit | Tools chosen for their accessibility record |
| Platform | A website builder that limits access to the underlying code | A platform where the developer controls the code |
| Upkeep | New content added by staff who haven't been trained | A short checklist for whoever updates the site |

If you're planning a new site, put WCAG 2.1 AA in the brief from day one. [What does a small business website really cost in 2026?](/guides/small-business-website-cost) covers the rest of the build budget.

## Maryland: which date applies, and the state's own rules

Sixteen of Maryland's 23 counties, plus Baltimore City, fall under the April 26, 2027 date, and seven smaller counties have until April 26, 2028. Maryland also has its own older accessibility rules for state technology and school software, which reach vendors through contracts.

| Jurisdiction | 2020 Census population | Federal date |
| --- | --- | --- |
| State agencies | 6,177,224 statewide | April 26, 2027 |
| Queen Anne's County | 49,874 | April 26, 2028 |
| Talbot, Caroline, Dorchester, Garrett, Somerset and Kent counties | 19,198 (Kent) to 37,526 (Talbot) | April 26, 2028 |
| Worcester County, the next smallest | 52,460 | April 26, 2027 |
| The other 15 counties and Baltimore City | Each above 50,000 | April 26, 2027 |

Populations are from the Maryland Department of Planning's 2020 Census tables ([Maryland Department of Planning][md-planning]). The dates apply the Justice Department's rule to those figures ([Justice Department][doj-rule]); this table is a reading of the rule, not an official list.

- **Queen Anne's County is the close call.** Its 2020 Census count is 126 people under the line, and the rule uses the 2020 Census, not later estimates ([Justice Department][doj-rule]).
- **Towns and cities go by their own population,** so a municipality under 50,000 has until April 26, 2028 even inside a large county. Check each against the 2020 Census. A town department, library or police unit uses the population of the government it belongs to ([Justice Department][doj-rule]).
- **County school systems use the county's population,** and special districts have until April 26, 2028 whatever their size ([Justice Department][doj-rule]).

### Maryland's own rules

- **State agencies:** the Department of Information Technology (DoIT) Digital Accessibility Policy applies to all executive-branch departments. It requires agencies to confirm that technology they build or buy is accessible before it goes into use ([Maryland DoIT][md-doit-policy]).
- **Vendors to the state:** Maryland's nonvisual access standards have applied since March 1, 2005 to technology used or developed by executive-branch agencies, including through state contracts ([BeAccessible][beaccessible-md], citing the Code of Maryland Regulations, COMAR 14.33.02).
- **School software:** under a 2022 law, local school systems must evaluate digital tools for equal access by students with disabilities. The evaluation has to be done by someone who specializes in WCAG or is a blindness specialist ([Maryland Education Article § 7-910][justia]).
- **Help for agencies:** DoIT's Office of Accessibility tests agency sites and applications ([Maryland DoIT][md-doit-testing]).

**A caution about older Maryland pages.** On November 19, 2026, several DoIT pages still said state sites must comply by April 24, 2026, the date before the extension ([Maryland DoIT][md-doit-title2]). The federal date for the state is now April 26, 2027 ([Justice Department][doj-rule]). The state may still hold its own agencies to the earlier date as policy, but for the legal deadline, go by ada.gov.

**Lawsuits in Maryland.** Maryland isn't among the ten states with the most federal ADA Title III filings at mid-2026, according to Seyfarth Shaw ([Seyfarth Shaw][seyfarth]). That count is of where cases are filed, not of where the businesses being sued are based.

## Red flags when you hire help

The clearest warning sign is a product that promises compliance from one line of code. The Federal Trade Commission (FTC) ordered the best-known seller of such a product to pay $1 million over that claim ([FTC][ftc]).

### The accessiBe case

- **The complaint:** in January 2025, the FTC alleged that accessiBe's claims that its plug-in could make any website WCAG-compliant were false, misleading or not backed by evidence. The Commission approved the final order in April 2025 ([FTC][ftc]).
- **The order:** it requires a $1 million payment and bars the company from claiming its automated products can make a site WCAG-compliant, or keep it compliant, unless it has evidence ([FTC][ftc]).
- **How long it lasts:** the order runs for 20 years ([Seyfarth Shaw via Mondaq][mondaq]). The company neither admitted nor denied the allegations ([Vorp Labs][vorp]).

### Other warning signs

| Red flag | Why it matters | What to look for instead |
| --- | --- | --- |
| "Install our widget and you're ADA compliant" | The FTC acted against exactly this claim ([FTC][ftc]) | Fixes made in the site's own code |
| "100% compliant" or "guaranteed lawsuit-proof" | No regulation sets detailed standards for business sites ([Justice Department][doj-guidance]), so neither can be promised | A report of what was tested, what failed and what was fixed |
| An audit that's only a scanner report | Scanners miss issues that need a person; one firm puts its own automated detection at roughly 60–70% ([TestParty][tp-audit]) | Manual keyboard and screen-reader testing on real tasks |
| An "ADA certified" badge | There's no detailed federal standard for business sites to certify against ([Justice Department][doj-guidance]) | An accessibility statement with a contact for reporting problems |
| Old deadlines used to create urgency | Pages still advertising April 2026 predate the extension ([Justice Department][doj-rule]) | The current dates, checked at ada.gov |
| Lawsuit statistics with no source | Counts differ widely from one tracker to the next | A named source and year |
| A quote that leaves out PDFs, videos and embedded tools | These are often the bulk of the work | A scope that lists documents, media and third-party widgets |
| A separate "accessible version" of the site | For governments, it's allowed only in narrow cases ([Justice Department][doj-rule]) | One site that works for everyone |
| No plan after launch | New pages and uploads bring errors back | Staff training and regular re-checks |

## Sources

Everything here is as of November 2026. The Justice Department, FTC, W3C and Maryland state pages carry the rules and are the firmest sources. Lawsuit counts and cost figures come from law firms and from companies that sell accessibility services, so treat them as estimates; cost guides from sellers may lean high.

**Official and standards pages:** [Justice Department: fact sheet on the web rule for state and local governments][doj-rule] · [Justice Department: guidance on web accessibility and the ADA (March 2022)][doj-guidance] · [W3C: WCAG 2 at a glance][w3c] · [FTC: final order requiring accessiBe to pay $1 million][ftc] · [Maryland Department of Planning: 2020 Census population][md-planning] · [Maryland DoIT: Digital Accessibility Policy][md-doit-policy] · [Maryland DoIT: ADA Title II final rule update][md-doit-title2] · [Maryland DoIT: accessibility testing and training][md-doit-testing] · [Maryland Education Article § 7-910 (Justia)][justia]

**Research:** [WebAIM: The WebAIM Million][webaim]

**Law firms and news:** [Jackson Lewis: DOJ extends public entities' compliance deadline][jackson-lewis] · [Consumer Financial Services Law Monitor: DOJ extends Title II deadlines][cfslm] · [Seyfarth Shaw, ADA Title III blog: 2026 mid-year filings][seyfarth] · [Seyfarth Shaw via Mondaq: FTC orders accessiBe to pay $1M][mondaq] · [KEYT][keyt]

**Industry guides (most sell accessibility services):** [TestParty: accessibility audit cost in 2026][tp-audit] · [TestParty: compliance cost scenarios][tp-program] · [TestParty: compliance vs the cost of a lawsuit][tp-lawsuit] · [TestParty: lawsuit line items][tp-fixes] · [TestParty: settlement ranges][tp-settlement] · [TestParty: lawsuit trends][tp-trends] · [Accessible.org: cost to make a website ADA compliant][accessible-cost] · [Accessible.org: fixing costs][accessible-rates] · [ADA Compliance Pros: audit cost][ada-pros] · [Project Cost Estimator][pce] · [Accessibility Checker: lawsuits by state][a11y-checker] · [AudioEye: legal consequences][audioeye-legal] · [AudioEye: retail lawsuit data][audioeye-retail] · [Continual Engine][continual-engine] · [DYNO Mapper][dynomapper] · [Vorp Labs][vorp] · [CMS Max: IRS Form 8826][cms-max] · [BeAccessible: tax credit][beaccessible-credit] · [BeAccessible: Maryland][beaccessible-md] · [Instead][instead]

[doj-rule]: https://www.ada.gov/resources/2024-03-08-web-rule/
[doj-guidance]: https://www.ada.gov/resources/web-guidance/
[w3c]: https://www.w3.org/WAI/standards-guidelines/wcag/glance/
[webaim]: https://webaim.org/projects/million/
[ftc]: https://ftc.gov/news-events/news/press-releases/2025/04/ftc-approves-final-order-requiring-accessibe-pay-1-million
[md-planning]: https://mdp.state.md.us/MSDC/Documents/Census/Census2020/Redistricting/tables/Pop2020.pdf
[md-doit-policy]: https://doit.maryland.gov/policies/Accessibility/Pages/Maryland-Digital-Accessibility-Policy.aspx
[md-doit-title2]: https://doit.maryland.gov/policies/Accessibility/Pages/ADA-Title-II-Final-Rule-Update.aspx
[md-doit-testing]: https://doit.maryland.gov/services/Website-and-Applications/Pages/Accessibility-Testing-and-Training.aspx
[justia]: https://law.justia.com/codes/maryland/education/division-ii/title-7/subtitle-9/section-7-910/
[jackson-lewis]: https://www.jacksonlewis.com/insights/doj-extends-public-entities-compliance-deadline-ada-related-website-accessibility-hhss-may-2026-deadline-still-looms
[cfslm]: https://www.consumerfinancialserviceslawmonitor.com/2026/04/doj-extends-title-ii-ada-web-accessibility-rule-compliance-deadlines-for-state-and-local-governments/
[seyfarth]: https://www.adatitleiii.com/?p=5646
[mondaq]: https://www.mondaq.com/unitedstates/advertising-marketing-branding/1620186/federal-trade-commission-orders-accessibe-to-pay-%241m-for-misleading-claims-relating-to-automated-website-accessibility-remediation-tool
[keyt]: https://keyt.com/?p=1491564
[tp-audit]: https://testparty.ai/blog/accessibility-audit-cost-2026
[tp-program]: https://testparty.ai/blog/website-ada-compliance-cost
[tp-lawsuit]: https://testparty.ai/blog/cost-of-ada-compliance
[tp-fixes]: https://testparty.ai/blog/ada-website-lawsuit-cost
[tp-settlement]: https://testparty.ai/blog/fix-accessibility-or-get-sued
[tp-trends]: https://testparty.ai/blog/ada-lawsuit-trends-ecommerce-2025-2026-data
[accessible-cost]: https://accessible.org/cost-make-website-ada-compliant/
[accessible-rates]: https://accessible.org/?p=13025230
[ada-pros]: https://www.adacompliancepros.com/blog/accessibility-audit-cost
[pce]: https://projectcostestimator.com/blog/wcag-accessibility-cost-2026
[a11y-checker]: https://www.accessibilitychecker.org/blog/ada-website-lawsuits-by-state/
[audioeye-legal]: https://www.audioeye.com/post/legal-consequences-of-an-inaccessible-website/
[audioeye-retail]: https://www.audioeye.com/post/retail-accessibility-lawsuit-data/
[continual-engine]: https://www.continualengine.com/blog/ada-compliance-risks/
[dynomapper]: https://dynomapper.com/?p=5363
[vorp]: https://vorplabs.com/ai-threat-monitoring/companies/accessibe
[cms-max]: https://cmsmax.com/blog/irs-form-8826
[beaccessible-credit]: https://beaccessible.com/post/irs-tax-credit-to-write-off-web-accessibility-expenses/
[beaccessible-md]: https://beaccessible.com/ada-compliance-by-state/maryland/
[instead]: https://instead.com/resources/blog/disabled-access-credit-boosts-business-compliance
