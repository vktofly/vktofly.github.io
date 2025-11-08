"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Section from "../../components/Section";
import Container from "../../components/Container";
import SectionDivider from "../../components/SectionDivider";
import SkillsSearch, { highlightText } from "./SkillsSearch";
import SkillsNavigation from "./SkillsNavigation";
import ProficiencyIndicator from "../../components/ProficiencyIndicator";
import skills from "../../data/skills";
import metaSkills from "../../data/metaSkills";
import methodologies from "../../data/methodologies";
import philosophicalFoundations from "../../data/philosophicalFoundations";
import leadershipStrategy from "../../data/leadershipStrategy";
import researchExploration from "../../data/researchExploration";

// Section definitions
const sections = [
  { id: "meta-skills", label: "Meta Skills", data: metaSkills },
  { id: "methodologies", label: "Methodologies", data: methodologies },
  {
    id: "philosophical-foundations",
    label: "Philosophical Foundations",
    data: philosophicalFoundations,
  },
  {
    id: "leadership-strategy",
    label: "Leadership & Strategy",
    data: leadershipStrategy,
  },
  {
    id: "research-exploration",
    label: "Research & Exploration",
    data: researchExploration,
  },
  { id: "core-domains", label: "Core Domains", data: skills },
];

// Helper function to check if item matches search
function matchesSearch(item, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    item.name?.toLowerCase().includes(q) ||
    item.description?.toLowerCase().includes(q) ||
    item.items?.some((i) => i.toLowerCase().includes(q))
  );
}

