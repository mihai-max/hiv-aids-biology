"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Info, Phone, Heart, AlertCircle, ChevronDown } from "lucide-react"
import { useLanguage } from "./contexts/LanguageContext"
import { LanguageSwitcher } from "./components/LanguageSwitcher"

const translations = {
  en: {
    title: "All About HIV & AIDS",
    subtitle: "Informative, current, and easy to understand",
    importantFacts: "Important Facts",
    factsDescription: "Basic information about HIV and AIDS",
    whatIsHIV: "What is HIV?",
    hivDescription:
      "HIV (Human Immunodeficiency Virus) is a virus that attacks the immune system and impairs the body's ability to fight infections.",
    whatIsAIDS: "What is AIDS?",
    aidsDescription:
      "AIDS (Acquired Immune Deficiency Syndrome) is an advanced stage of HIV infection where the immune system is severely weakened.",
    transmission: "Transmission",
    transmissionDescription:
      "HIV is mainly transmitted through unprotected sexual intercourse, sharing of injection needles, and from mother to child during pregnancy.",
    information: "Information",
    infoDescription: "Detailed information on various aspects of HIV and AIDS",
    prevention: "Prevention",
    testing: "Testing",
    treatment: "Treatment",
    statistics: "Statistics in Germany",
    statsDescription: "Current figures on HIV and AIDS in Germany",
    peopleWithHIV: "People living with HIV in Germany",
    newInfections: "New infections per year",
    knowStatus: "Diagnosed know their status",
    receiveTherapy: "Diagnosed receive therapy",
    helpSupport: "Help & Support",
    supportDescription: "Counseling centers and resources in Germany",
    aboutThisSite: "About this Site",
    siteDescription:
      "This information page provides basic information about HIV and AIDS in Germany. For medical advice, please consult a professional.",
    importantLinks: "Important Links",
    license: "License",
    licenseDescription: "This website is published under the LGPL-2.1 License.",
    licenseDetails: "License Details",
    hivPrevention: "HIV Prevention",
    preventionDescription: "How to protect yourself and others",
    preventionMethods: "Prevention Methods",
    useCondoms: "Use condoms during sexual activities",
    prEP: "PrEP (Pre-Exposure Prophylaxis) for high-risk groups",
    avoidSharingNeedles: "Avoid sharing injection needles",
    regularTesting: "Regular testing for HIV and other sexually transmitted infections",
    hivTesting: "HIV Testing",
    testingDescription: "When and where to get tested",
    testingOptions: "Testing options in Germany",
    freeAnonymousTests: "Free anonymous tests at public health departments",
    aidsHelpCenters: "AIDS help centers in many cities",
    doctorsAndClinics: "General practitioners and specialist clinics",
    selfTests: "Self-tests from pharmacies",
    hivTreatment: "HIV Treatment",
    treatmentDescription: "Modern therapy options",
    antiretroviralTherapy: "Antiretroviral Therapy (ART)",
    modernMedication: "Modern medications can reduce viral load below detectable levels",
    uEqualsU: "With successful treatment, HIV is no longer transmittable (U=U)",
    earlyTreatment: "Early treatment improves quality of life and life expectancy",
    regularCheckups: "Regular medical check-ups are important",
  },
  de: {
    title: "Alles über HIV & AIDS",
    subtitle: "Informativ, aktuell und verständlich erklärt",
    importantFacts: "Wichtige Fakten",
    factsDescription: "Grundlegende Informationen über HIV und AIDS",
    whatIsHIV: "Was ist HIV?",
    hivDescription:
      "HIV (Humanes Immundefizienz-Virus) ist ein Virus, das das Immunsystem angreift und die Fähigkeit des Körpers beeinträchtigt, Infektionen zu bekämpfen.",
    whatIsAIDS: "Was ist AIDS?",
    aidsDescription:
      "AIDS (Acquired Immune Deficiency Syndrome) ist ein fortgeschrittenes Stadium der HIV-Infektion, bei dem das Immunsystem stark geschwächt ist.",
    transmission: "Übertragung",
    transmissionDescription:
      "HIV wird hauptsächlich durch ungeschützten Geschlechtsverkehr, gemeinsame Nutzung von Injektionsnadeln und von Mutter zu Kind während der Schwangerschaft übertragen.",
    information: "Informationen",
    infoDescription: "Detaillierte Informationen zu verschiedenen Aspekten von HIV und AIDS",
    prevention: "Prävention",
    testing: "Testung",
    treatment: "Behandlung",
    statistics: "Statistiken in Deutschland",
    statsDescription: "Aktuelle Zahlen zu HIV und AIDS in Deutschland",
    peopleWithHIV: "Menschen leben mit HIV in Deutschland",
    newInfections: "Neuinfektionen pro Jahr",
    knowStatus: "Diagnostizierte kennen ihren Status",
    receiveTherapy: "Diagnostizierte erhalten Therapie",
    helpSupport: "Hilfe & Unterstützung",
    supportDescription: "Beratungsstellen und Ressourcen in Deutschland",
    aboutThisSite: "Über diese Seite",
    siteDescription:
      "Diese Informationsseite bietet grundlegende Informationen zu HIV und AIDS in Deutschland. Für medizinische Beratung wenden Sie sich bitte an Fachpersonal.",
    importantLinks: "Wichtige Links",
    license: "Lizenz",
    licenseDescription: "Diese Website ist unter der LGPL-2.1 Lizenz veröffentlicht.",
    licenseDetails: "Lizenzdetails",
    hivPrevention: "HIV-Prävention",
    preventionDescription: "Wie man sich und andere schützen kann",
    preventionMethods: "Präventionsmethoden",
    useCondoms: "Verwendung von Kondomen bei sexuellen Aktivitäten",
    prEP: "PrEP (Prä-Expositions-Prophylaxe) für Hochrisikogruppen",
    avoidSharingNeedles: "Vermeidung der gemeinsamen Nutzung von Injektionsnadeln",
    regularTesting: "Regelmäßige Testung auf HIV und andere sexuell übertragbare Infektionen",
    hivTesting: "HIV-Testung",
    testingDescription: "Wann und wo man sich testen lassen sollte",
    testingOptions: "Testmöglichkeiten in Deutschland",
    freeAnonymousTests: "Kostenlose anonyme Tests bei Gesundheitsämtern",
    aidsHelpCenters: "Aidshilfe-Beratungsstellen in vielen Städten",
    doctorsAndClinics: "Hausärzte und Facharztpraxen",
    selfTests: "Selbsttests aus der Apotheke",
    hivTreatment: "HIV-Behandlung",
    treatmentDescription: "Moderne Therapiemöglichkeiten",
    antiretroviralTherapy: "Antiretrovirale Therapie (ART)",
    modernMedication: "Moderne Medikamente können die Viruslast unter die Nachweisgrenze senken",
    uEqualsU: "Bei erfolgreicher Behandlung ist HIV nicht mehr übertragbar (N=N)",
    earlyTreatment: "Frühzeitige Behandlung verbessert die Lebensqualität und -erwartung",
    regularCheckups: "Regelmäßige ärztliche Kontrollen sind wichtig",
  },
}

