import mongoose from "mongoose";
import dotenv from "dotenv";

import Page from "../models/pageModel.js";
import Section from "../models/sectionModel.js";

dotenv.config();

// Sections data for each service
const getServiceSectionsData = () => {
    return {
        "tvg-management": {
            hero: {
                name: "TVG Management",
                title: "Agency Management Services for Court Reporting Firms",
                para: "Running a court reporting firm involves more than just capturing the record. It demands consistent administrative precision, strong client communication, and an eye on the bigger business picture. That's where we come in. TVG Management acts as your operational backbone, helping you manage the day-to-day so you can focus on what matters most: your clients and your growth. Whether you're scaling up, facing staffing challenges, or need support during high-demand periods, our experienced team steps in. We bring reliability, consistency, and confidence to your agency.",
                tagline: "Solutions Powering Your Success.",
                cta: {
                    label: "Schedule a call now",
                    link: "/contact"
                },
                images: ["https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744158/1_xchuxa.png", "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744160/2_cifkvn.png", "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744161/3_zh1vxi.png", "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744164/4_hzviqx.png"],
            },
            overview: {
                heading: "Service Overview",
                title: "Proven Experience Delivering the Efficiency You Need",
                para1: "Managing a court reporting agency means balancing client expectations, reporter coordination, billing cycles, and deadlines, all while keeping your firm's reputation. That's where TVG Management comes in. We serve as your dependable operational partner, delivering customized administrative support designed specifically for court reporting firms.",
                para2: "Whether you're scaling your business, dealing with staff shortages, or simply looking to free up time for strategic growth, our experienced team is here to help. We take care of the behind-the-scenes so you can stay focused on delivering exceptional service to your clients.",
                img: "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744313/management-over_qfmq1f.png",
            },
            provide: {
                title: "What We Provide",
                para: "We manage your back office so you can focus on delivering top-tier client service. From scheduling to payroll, we streamline the chaos behind the scenes.",
                tagsLeft: [
                    { icon: "/fruit-citrus.png", text: "Vendor Coordination" },
                    { icon: "/fruit-citrus.png", text: "Branding & Marketing Help" },
                    { icon: "/fruit-citrus.png", text: "Client Onboarding Assistance" },
                    { icon: "/fruit-citrus.png", text: "Branding & Marketing Help" },
                    { icon: "/fruit-citrus.png", text: "Vendor Coordination" },
                    { icon: "/fruit-citrus.png", text: "Transcript & Exhibit Handling" }
                ],
                tagsRight: [
                    { icon: "/fruit-citrus.png", text: "Billing, Collections & Payroll" },
                    { icon: "/fruit-citrus.png", text: "Transcript & Exhibit Handling" },
                    { icon: "/fruit-citrus.png", text: "Vendor Coordination" },
                    { icon: "/fruit-citrus.png", text: "Branding & Marketing Help" },
                    { icon: "/fruit-citrus.png", text: "Client Onboarding Assistance" },
                    { icon: "/fruit-citrus.png", text: "Branding & Marketing Help" }
                ]
            },
            tvgEffect: {
                title: "What We Offer",
                items: [
                    {
                        icon: "/icons/calendar.png", // ya appropriate icon path
                        heading: "End-to-End Scheduling & Communication Management",
                        description: "We handle scheduling, resource calendar coordination, email monitoring, and phone answering, ensuring your agency runs smoothly and stays responsive. We are more than an answering service. We have the skills needed to answer questions the first time they are asked."
                    },
                    {
                        icon: "/icons/document.png", // ya appropriate icon path
                        heading: "Meticulous Transcript & Exhibit Processing",
                        description: "From accurate transcript formatting to exhibit marking, printing, binding, and final delivery, we manage it all with precision and speed."
                    },
                    {
                        icon: "/icons/invoice.png", // ya appropriate icon path
                        heading: "Streamlined Invoicing & Collections",
                        description: "Get paid on time with professional invoice generation, client billing follow-ups, and efficient collections support."
                    },
                    {
                        icon: "/icons/payroll.png", // ya appropriate icon path
                        heading: "Accurate Payroll & Bookkeeping",
                        description: "We process reporter payments and manage day-to-day bookkeeping, helping you maintain financial clarity and control."
                    }
                ]
            },
        },

        "tvg-stream": {
            hero: {
                name: "TVG Stream",
                title: "Legal Video, Trial Presentation and Conference A/V",
                para: "In today's fast-evolving legal landscape, advanced technology is no longer optional. It's indispensable. TVG Stream helps meet reporting firms with comprehensive remote support, offering secure platforms, real-time technical assistance, and flawless execution. Each small-point deposition matters, whether it's a routine deposition or a high-stakes trial. With our rentals, we support your firm in consistently delivering an exceptional client experience.",
                tagline: "Solutions Powering Your Success.",
                cta: {
                    label: "Schedule a call now",
                    link: "/contact"
                },
                images: ["https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744548/1_gtkec3.png", "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744551/2_qytmtr.png", "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744555/3_h0bsgp.png", "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744558/4_xqd0lh.png"],
            },
            overview: {
                heading: "Service Overview",
                title: "Sophisticated Solutions for Critical Testimony",
                para1: "Technology has become a fundamental executive in today's legal proceedings. TVG Stream provides professional set-up and technical support for depositions, hearings, and trials that has little left to chance. Whether working with real-time reporting agencies or multi-party proceeding with specialty tools such as the court reporting you will work with us.",
                para2: "From complex multi-party virtual depositions to high-stakes trials, we deliver the tools, expertise, and staffing required for a flawless, frictionless both on screen and in-person.",
                img: "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744563/stream-over_blh6cc.png",
            },
            provide: {
                title: "What We Provide",
                para: "We are your remote deposition and trial presentation experts. We manage the tech so your proceedings run smoothly, securely, and professionally.",
                tagsLeft: [
                    { icon: "/fruit-citrus.png", text: "Session-Sharing & Audio Testing" },
                    { icon: "/fruit-citrus.png", text: "Session Recording & Storage" },
                    { icon: "/fruit-citrus.png", text: "Trial Technician" },
                    { icon: "/fruit-citrus.png", text: "Hot-Seat Operation" },
                    { icon: "/fruit-citrus.png", text: "Full Remote Deposition Setup" },
                    { icon: "/fruit-citrus.png", text: "Live Trial Assistance & Broadcasting" }
                ],
                tagsRight: [
                    { icon: "/fruit-citrus.png", text: "Full Remote Deposition Setup" },
                    { icon: "/fruit-citrus.png", text: "Hot-Start Operation" },
                    { icon: "/fruit-citrus.png", text: "Trial Technician" },
                    { icon: "/fruit-citrus.png", text: "Session Recording & Storage" },
                    { icon: "/fruit-citrus.png", text: "Session-Sharing & Audio Testing" },
                    { icon: "/fruit-citrus.png", text: "Live Trial Assistance & Broadcasting" }
                ],
            },
            tvgEffect: {
                title: "What We Offer",
                items: [
                    {
                        icon: "/icons/remote-setup.png",
                        heading: "Remote Deposition Setup & Hosting",
                        description: "We manage platform access, scheduling, permissions, and environment control so you don't have to."
                    },
                    {
                        icon: "/icons/training.png",
                        heading: "Participant Training & Onboarding",
                        description: "Customized guidance for attorneys, clients, and witnesses to ensure confidence and preparedness before every session."
                    },
                    {
                        icon: "/icons/support.png",
                        heading: "Live Technical Support",
                        description: "Real-time troubleshooting during depositions and hearings to minimize disruptions and uphold professionalism."
                    },
                    {
                        icon: "/icons/exhibit.png",
                        heading: "Secure Exhibit Management",
                        description: "Confidential document sharing, digital exhibit marking, and real-time presentation tools to keep proceedings efficient and organized."
                    },
                    {
                        icon: "/icons/recording.png",
                        heading: "Session Recording & Archiving",
                        description: "Comprehensive video and audio capture with optional transcript syncing, security upload, and easily accessible when needed."
                    },
                    {
                        icon: "/icons/technician.png",
                        heading: "Trial Technician & Hot-Seat Operator Services",
                        description: "On-site or remote support for exhibit displays, video playback, and seamless coordination, ensuring flawless execution under pressure."
                    },
                    {
                        icon: "/icons/rentals.png",
                        heading: "Trial Equipment Rentals",
                        description: "Access professional-grade courtroom equipment, including screens, projectors, and audio systems, with full setup and on-site support in your rental region at the time of need."
                    }
                ]
            },
        },

        "tvg-books": {
            hero: {
                name: "TVG Books",
                title: "Bookkeeping Services for Court Reporting Firms",
                para: "Your business depends on more than exceptional service. It depends on strong financial health. Without transparent financial insights, even thriving agencies can face cash flow issues, compliance concerns, or inefficient planning. That's why precise bookkeeping isn't optional. It's critical. At TVG Books, we recognize the unique financial pressures you encounter: balancing reporter payroll, managing client invoicing, tracking vendor relationships, and compliance, or simply seeking better control over your finances, our team is here to make it easier. We offer specialized bookkeeping services tailored specifically for court reporting firms. With professional expertise and TVG Books, you can operate with confidence, clarity, and control.",
                tagline: "Solutions Powering Your Success.",
                cta: {
                    label: "Schedule a call now",
                    link: "/contact"
                },
                images: ["https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744592/1_iw2thv.png", "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744596/2_zt7tqc.png", "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744601/3_rxsqc1.png", "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744603/4_o9osb8.png"],
            },
            overview: {
                heading: "Service Overview",
                title: "Precision You Can Count On",
                para: [
                    "Running a court reporting firm means juggling many balls, and finances shouldn't be the one that keeps you up at night. At TVG Books, we specialize in taking the weight of bookkeeping and reconciling off your shoulders with services built specifically for your industry. Whether you're managing monthly invoices or prepping for year-end filing, we ensure your numbers stay clean, organized, and in control."
                ],
                img: "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744609/books-over_b2cwn3.png",
            },
            provide: {
                title: "What We Provide",
                para: "We make your invoices effortless. With organized bookkeeping, timely reporting, and tax-ready numbers, you're always audit-ready.",
                tagsLeft: [
                    { icon: "/fruit-citrus.png", text: "Invoicing & Collections" },
                    { icon: "/fruit-citrus.png", text: "Budget Tracking & Cost Analysis" },
                    { icon: "/fruit-citrus.png", text: "Expense Categorization & Management" },
                    { icon: "/fruit-citrus.png", text: "Vendor Payments & Account Updates" },
                    { icon: "/fruit-citrus.png", text: "Tax Document Preparation Support" },
                    { icon: "/fruit-citrus.png", text: "Bookkeeping & Reconciliation" }
                ],
                tagsRight: [
                    { icon: "/fruit-citrus.png", text: "Invoicing & Collections" },
                    { icon: "/fruit-citrus.png", text: "Financial Reporting & Insights" },
                    { icon: "/fruit-citrus.png", text: "Payroll & Contractor Payments" },
                    { icon: "/fruit-citrus.png", text: "Bookkeeping & Reconciliation" },
                    { icon: "/fruit-citrus.png", text: "Tax Document Preparation Support" },
                    { icon: "/fruit-citrus.png", text: "Vendor Payments & Account Updates" }
                ],
            },
            tvgEffect: {
                title: "What We Offer",
                items: [
                    {
                        icon: "/icons/bookkeeping.png",
                        heading: "Bookkeeping (QuickBooks Specialists)",
                        description: "We handle the day-to-day financial entries so you don't have to. From recording accounts to tracking income and expenses, our team of QuickBooks specialists ensures your books are accurate, organized, and always ready for audits or strategic decisions about your business health."
                    },
                    {
                        icon: "/icons/billing.png",
                        heading: "Client Billing and Invoicing",
                        description: "Never miss a payment. We streamline your client billing process by generating timely, accurate invoices, and tracking payments. We make it easy for your clients to pay, and for you to stay on top of your receivables—maximizing your firm's cash flow."
                    },
                    {
                        icon: "/icons/compliance.png",
                        heading: "Annual Filings and Basic Compliance Support",
                        description: "Tax season doesn't have to be stressful. We prepare and manage annual financial documents, assist with 1099s, and help ensure your business meets the basic compliance requirements for filings on time, every time."
                    },
                    {
                        icon: "/icons/reporting.png",
                        heading: "Financial Reporting",
                        description: "Make confident business decisions with reports that actually make sense. From profit and loss statements to customized financial summaries, we run so you can focus on leveraging budgeting, or just understanding where your business stands."
                    }
                ]
            },

        },

        "tvg-connect": {
            hero: {
                name: "TVG Connect",
                title: "Association Management for the Court Reporting Industry",
                para: "Professional organizations and trade associations thrive on connection, coordination, and clear leadership. But managing all the moving parts can be overwhelming. From day-to-day operations to annual conferences, it takes more than passion to keep members engaged and everything running smoothly. That's where TVG Connect steps in. We specialize in association management services designed specifically for the court reporting industry, offering customized solutions that keep your organization efficient, professional, and people-focused. Whether you're a growing association or a well-established group looking for scalable support, our experienced team brings structure, strategy, and heart to every detail.",
                tagline: "Solutions Powering Your Success.",
                cta: {
                    label: "Schedule a call now",
                    link: "/contact"
                },
                images: ["https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744631/1_icxey6.png", "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744635/2_jgonvs.png", "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744638/3_cz8rr0.png", "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744642/4_chlfpl.png"],
            },
            overview: {
                heading: "Service Overview",
                title: "Stronger Communities. Smarter Management.",
                para1: "Professional organizations and trade associations thrive on connection, coordination, and clear leadership. But managing all the moving parts can be overwhelming. From day-to-day operations to annual conferences, it takes more than passion to keep members engaged and everything running smoothly. That's where TVG Connect steps in. We specialize in association management services designed specifically for the court reporting industry, offering customized solutions that keep your organization efficient, professional, and people-focused. Whether you're a growing association or a well-established group looking for scalable support, our experienced team brings structure, strategy, and heart to every detail.",
                para2: "From executive direction to event planning and member engagement, our services are built to meet the unique demands of associations in compliance-heavy and professional sectors. We provide the hands-on support and operational expertise needed to streamline your organization’s goals so you can focus on creating a lasting impact in your field.",
                img: "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744694/connect-over_jzfxq7.png",
            },
            provide: {
                title: "What We Provide",
                para: "Our team helps associations streamline operations, strengthen member engagement, and plan annual conferences, all while providing the flexibility to grow as their needs evolve.",
                tagsLeft: [
                    { icon: "/fruit-citrus.png", text: "Press Release & Media Kit Creation" },
                    { icon: "/fruit-citrus.png", text: "Reputation Management & Testimonials" },
                    { icon: "/fruit-citrus.png", text: "Messaging & Positioning Strategy" },
                    { icon: "/fruit-citrus.png", text: "Analytics & Engagement Tracking" },
                    { icon: "/fruit-citrus.png", text: "Campaign Planning & Scheduling" },
                    { icon: "/fruit-citrus.png", text: "Reputation Management & Testimonials" }
                ],
                tagsRight: [
                    { icon: "/fruit-citrus.png", text: "Press Release & Media Kit Creation" },
                    { icon: "/fruit-citrus.png", text: "Reputation Management & Testimonials" },
                    { icon: "/fruit-citrus.png", text: "Messaging & Positioning Strategy" },
                    { icon: "/fruit-citrus.png", text: "Analytics & Engagement Tracking" },
                    { icon: "/fruit-citrus.png", text: "Campaign Planning & Scheduling" },
                    { icon: "/fruit-citrus.png", text: "Reputation Management & Testimonials" }
                ],
            },
            tvgEffect: {
                title: "What We Offer",
                items: [
                    {
                        icon: "/icons/leadership.png",
                        heading: "Executive Director Placement and Leadership",
                        description: "We place experienced leaders to manage day-to-day operations, drive strategic planning, support board governance, and act as the liaison between members, partners, and stakeholders."
                    },
                    {
                        icon: "/icons/event-planning.png",
                        heading: "Event Planning and Coordination",
                        description: "Conferences, webinars, workshops, we plan and manage it all. Our event experts handle timelines, vendors, promotion, registration, and execution with precision so you can focus on delivering value."
                    },
                    {
                        icon: "/icons/communications.png",
                        heading: "Membership and Communications Management",
                        description: "Engagement is everything. We manage member onboarding, renewals, and consistent communication such as email newsletters, member portals, and event updates to keep your community informed and connected."
                    }
                ]
            },
        },

        "tvg-verify": {
            hero: {
                name: "TVG Verify",
                title: "End-to-End Employment Screening & Background Checks",
                para: "Great hires start with great data. Whether you're an employer, recruiting or staffing agency, the cost of a bad hire can be high, not just financially but reputationally. That's why trusted, legally compliant screening is essential. TVG Verify partners with USAFACT to deliver reliable background check solutions that meet today's fast-paced hiring demands. From identity verification to employment history and credential checks, we bring confidence without slowing down your process.",
                tagline: "Solutions Powering Your Success.",
                cta: {
                    label: "Schedule a call now",
                    link: "/contact"
                },
                images: ["https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744730/3_yvhrkc.png", "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744734/4_pmvwcs.png", "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744723/1_lrgepa.png", "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744726/2_waagm9.png"],
            },
            overview: {
                heading: "Service Overview",
                title: "Screen with Confidence. Hire with Certainty.",
                para1: "In today's competitive talent market, your hiring process must be both swift and reliable. TVG Verify delivers comprehensive employment screening through the USAFACT platform, seamlessly integrating real-time data, automated workflows, and regulatory compliance into one efficient system.",
                para2: "Whether you're onboarding talent in the U.S. or internationally, our scalable screening services adapt to your team's needs, ensuring every hire is legally compliant and hassle-free.",
                img: "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744739/verify-over_ngzpmb.png",
            },
            provide: {
                title: "What We Provide",
                para: "We specialize in fast, secure, and thorough employee screenings. TVG Verify provides you with the data you need to make intelligent hiring decisions.",
                tagsLeft: [
                    { icon: "/fruit-citrus.png", text: "Employment History" },
                    { icon: "/fruit-citrus.png", text: "Workforce Screening" },
                    { icon: "/fruit-citrus.png", text: "Criminal Background Checks" },
                    { icon: "/fruit-citrus.png", text: "Credit Record & History" },
                    { icon: "/fruit-citrus.png", text: "I-9 & E-Verify" },
                    { icon: "/fruit-citrus.png", text: "Identity Checks" }
                ],
                tagsRight: [
                    { icon: "/fruit-citrus.png", text: "Driving Records" },
                    { icon: "/fruit-citrus.png", text: "Drug & Health Screenings" },
                    { icon: "/fruit-citrus.png", text: "Identity Checks" },
                    { icon: "/fruit-citrus.png", text: "I-9 & E-Verify" },
                    { icon: "/fruit-citrus.png", text: "Credit Record & History" },
                    { icon: "/fruit-citrus.png", text: "Criminal Background Checks" }
                ],
            },
            tvgEffect: {
                title: "What We Offer",
                items: [
                    {
                        icon: "/icons/screening.png",
                        heading: "Comprehensive Screening Packages",
                        description: "Get full-spectrum background checks – from criminal history and driver records, to job credentials, drug screens, professional verification, and more – all customized to your industry needs."
                    },
                    {
                        icon: "/icons/platform.png",
                        heading: "SmartHire Platform",
                        description: "A centralized client dashboard with live status updates, e-signatures, integrated workflows, and direct candidate communication, making screening faster and more transparent."
                    },
                    {
                        icon: "/icons/compliance.png",
                        heading: "Legal Compliance at Every Step",
                        description: "Fully certified by the Professional Background Screening Association (PBSA), and 100% FCRA-compliant, with adherence to all relevant state and federal regulations."
                    },
                    {
                        icon: "/icons/global.png",
                        heading: "Global Screening Reach",
                        description: "Conduct screenings in the U.S. and across most global markets. We offer customized solutions for each geography and job type, ideal for remote or international hiring."
                    }
                ]
            },

        },


        "tvg-reporting": {
            hero: {
                name: "TVG Reporting",
                title: "Court Reporting and Legal Videography Services",
                para: "We provide experienced court reporters and legal videographers who consistently deliver accurate and timely records, whether in person or remotely. Our team works seamlessly under your brand or as an extension of your operations, ensuring your clients receive top-tier service while you maintain control and confidence in every assignment. Let us handle the logistics so you can scale your services without sacrificing quality.",
                tagline: "Solutions Powering Your Success.",
                cta: {
                    label: "Schedule a call now",
                    link: "/contact"
                },
                images: ["https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744761/2_l6ckiq.png", "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744765/3_osoee9.png", "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744757/1_rh3uob.png"],
            },
            overview: {
                heading: "Service Overview",
                title: "Precision That Speaks for Itself",
                para1: "At TVG Reporting, we understand what court reporting firm owners need: dependable professionals who deliver accurate, impartial, and timely records under your brand name. That's why we partner with court reporting agencies across Massachusetts, Connecticut, and nationwide, and nationwide through our trusted network to register your coverage and reinforce your reputation.",
                para2: "Whether it's assisting overflow, staffing a short-notice case, or seeking remote coverage across jurisdictions, our experienced team of certified reporters and legal videographers is here to support your operations so you can confidently meet client expectations without missing a beat.",
                img: "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766744772/reporting-over_wl59r0.png",
            },
            provide: {
                title: "What We Provide",
                para: "We're here to back you up with professional reporters and videographers whenever you need an extra hand—or when a job takes you outside your usual coverage area. Wherever the work is, we'll help you say yes to your clients with confidence.",
                tagsLeft: [
                    { icon: "/fruit-citrus.png", text: "Court Reporter Performance Monitoring" },
                    { icon: "/fruit-citrus.png", text: "Job Assignment & Coordination" },
                    { icon: "/fruit-citrus.png", text: "Real-Time & Rough Draft Delivery" },
                    { icon: "/fruit-citrus.png", text: "Reporter Support & Management" },
                    { icon: "/fruit-citrus.png", text: "Exhibit Processing & Digital Indexing" },
                    { icon: "/fruit-citrus.png", text: "On-Demand & Remote Coverage" }
                ],
                tagsRight: [
                    { icon: "/fruit-citrus.png", text: "Transcript To Video Synchronization" },
                    { icon: "/fruit-citrus.png", text: "On-Person & Remote Coverage" },
                    { icon: "/fruit-citrus.png", text: "Exhibit Processing & Digital Indexing" },
                    { icon: "/fruit-citrus.png", text: "Reporter Support & Management" },
                    { icon: "/fruit-citrus.png", text: "Real-Time & Rough Draft Delivery" },
                    { icon: "/fruit-citrus.png", text: "Job Assignment & Coordination" }
                ],
            },
            tvgEffect: {
                title: "What We Offer",
                items: [
                    {
                        icon: "/icons/deposition.png",
                        heading: "In-Person & Remote Deposition Coverage",
                        description: "Scalable solutions for on-site or virtual proceedings available when and where you need us."
                    },
                    {
                        icon: "/icons/realtime.png",
                        heading: "Realtime Reporting & Rough Drafts",
                        description: "Live access and quick-turnaround drafts to keep your clients ahead of the curve."
                    },
                    {
                        icon: "/icons/transcript.png",
                        heading: "On-Time Transcript Production & Delivery",
                        description: "Transcripts videos delivered promptly, in your firm's preferred formats and specifications."
                    },
                    {
                        icon: "/icons/reporters.png",
                        heading: "Experienced Reporters",
                        description: "Our professionals maintain the highest standards of neutrality, accuracy, and discretion."
                    },
                    {
                        icon: "/icons/videographers.png",
                        heading: "Legal Videographers",
                        description: "Our in-house videographers are experts in providing consistent, high-quality legal video services."
                    }
                ]
            },

        },

    };
};