export default function SkillsPage() {
  const [expandedMethodology, setExpandedMethodology] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState(null);

  // Filter all sections based on search and section filter
  const filteredSections = useMemo(() => {
    return sections.map((section) => {
      // Filter by section selection
      if (selectedSection && section.id !== selectedSection) {
        return { ...section, data: [] };
      }

      // Filter by search query
      if (!searchQuery) {
        return section;
      }

      const filtered = section.data.filter((item) =>
        matchesSearch(item, searchQuery)
      );
      return { ...section, data: filtered };
    });
  }, [searchQuery, selectedSection]);

  // Calculate total results
  const totalResults = useMemo(() => {
    return filteredSections.reduce(
      (sum, section) => sum + section.data.length,
      0
    );
  }, [filteredSections]);

  return (
    <>
      {/* Search Section */}
      <Section
        title="Skills"
        intro="A comprehensive overview of frameworks, methodologies, and expertise"
        className="relative overflow-hidden print:hidden"
      >
        <Container className="relative z-10">
          <SkillsSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            sections={sections.map((s) => ({ id: s.id, label: s.label }))}
            totalResults={totalResults}
          />
        </Container>
      </Section>

      {/* Main Content with Navigation */}
      <div className="grid gap-8 md:grid-cols-[240px_1fr] print:grid-cols-1">
        {/* Sticky Navigation Sidebar */}
        <div className="hidden md:block md:sticky md:top-24 self-start print:hidden">
          <div className="pl-4 border-l border-zinc-200 dark:border-zinc-800">
            <SkillsNavigation
              sections={sections.map((s) => ({ id: s.id, label: s.label }))}
              selectedSection={selectedSection}
              setSelectedSection={setSelectedSection}
            />
          </div>
        </div>

        {/* Skills Content */}
        <div id="skills-content" className="min-w-0">
          {/* Meta Skills Section - Timeline/Flow Style */}
          {(!selectedSection || selectedSection === "meta-skills") && (
            <Section
              id="meta-skills"
              title="Meta Skills"
              intro="Higher-order thinking frameworks and cognitive architectures that guide all work"
              className="bg-gradient-to-b from-zinc-50/50 to-transparent dark:from-zinc-950/50 dark:to-transparent relative overflow-hidden print:bg-transparent"
            >
              {/* Subtle background image - abstract/thinking */}
              <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none print:hidden">
                <Image
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt=""
                  fill
                  className="object-cover grayscale"
                  unoptimized
                />
              </div>

              <Container className="relative z-10">
                {filteredSections[0].data.length > 0 ? (
                  <div className="space-y-8">
                    {filteredSections[0].data.map((skill, index) => (
                      <div key={skill.name} className="group relative">
                        {/* Connection line */}
                        {index < filteredSections[0].data.length - 1 && (
                          <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-brand-500/30 via-brand-500/20 to-transparent dark:from-brand-400/30 dark:via-brand-400/20 hidden sm:block" />
                        )}

                        <div className="flex gap-6 items-start">
                          {/* Timeline dot */}
                          <div className="relative z-10 flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 dark:from-brand-600 dark:to-brand-700 flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-200">
                              <div className="w-3 h-3 rounded-full bg-white dark:bg-zinc-900" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 pt-1">
                            <h3 className="font-bold text-xl mb-2 text-palette-primary dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                              {highlightText(skill.name, searchQuery)}
                            </h3>
                            {skill.description && (
                              <p className="text-base text-palette-secondary dark:text-zinc-400 leading-relaxed mb-4">
                                {highlightText(skill.description, searchQuery)}
                              </p>
                            )}
                            {skill.items && skill.items.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {skill.items.map((item) => (
                                  <span
                                    key={item}
                                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 group-hover:border-brand-500 dark:group-hover:border-brand-600 transition-colors"
                                  >
                                    {highlightText(item, searchQuery)}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-palette-secondary dark:text-zinc-400">
                    No meta skills found matching your search.
                  </div>
                )}
              </Container>
            </Section>
          )}

          {(!selectedSection || selectedSection === "meta-skills") &&
            filteredSections[0].data.length > 0 && (
              <div className="print:hidden">
                <SectionDivider variant="minimal" />
              </div>
            )}

          {/* Methodologies Section - Typography-Focused Editorial Style */}
          {(!selectedSection || selectedSection === "methodologies") && (
            <Section
              id="methodologies"
              title="Methodologies"
              intro="Problem-solving approaches and frameworks for knowledge creation and system design"
              className="bg-gradient-to-b from-transparent via-zinc-50/30 to-transparent dark:via-zinc-950/30 relative overflow-hidden print:bg-transparent"
            >
              {/* Subtle background image - abstract/pattern */}
              <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none print:hidden">
                <Image
                  src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt=""
                  fill
                  className="object-cover grayscale"
                  unoptimized
                />
              </div>

              <Container className="relative z-10">
                {filteredSections[1].data.length > 0 ? (
                  <div className="max-w-4xl mx-auto space-y-12">
                    {filteredSections[1].data.map((method, index) => (
                      <article key={method.name} className="group">
                        <div className="flex flex-col md:flex-row md:items-start gap-8">
                          {/* Number indicator */}
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 flex items-center justify-center">
                              <span className="text-4xl font-light text-brand-500/30 dark:text-brand-400/30 group-hover:text-brand-500/50 dark:group-hover:text-brand-400/50 transition-colors">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 space-y-4">
                            <header>
                              <h3 className="text-2xl font-bold text-palette-primary dark:text-zinc-100 mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight">
                                {highlightText(method.name, searchQuery)}
                              </h3>
                              {method.description && (
                                <p className="text-lg text-palette-secondary dark:text-zinc-400 leading-relaxed font-light">
                                  {highlightText(
                                    method.description,
                                    searchQuery
                                  )}
                                </p>
                              )}
                            </header>

                            {method.items && method.items.length > 0 && (
                              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                                <ul className="space-y-3">
                                  {method.items.map((item) => (
                                    <li
                                      key={item}
                                      className="text-base text-palette-secondary dark:text-zinc-400 leading-relaxed flex items-start"
                                    >
                                      <span className="text-brand-500 dark:text-brand-400 mr-3 mt-1.5 flex-shrink-0 text-lg">
                                        —
                                      </span>
                                      <span>
                                        {highlightText(item, searchQuery)}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-palette-secondary dark:text-zinc-400">
                    No methodologies found matching your search.
                  </div>
                )}
              </Container>
            </Section>
          )}

          {(!selectedSection || selectedSection === "methodologies") &&
            filteredSections[1].data.length > 0 && (
              <div className="print:hidden">
                <SectionDivider variant="geometric" />
              </div>
            )}

          {/* Philosophical Foundations Section - List with Visual Separators */}
          {(!selectedSection ||
            selectedSection === "philosophical-foundations") && (
            <Section
              id="philosophical-foundations"
              title="Philosophical Foundations"
              intro="Core philosophical frameworks and principles that guide thinking and decision-making"
              className="bg-gradient-to-b from-transparent via-zinc-50/30 to-transparent dark:via-zinc-950/30 relative overflow-hidden print:bg-transparent"
            >
              {/* Subtle background image - books/knowledge */}
              <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none print:hidden">
                <Image
                  src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt=""
                  fill
                  className="object-cover grayscale"
                  unoptimized
                />
              </div>

              <Container className="relative z-10">
                {filteredSections[2].data.length > 0 ? (
                  <div className="space-y-0 divide-y divide-zinc-200 dark:divide-zinc-800">
                    {filteredSections[2].data.map((foundation, index) => (
                      <div
                        key={foundation.name}
                        className="group py-8 px-6 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors duration-200"
                      >
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-brand-500/10 to-brand-600/10 dark:from-brand-600/20 dark:to-brand-700/20 flex items-center justify-center border border-brand-500/20 dark:border-brand-600/30">
                              <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-xl mb-2 text-palette-primary dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                              {highlightText(foundation.name, searchQuery)}
                            </h3>
                            {foundation.description && (
                              <p className="text-base text-palette-secondary dark:text-zinc-400 leading-relaxed mb-4">
                                {highlightText(
                                  foundation.description,
                                  searchQuery
                                )}
                              </p>
                            )}
                            {foundation.items &&
                              foundation.items.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {foundation.items.map((item) => (
                                    <span
                                      key={item}
                                      className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-white dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                                    >
                                      {highlightText(item, searchQuery)}
                                    </span>
                                  ))}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-palette-secondary dark:text-zinc-400">
                    No philosophical foundations found matching your search.
                  </div>
                )}
              </Container>
            </Section>
          )}

          {(!selectedSection ||
            selectedSection === "philosophical-foundations") &&
            filteredSections[2].data.length > 0 && (
              <div className="print:hidden">
                <SectionDivider variant="minimal" />
              </div>
            )}

          {/* Leadership & Strategy Section - Typography-Focused Editorial Style */}
          {(!selectedSection || selectedSection === "leadership-strategy") && (
            <Section
              id="leadership-strategy"
              title="Leadership & Strategy"
              intro="Skills and frameworks for building and leading organizations, developed through founding 23+ technology companies"
              className="relative overflow-hidden print:bg-transparent"
            >
              {/* Subtle background image - architecture/building */}
              <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none print:hidden">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt=""
                  fill
                  className="object-cover grayscale"
                  unoptimized
                />
              </div>

              <Container className="relative z-10">
                {filteredSections[3].data.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                    {filteredSections[3].data.map((skill) => (
                      <article key={skill.name} className="group space-y-5">
                        <header className="space-y-3">
                          <h3 className="text-2xl font-bold text-palette-primary dark:text-zinc-100 leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                            {highlightText(skill.name, searchQuery)}
                          </h3>
                          {skill.description && (
                            <p className="text-base text-palette-secondary dark:text-zinc-400 leading-relaxed font-light">
                              {highlightText(skill.description, searchQuery)}
                            </p>
                          )}
                        </header>

                        {skill.items && skill.items.length > 0 && (
                          <div className="pt-4 space-y-2.5">
                            {skill.items.map((item) => (
                              <div
                                key={item}
                                className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed"
                              >
                                <span className="text-brand-500 dark:text-brand-400 mr-2.5">
                                  •
                                </span>
                                {highlightText(item, searchQuery)}
                              </div>
                            ))}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-palette-secondary dark:text-zinc-400">
                    No leadership & strategy skills found matching your search.
                  </div>
                )}
              </Container>
            </Section>
          )}

          {(!selectedSection || selectedSection === "leadership-strategy") &&
            filteredSections[3].data.length > 0 && (
              <div className="print:hidden">
                <SectionDivider variant="geometric" />
              </div>
            )}

          {/* Research & Exploration Section - Tag/Badge Style */}
          {(!selectedSection || selectedSection === "research-exploration") && (
            <Section
              id="research-exploration"
              title="Research & Exploration"
              intro="Current and ongoing research areas that push the boundaries of knowledge"
              className="bg-gradient-to-b from-transparent via-zinc-50/30 to-transparent dark:via-zinc-950/30 relative overflow-hidden print:bg-transparent"
            >
              {/* Subtle background image - science/exploration */}
              <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none print:hidden">
                <Image
                  src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt=""
                  fill
                  className="object-cover grayscale"
                  unoptimized
                />
              </div>

              <Container className="relative z-10">
                {filteredSections[4].data.length > 0 ? (
                  <div className="space-y-8">
                    {filteredSections[4].data.map((research) => (
                      <div key={research.name} className="group">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                          <h3 className="font-bold text-xl text-palette-primary dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex-shrink-0 sm:w-48">
                            {highlightText(research.name, searchQuery)}
                          </h3>
                          {research.description && (
                            <p className="text-base text-palette-secondary dark:text-zinc-400 leading-relaxed flex-1">
                              {highlightText(research.description, searchQuery)}
                            </p>
                          )}
                        </div>
                        {research.items && research.items.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {research.items.map((item) => (
                              <span
                                key={item}
                                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-brand-500/10 to-brand-600/10 dark:from-brand-600/20 dark:to-brand-700/20 text-palette-primary dark:text-zinc-200 border border-brand-500/20 dark:border-brand-600/30 hover:border-brand-500 dark:hover:border-brand-600 hover:from-brand-500/20 hover:to-brand-600/20 dark:hover:from-brand-600/30 dark:hover:to-brand-700/30 transition-all duration-200"
                              >
                                {highlightText(item, searchQuery)}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-palette-secondary dark:text-zinc-400">
                    No research areas found matching your search.
                  </div>
                )}
              </Container>
            </Section>
          )}

          {(!selectedSection || selectedSection === "research-exploration") &&
            filteredSections[4].data.length > 0 && (
              <div className="print:hidden">
                <SectionDivider variant="minimal" />
              </div>
            )}

          {/* Core Technical Domains - Grid with Icons */}
          {(!selectedSection || selectedSection === "core-domains") && (
            <Section
              id="core-domains"
              title="Core Domains"
              intro="Technical expertise across multiple disciplines"
              className="relative overflow-hidden print:bg-transparent"
            >
              {/* Subtle background image - technology/code */}
              <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none print:hidden">
                <Image
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt=""
                  fill
                  className="object-cover grayscale"
                  unoptimized
                />
              </div>

              <Container className="relative z-10">
                {filteredSections[5].data.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSections[5].data.map((group, index) => (
                      <div key={group.name} className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500/20 to-brand-600/20 dark:from-brand-600/30 dark:to-brand-700/30 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-200" />
                        <div className="relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200">
                          {/* Icon placeholder - you can replace with actual icons */}
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-500/10 to-brand-600/10 dark:from-brand-600/20 dark:to-brand-700/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                            <span className="text-xl font-bold text-brand-600 dark:text-brand-400">
                              {String.fromCharCode(65 + (index % 26))}
                            </span>
                          </div>

                          <div className="mb-4">
                            <h3 className="font-bold text-lg mb-3 text-palette-primary dark:text-zinc-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                              {highlightText(group.name, searchQuery)}
                            </h3>
                            {/* Proficiency Indicator */}
                            {(group.level || group.years) && (
                              <ProficiencyIndicator
                                level={group.level}
                                years={group.years}
                                showLabel={true}
                              />
                            )}
                          </div>
                          {group.items && group.items.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {group.items.map((item) => (
                                <span
                                  key={item}
                                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                                >
                                  {highlightText(item, searchQuery)}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-palette-secondary dark:text-zinc-400">
                    No core domains found matching your search.
                  </div>
                )}
              </Container>
            </Section>
          )}

          {/* No Results Message */}
          {totalResults === 0 && (searchQuery || selectedSection) && (
            <Section className="relative overflow-hidden print:hidden">
              <Container>
                <div className="text-center py-16">
                  <p className="text-lg text-palette-secondary dark:text-zinc-400 mb-4">
                    No results found matching your search criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedSection(null);
                    }}
                    className="text-brand-600 dark:text-brand-400 hover:underline font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              </Container>
            </Section>
          )}
        </div>
      </div>
    </>
  );
}