export default function HIVAIDSInfo() {
  const [mounted, setMounted] = useState(false)
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white">
      <LanguageSwitcher />

      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
          <div className="container mx-auto px-4 py-20 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.title}</h1>
              <p className="text-xl md:text-2xl">{t.subtitle}</p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Quick Facts */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">{t.importantFacts}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.factsDescription}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: t.whatIsHIV,
              description: t.hivDescription,
              icon: <Info className="h-10 w-10 text-red-600" />,
            },
            {
              title: t.whatIsAIDS,
              description: t.aidsDescription,
              icon: <AlertCircle className="h-10 w-10 text-red-600" />,
            },
            {
              title: t.transmission,
              description: t.transmissionDescription,
              icon: <ExternalLink className="h-10 w-10 text-red-600" />,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  {item.icon}
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Information Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">{t.information}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.infoDescription}</p>
          </motion.div>

          <Tabs defaultValue="prevention" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="prevention">{t.prevention}</TabsTrigger>
              <TabsTrigger value="testing">{t.testing}</TabsTrigger>
              <TabsTrigger value="treatment">{t.treatment}</TabsTrigger>
            </TabsList>
            <TabsContent value="prevention" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.hivPrevention}</CardTitle>
                  <CardDescription>{t.preventionDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">{t.preventionMethods}</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronDown className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                          <span>{t.useCondoms}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronDown className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                          <span>{t.prEP}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronDown className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                          <span>{t.avoidSharingNeedles}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronDown className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                          <span>{t.regularTesting}</span>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="h-64 rounded-lg overflow-hidden bg-cover bg-center"
                      style={{ backgroundImage: "url(/prevention.jpg)" }}
                      aria-label={t.hivPrevention}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="testing" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.hivTesting}</CardTitle>
                  <CardDescription>{t.testingDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">{t.testingOptions}</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronDown className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                          <span>{t.freeAnonymousTests}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronDown className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                          <span>{t.aidsHelpCenters}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronDown className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                          <span>{t.doctorsAndClinics}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronDown className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                          <span>{t.selfTests}</span>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="h-64 rounded-lg overflow-hidden bg-cover bg-center"
                      style={{ backgroundImage: "url(/testing.jpg)" }}
                      aria-label={t.hivTesting}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="treatment" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.hivTreatment}</CardTitle>
                  <CardDescription>{t.treatmentDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">{t.antiretroviralTherapy}</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <ChevronDown className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                          <span>{t.modernMedication}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronDown className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                          <span>{t.uEqualsU}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronDown className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                          <span>{t.earlyTreatment}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronDown className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                          <span>{t.regularCheckups}</span>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="h-64 rounded-lg overflow-hidden bg-cover bg-center"
                      style={{ backgroundImage: "url(/treatment.jpg)" }}
                      aria-label={t.hivTreatment}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">{t.statistics}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.statsDescription}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "~90.000", label: t.peopleWithHIV },
            { value: "~2.000", label: t.newInfections },
            { value: "~95%", label: t.knowStatus },
            { value: "~96%", label: t.receiveTherapy },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm border text-center"
            >
              <p className="text-3xl font-bold text-red-600 mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">{t.helpSupport}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.supportDescription}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-red-600" />
                    Beratungshotlines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">Deutsche AIDS-Hilfe</h3>
                    <p className="text-muted-foreground">0180 33 19411</p>
                    <Link
                      href="https://www.aidshilfe.de"
                      className="text-red-600 flex items-center gap-1 text-sm mt-1 hover:underline"
                      target="_blank"
                    >
                      Website besuchen <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                  <div>
                    <h3 className="font-medium">Bundeszentrale für gesundheitliche Aufklärung</h3>
                    <p className="text-muted-foreground">0221 89 20 31</p>
                    <Link
                      href="https://www.bzga.de"
                      className="text-red-600 flex items-center gap-1 text-sm mt-1 hover:underline"
                      target="_blank"
                    >
                      Website besuchen <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    Lokale Beratungsstellen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">Aidshilfe vor Ort</h3>
                    <p className="text-muted-foreground">Beratungsstellen in über 120 Städten in Deutschland</p>
                    <Link
                      href="https://www.aidshilfe.de/adressen"
                      className="text-red-600 flex items-center gap-1 text-sm mt-1 hover:underline"
                      target="_blank"
                    >
                      Beratungsstelle finden <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                  <div>
                    <h3 className="font-medium">Gesundheitsämter</h3>
                    <p className="text-muted-foreground">Anonyme und kostenlose Testangebote</p>
                    <Link
                      href="https://tools.rki.de/plztool/"
                      className="text-red-600 flex items-center gap-1 text-sm mt-1 hover:underline"
                      target="_blank"
                    >
                      Gesundheitsamt finden <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{t.aboutThisSite}</h3>
              <p className="text-gray-300">{t.siteDescription}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t.importantLinks}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="https://www.aidshilfe.de" className="text-gray-300 hover:text-white" target="_blank">
                    Deutsche AIDS-Hilfe
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.rki.de/DE/Content/InfAZ/H/HIVAIDS/hivaids_node.html"
                    className="text-gray-300 hover:text-white"
                    target="_blank"
                  >
                    Robert Koch-Institut: HIV/AIDS
                  </Link>
                </li>
                <li>
                  <Link href="https://www.liebesleben.de" className="text-gray-300 hover:text-white" target="_blank">
                    LIEBESLEBEN (BZgA)
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.who.int/health-topics/hiv-aids"
                    className="text-gray-300 hover:text-white"
                    target="_blank"
                  >
                    Weltgesundheitsorganisation (WHO)
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t.license}</h3>
              <p className="text-gray-300">{t.licenseDescription}</p>
              <Link
                href="https://www.gnu.org/licenses/old-licenses/lgpl-2.1.de.html"
                className="inline-block mt-2 text-gray-300 border border-gray-600 rounded px-3 py-1 hover:bg-gray-800"
                target="_blank"
              >
                {t.licenseDetails}
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-4 pt-4 text-center text-gray-400 text-xs">
            {language === "de" ? (
              <>
                Diese Website ist unter der{" "}
                <Link
                  href="https://www.gnu.org/licenses/old-licenses/lgpl-2.1.de.html"
                  className="underline text-gray-300"
                  target="_blank"
                >
                  LGPL-2.1 Lizenz
                </Link>{" "}
                lizenziert.
              </>
            ) : (
              <>
                This website is licensed under the{" "}
                <Link
                  href="https://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html"
                  className="underline text-gray-300"
                  target="_blank"
                >
                  LGPL-2.1 License
                </Link>
                .
              </>
            )}
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} HIV/AIDS {language === "de" ? "Informationsportal" : "Information Portal"}.
            LGPL-2.1 {language === "de" ? "Lizenz" : "License"}.
          </div>
        </div>
      </footer>
    </div>
  )
}