const seedServices = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ MongoDB connected");

        /* ------------------------------
           1️⃣ SERVICES PARENT PAGE
        ------------------------------ */

        const servicesPage = await Page.findOneAndUpdate(
            { slug: "services" },
            {
                slug: "services",
                title: "Services",
                route: "/services",
                parentSlug: null,
                showInNavbar: true,
                order: 2,
                seo: {
                    metaTitle: "Our Services | The Varallo Group",
                    metaDescription:
                        "Explore The Varallo Group's full suite of court reporting and legal support services.",
                },
            },
            { upsert: true, new: true }
        );

        console.log("✅ Services parent page seeded");

        /* ------------------------------
           2️⃣ SERVICES CHILD PAGES
        ------------------------------ */

        const services = [
            {
                slug: "tvg-management",
                title: "TVG Management",
                order: 1,
            },

            {
                slug: "tvg-stream",
                title: "TVG Stream",
                order: 2,
            },
            {
                slug: "tvg-books",
                title: "TVG Books",
                order: 3,
            },
            {
                slug: "tvg-connect",
                title: "TVG Connect",
                order: 4,
            },
            {
                slug: "tvg-verify",
                title: "TVG Verify",
                order: 5,
            },
            {
                slug: "tvg-reporting",
                title: "TVG Reporting",
                order: 6,
            },
        ];

        for (const service of services) {
            await Page.findOneAndUpdate(
                { slug: service.slug },
                {
                    slug: service.slug,
                    title: service.title,
                    route: `/services/${service.slug}`,
                    parentSlug: "services",
                    showInNavbar: false, // hover me ayega
                    order: service.order,
                    seo: {
                        metaTitle: `${service.title} | The Varallo Group`,
                        metaDescription: `Learn more about ${service.title} services at The Varallo Group.`,
                    },
                },
                { upsert: true, new: true }
            );
        }

        console.log("✅ All service pages seeded");

        /* ------------------------------
           3️⃣ SEED SECTIONS FOR EACH SERVICE
        ------------------------------ */

        const serviceSectionsData = getServiceSectionsData();
        const sectionDefinitions = [
            { key: "hero", order: 1 },
            { key: "overview", order: 2 },
            { key: "provide", order: 3 },
            { key: "tvgEffect", order: 4 },
            { key: "overview2", order: 5 },
        ];

        for (const service of services) {
            console.log(`\n📝 Seeding sections for ${service.slug}...`);
            const serviceData = serviceSectionsData[service.slug];

            for (const section of sectionDefinitions) {
                if (serviceData && serviceData[section.key]) {
                    await Section.findOneAndUpdate(
                        {
                            pageSlug: service.slug,
                            sectionKey: section.key,
                        },
                        {
                            pageSlug: service.slug,
                            sectionKey: section.key,
                            order: section.order,
                            isActive: true,
                            content: serviceData[section.key],
                        },
                        { upsert: true, new: true }
                    );
                    console.log(`   ✅ ${section.key} section seeded`);
                }
            }
        }

        console.log("\n✅ All service sections seeded");

        /* ------------------------------
           4️⃣ SERVICES HERO SECTION
           (Only for /services page)
        ------------------------------ */

        await Section.findOneAndUpdate(
            {
                pageSlug: "services",
                sectionKey: "services-hero",
            },
            {
                pageSlug: "services",
                sectionKey: "services-hero",
                order: 2, // after the main hero section
                isActive: true,
                content: {
                    Image: {
                        url: "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766740266/s-hero-left_zojvzd.gif",
                        alt: "TVG Services overview",
                    },
                    centerContent: {
                        heading: "A Support Company That Understands Your Business",
                        Image: {
                            url: "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766740263/s-hero_wwdqx5.gif",
                            alt: "Integrated services ecosystem",
                        },
                        description:
                            "At The Varallo Group, we bring together six specialized sub-brands under one clear vision. We are your single source for smarter, effective, and scalable success.",
                        cta: {
                            label: "Schedule a call now",
                            link: "/contact",
                            
                        },
                    },
                    Image: {
                        url: "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766740266/s-hero-right_c1wbfa.gif",
                        alt: "Professional legal support",
                    },
                },
            },
            { upsert: true, new: true }
        );

        console.log("✅ Services parent hero section seeded");

        /* ------------------------------
           5️⃣ SERVICES GRID SECTION
           (6 Cards with hover effect)
        ------------------------------ */

        await Section.findOneAndUpdate(
            {
                pageSlug: "services",
                sectionKey: "services-grid",
            },
            {
                pageSlug: "services",
                sectionKey: "services-grid",
                order: 3,
                isActive: true,
                content: {
                    sectionHeading: "Services",
                    cards: [
                        {
                            id: "tvg-management",
                            heading: "TVG Management",
                            description: "Comprehensive agency management support focused on optimizing your day-to-day operations.",
                            image: {
                                url: "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766740318/management_qo7kgt.jpg",
                                alt: "TVG Management team meeting"
                            },
                            link: "/services/tvg-management"
                        },
                        {
                            id: "tvg-stream",
                            heading: "TVG Stream",
                            description: "Cutting-edge trial presentation and event A/V, with detailed-focused on-site support.",
                            image: {
                                url: "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766740322/stream_dv7tq4.jpg",
                                alt: "TVG Stream production setup"
                            },
                            link: "/services/tvg-stream"
                        },
                        {
                            id: "tvg-books",
                            heading: "TVG Books",
                            description: "Bookkeeping support services for court reporting and other professional industries.",
                            image: {
                                url: "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766740350/books_vq2g4d.jpg",
                                alt: "TVG Books accounting services"
                            },
                            link: "/services/tvg-books"
                        },
                        {
                            id: "tvg-connect",
                            heading: "TVG Connect",
                            description: "Focused management services built for professional associations and organizations.",
                            image: {
                                url: "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766740352/connect_gg3fjk.jpg",
                                alt: "TVG Connect collaboration"
                            },
                            link: "/services/tvg-connect"
                        },
                        {
                            id: "tvg-verify",
                            heading: "TVG Verify",
                            description: "Let us ensure your hiring is secure with reliable background screening and compliance checks, powered by SmartHire.",
                            image: {
                                url: "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766740325/verify_nnttrc.jpg",
                                alt: "TVG Verify compliance"
                            },
                            link: "/services/tvg-verify"
                        },
                        {
                            id: "tvg-reporting",
                            heading: "TVG Reporting",
                            description: "Our nationwide network of court reporters and legal videographers is ready to support your firm wherever you need.",
                            image: {
                                url: "https://res.cloudinary.com/dh3dys6sf/image/upload/v1766740322/stream_dv7tq4.jpg",
                                alt: "TVG Reporting analytics"
                            },
                            link: "/services/tvg-reporting"
                        }
                    ]
                },
            },
            { upsert: true, new: true }
        );


        console.log("✅ Services grid section seeded");
        console.log("🎉 SERVICES SEED COMPLETED SUCCESSFULLY");
        process.exit(0);
    } catch (error) {
        console.error("❌ Services seed failed:", error);
        process.exit(1);
    }
};

seedServices();









