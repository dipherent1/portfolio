"use client"

import { useState, useRef, useEffect } from "react"
import Container from "@/components/ui/container"
import SectionHeading from "@/components/ui/section-heading"
import GlassCard from "@/components/ui/glass-card"
import TerminalBox from "@/components/ui/terminal-box"
import { Button } from "@/components/ui/button"
import {
  Server,
  Brain,
  Code,
  Cpu,
  PenToolIcon as Tool,
  Search,
  Filter,
  ChevronRight,
  Terminal,
  Star,
  X
} from "lucide-react"

interface Skill {
  name: string
  level: number
  featured?: boolean
  description?: string
}

interface SkillCategoryProps {
  title: string
  icon: React.ReactNode
  skills: Skill[]
  searchTerm: string
  showFeaturedOnly: boolean
  onSkillClick: (skill: Skill) => void
  isVisible: boolean
}

function SkillCategory({ title, icon, skills, searchTerm, showFeaturedOnly, onSkillClick, isVisible }: SkillCategoryProps) {
  // Filter skills based on search term and featured flag
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFeatured = !showFeaturedOnly || skill.featured;
    return matchesSearch && matchesFeatured;
  });

  if (filteredSkills.length === 0) {
    return null; // Don't render empty categories
  }

  return (
    <GlassCard
      className={`h-full depth-card transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="depth-content">
        <div className="flex items-center mb-4 text-terminal-green">
          {icon}
          <h3 className="text-xl font-bold ml-2 gradient-text">{title}</h3>
          <span className="ml-auto text-xs text-gray-400">{filteredSkills.length} skills</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filteredSkills.map((skill) => (
            <button
              key={skill.name}
              onClick={() => onSkillClick(skill)}
              className={`group relative px-3 py-1 bg-black/30 border ${skill.featured ? 'border-terminal-green/50' : 'border-white/10'} rounded-full text-sm hover:bg-terminal-green/20 hover:border-terminal-green/50 transition-colors hover:translate-y-[-2px] hover:shadow-[0_0_10px_rgba(0,255,173,0.3)] inline-block`}
            >
              {skill.featured && <Star className="h-3 w-3 inline-block mr-1 text-terminal-green" />}
              {skill.name}
              <span
                className="ml-2 w-8 h-1 bg-black/50 rounded-full inline-block align-middle overflow-hidden"
                title={`Proficiency: ${skill.level}%`}
              >
                <span
                  className="h-full bg-terminal-green block"
                  style={{ width: `${skill.level}%` }}
                ></span>
              </span>

              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-black/90 border border-terminal-green/30 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <div className="font-bold text-terminal-green mb-1">{skill.name}</div>
                <div className="flex justify-between items-center mb-1">
                  <span>Proficiency:</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden mb-1">
                  <div
                    className="h-full bg-gradient-to-r from-deep-blue to-mint-green"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                {skill.description && <div className="mt-1 text-gray-400">{skill.description}</div>}
              </div>
            </button>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

export default function Skills() {
  // State for filtering and interaction
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [visibleCategories, setVisibleCategories] = useState<number[]>([]);
  const [terminalCommand, setTerminalCommand] = useState('ls -la skills/');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  // Refs for intersection observer
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Enhanced skill categories with detailed information
  const skillCategories = [
     {
      title: "Programming",
      icon: <Code className="h-6 w-6" />,
      skills: [

        { name: "Golang", level: 85, featured: true, description: "High-performance backend services and APIs" },
        { name: "FastAPI", level: 92, featured: true, description: "Modern, fast web framework for building APIs" },
        { name: "Django", level: 88, description: "Full-featured web framework for rapid development" },
        { name: "Laravel", level: 80, description: "PHP framework for web application development" },
        { name: "C", level: 85, description: "Systems programming and embedded applications" },
        { name: "C++", level: 80, description: "Performance-critical applications and systems" },
        { name: "JavaScript", level: 75, description: "Frontend and Node.js development" },
        { name: "TypeScript", level: 72, description: "Type-safe JavaScript for larger applications" },
        { name: "HTML & CSS", level: 78, description: "Web structure and styling" },
        { name: "React", level: 80, featured: true, description: "Building dynamic user interfaces" },
        { name: "SQL", level: 88, description: "Database querying and management" },
        { name: "Data Structures and Algorithms", level: 90, featured: true, description: "Efficient organization and storage of data" },
        { name: "MongoDB", level: 80, description: "NoSQL database for flexible data storage" },
        { name: "PostgreSQL", level: 85, featured: true, description: "Robust relational database with advanced features" },
        { name: "Redis", level: 78, description: "In-memory data structure store for caching" },
      ],
    },
    {
      title: "AI/ML",
      icon: <Brain className="h-6 w-6" />,
      skills: [
        { name: "AI Agent Development", level: 88, featured: true, description: "Building intelligent autonomous agents" },
        { name: "Machine Learning", level: 82, featured: true, description: "Algorithms and models for predictive analytics" },
        { name: "NLP (Gemini API)", level: 85, description: "Natural language processing with Google's Gemini" },
        { name: "Computer Vision", level: 75, description: "Image recognition and processing systems" },
        { name: "TensorFlow", level: 80, description: "ML framework for building and deploying models" },
        { name: "PyTorch", level: 78, description: "Deep learning framework for research and production" },
      ],
    },
   
    {
      title: "Mechatronics/IoT",
      icon: <Cpu className="h-6 w-6" />,
      skills: [
        { name: "Arduino", level: 90, featured: true, description: "Prototyping platform for electronics projects" },
        { name: "ESP-32", level: 85, featured: true, description: "WiFi & Bluetooth enabled microcontroller" },
        { name: "Solidworks", level: 75, description: "3D CAD design for mechanical components" },
        { name: "Embedded Systems", level: 82, description: "Programming microcontrollers for specific tasks" },
        { name: "Sensors", level: 88, description: "Integration of various sensors for data collection" },
        { name: "Actuators", level: 80, description: "Control of motors, servos, and other mechanical components" },
        { name: "PCB Design", level: 70, description: "Creating custom circuit boards for electronics" },
        { name: "Robotics", level: 78, description: "Design and programming of robotic systems" },
        { name: "Calculus", level: 80, description: "Mathematical foundation for engineering and physics" },
      ],
    },
    {
      title: "Tools",
      icon: <Tool className="h-6 w-6" />,
      skills: [
        { name: "Git", level: 92, featured: true, description: "Version control for code management" },
        { name: "GitHub", level: 90, description: "Collaboration platform for code hosting" },
        { name: "Docker", level: 85, featured: true, description: "Containerization for consistent deployments" },
        { name: "CI/CD", level: 80, description: "Automated testing and deployment pipelines" },
        { name: "Linux", level: 88, featured: true, description: "Operating system for servers and development" },
        { name: "Bash", level: 82, description: "Shell scripting for automation" },
        { name: "Postman", level: 85, description: "API testing and documentation tool" },
      ],
    },
    {
      title: "Soft Skills",
      icon: <Brain className="h-6 w-6" />,
      skills: [
        { name: "Problem Solving", level: 95, featured: true, description: "Analytical approach to complex challenges" },
        { name: "Communication", level: 85, description: "Clear and effective technical communication" },
        { name: "Teamwork", level: 90, description: "Collaborative work in diverse teams" },
        { name: "Time Management", level: 88, description: "Efficient prioritization and task completion" },
        { name: "Adaptability", level: 92, featured: true, description: "Quick learning and adaptation to new technologies" },
        { name: "Leadership", level: 80, description: "Guiding teams and mentoring junior developers" },
      ],
    },
  ];

  // Set up intersection observer for infinity scroll effect
  useEffect(() => {
    categoryRefs.current = categoryRefs.current.slice(0, skillCategories.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');

          if (entry.isIntersecting) {
            setVisibleCategories(prev => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    categoryRefs.current.forEach((ref, index) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      categoryRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [skillCategories.length]);

  // Process terminal command
  const processTerminalCommand = (cmd: string) => {
    if (cmd === 'clear') {
      setTerminalOutput([]);
      setTerminalCommand('');
      return;
    }

    // Process terminal commands
    if (cmd.startsWith('find ')) {
      const searchTerm = cmd.replace('find ', '').trim();
      setSearchTerm(searchTerm);
      const results = skillCategories.flatMap(category =>
        category.skills.filter(skill =>
          skill.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      const newOutput = [`Found ${results.length} skills matching "${searchTerm}":`];
      results.forEach(skill => {
        newOutput.push(`- ${skill.name} (${skill.level}%)`);
      });
      setTerminalOutput(newOutput);
    } else if (cmd === 'ls -la skills/') {
      const allSkills = skillCategories.flatMap(category => category.skills);
      const totalSkills = allSkills.length;
      const featuredSkills = allSkills.filter(skill => skill.featured).length;

      setTerminalOutput([
        `Found ${totalSkills} total skills across ${skillCategories.length} categories`,
        `${featuredSkills} skills are featured`,
        ``,
        `Use 'find <keyword>' to search for specific skills`,
        `Use 'featured' to show only featured skills`,
        `Use 'all' to show all skills`
      ]);
    } else if (cmd === 'featured') {
      setShowFeaturedOnly(true);
      const featuredSkills = skillCategories.flatMap(category =>
        category.skills.filter(skill => skill.featured)
      );
      setTerminalOutput([`Displaying ${featuredSkills.length} featured skills`]);
    } else if (cmd === 'all') {
      setShowFeaturedOnly(false);
      const allSkills = skillCategories.flatMap(category => category.skills);
      setTerminalOutput([`Displaying all ${allSkills.length} skills`]);
    } else if (cmd === 'help') {
      setTerminalOutput([
        'Available commands:',
        '  ls -la skills/           - Show skills summary',
        '  find <keyword>           - Search for skills by keyword',
        '  featured                 - Show only featured skills',
        '  all                      - Show all skills',
        '  clear                    - Clear terminal output'
      ]);
    } else {
      setTerminalOutput(['Command not found. Type "help" for available commands.']);
    }
  };

  // Handle terminal command changes
  useEffect(() => {
    // Process initial command on mount
    if (terminalCommand && terminalOutput.length === 0) {
      processTerminalCommand(terminalCommand);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle skill click
  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
  };

  return (
    <Container>
      <SectionHeading title="Skills" subtitle="My technical toolkit and areas of expertise" />

      {/* Interactive Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search skills..."
              className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/10 rounded-md focus:outline-none focus:border-terminal-green/50 text-white placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant={showFeaturedOnly ? "default" : "outline"}
            size="sm"
            className={showFeaturedOnly ? "bg-terminal-green/20 text-terminal-green hover:bg-terminal-green/30" : "border-white/10 hover:border-terminal-green/50 hover:bg-terminal-green/10"}
            onClick={() => setShowFeaturedOnly(true)}
          >
            <Star className="h-4 w-4 mr-2" />
            Featured
          </Button>
          <Button
            variant={!showFeaturedOnly ? "default" : "outline"}
            size="sm"
            className={!showFeaturedOnly ? "bg-terminal-green/20 text-terminal-green hover:bg-terminal-green/30" : "border-white/10 hover:border-terminal-green/50 hover:bg-terminal-green/10"}
            onClick={() => setShowFeaturedOnly(false)}
          >
            <Filter className="h-4 w-4 mr-2" />
            All Skills
          </Button>
        </div>
      </div>

      {/* Terminal Interface */}
      <div className="mb-8">
        <TerminalBox title="skills.sh" className="hover-glow">
          <div className="space-y-1 text-sm font-mono">
            <div className="flex items-start">
              <span className="text-terminal-green mr-2">$</span>
              <input
                type="text"
                value={terminalCommand}
                onChange={(e) => setTerminalCommand(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    processTerminalCommand(terminalCommand);
                  }
                }}
                className="bg-transparent border-none outline-none text-white w-full"
                placeholder="Type 'help' for available commands"
              />
            </div>

            {terminalOutput.map((line, index) => (
              <div key={index} className={line.includes('cannot access') ? 'text-red-400' : ''}>
                {line.startsWith('-') && line.includes('.skill') ? (
                  <div className="flex justify-between">
                    <span>{line.split(' ').slice(0, -1).join(' ')}</span>
                    <span className={line.includes('*') ? 'text-terminal-green' : ''}>
                      {line.split(' ').pop()?.replace('*', ' ⭐')}
                    </span>
                  </div>
                ) : (
                  line
                )}
              </div>
            ))}
          </div>
        </TerminalBox>
      </div>

      {/* Skill Categories Grid with Infinity Scroll */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 skills-grid">
        {skillCategories.map((category, index) => (
          <div
            key={category.title}
            ref={el => categoryRefs.current[index] = el}
            data-index={index}
            className="skill-category-container animate-[fadeInUp_0.5s_ease-out_forwards]"
          >
            <SkillCategory
              title={category.title}
              icon={category.icon}
              skills={category.skills}
              searchTerm={searchTerm}
              showFeaturedOnly={showFeaturedOnly}
              onSkillClick={handleSkillClick}
              isVisible={visibleCategories.includes(index)}
            />
          </div>
        ))}
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <GlassCard className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 hover:bg-terminal-green/10"
                onClick={() => setSelectedSkill(null)}
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="mb-4">
                <h2 className="text-2xl font-bold gradient-text flex items-center">
                  {selectedSkill.featured && <Star className="h-5 w-5 mr-2 text-terminal-green" />}
                  {selectedSkill.name}
                </h2>
                <div className="mt-2 flex items-center">
                  <span className="text-gray-400 mr-2">Proficiency:</span>
                  <div className="flex-1 h-2 bg-black/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-deep-blue to-mint-green"
                      style={{ width: `${selectedSkill.level}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-terminal-green">{selectedSkill.level}%</span>
                </div>
              </div>

              {selectedSkill.description && (
                <div className="mb-4">
                  <h3 className="text-sm text-gray-400 mb-1">Description:</h3>
                  <p>{selectedSkill.description}</p>
                </div>
              )}

              <TerminalBox title="skill-info.sh" className="text-sm">
                <div className="space-y-1">
                  <div className="flex">
                    <span className="text-terminal-green mr-2">$</span>
                    <span>cat /skills/{selectedSkill.name.toLowerCase().replace(/ /g, '_')}.info</span>
                  </div>
                  <div className="pl-4">
                    <p><span className="text-white">Name:</span> {selectedSkill.name}</p>
                    <p><span className="text-white">Level:</span> {selectedSkill.level}/100</p>
                    <p><span className="text-white">Category:</span> {skillCategories.find(category =>
                      category.skills.some(skill => skill.name === selectedSkill.name)
                    )?.title}</p>
                    <p><span className="text-white">Featured:</span> {selectedSkill.featured ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </TerminalBox>

              <div className="mt-4 text-xs text-gray-400">
                Click anywhere outside this card to close
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </Container>
  )
}

