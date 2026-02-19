import { motion } from "framer-motion";
import { BookOpen, MapPin, GraduationCap, DollarSign, Users, Mail, Target, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { instituteInfo, faculty } from "@/data/institute";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const sections = [
  {
    id: "overview",
    icon: BookOpen,
    title: "Overview",
    content: instituteInfo.overview
  },
  {
    id: "mission",
    icon: Target,
    title: "Mission & Goals",
    content: instituteInfo.mission.map(m => `• ${m}`).join("\n")
  },
  {
    id: "programs",
    icon: GraduationCap,
    title: "Programs Offered",
    content: "AMTICS offers 7 undergraduate B.Tech programs, 1 Integrated M.Tech, and 1 M.Tech program in Computer Science & Technology fields including CSE, AI & ML, Cyber Security, Cloud Computing, and more."
  },
  {
    id: "fees",
    icon: DollarSign,
    title: "Fees & Financial Info",
    content: "B.Tech Programs: ₹3.34 Lakhs total (approx). Scholarships available through UTU. Contact the institute for detailed fee breakdowns."
  },
  {
    id: "admission",
    icon: CheckCircle,
    title: "Admission Route",
    content: `Routes: ${instituteInfo.admissionRoute.join(", ")}\nEligibility: ${instituteInfo.eligibility}`
  },
  {
    id: "faculty",
    icon: Users,
    title: "Director & Faculty",
    content: "faculty_section"
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact & Location",
    content: `📍 ${instituteInfo.location}\n📧 ${instituteInfo.contact.email}\n🌐 ${instituteInfo.contact.blog}`
  }
];

export default function InstitutePage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <PageHeader
          title="Institute Information"
          subtitle="Everything about Asha M. Tarsadia Institute of Computer Science and Technology"
          icon={<div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center neon-glow"><BookOpen className="w-7 h-7 text-primary" /></div>}
        />

        <div className="flex items-center justify-center gap-2 mb-8 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          {instituteInfo.location}
        </div>

        <Accordion type="multiple" defaultValue={["overview"]} className="space-y-3">
          {sections.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <AccordionItem value={section.id} className="glass rounded-xl border-none overflow-hidden">
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-secondary/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-display font-semibold text-foreground">{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  {section.content === "faculty_section" ? (
                    <div className="space-y-3">
                      {faculty.map((f, fi) => (
                        <div key={fi} className="bg-secondary/30 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-display font-semibold text-sm text-foreground">{f.name}</span>
                            <span className="text-xs text-primary">{f.designation}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{f.expertise}</p>
                          <p className="text-xs text-muted-foreground mt-1">📧 {f.email}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-foreground/80 text-sm whitespace-pre-line">{section.content}</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
}
