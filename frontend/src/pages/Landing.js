import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import Enhanced3DButton from '../components/Enhanced3DButton';

const Landing = () => {
  const [activeTab, setActiveTab] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreContent, setShowMoreContent] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const navigate = useNavigate();
  const { setCurrentSkills, setCurrentExpertise } = useAppContext();
  const { isDark } = useTheme();

  // Animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStage(1), 300);
    const timer2 = setTimeout(() => setAnimationStage(2), 600);
    const timer3 = setTimeout(() => setAnimationStage(3), 900);
    const timer4 = setTimeout(() => setAnimationStage(4), 1200);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  // Quick select domains for popular paths
  const quickSelectDomains = [
    { name: 'Software Engineering', category: 'engineering', field: 'Web Development' },
    { name: 'Data Science', category: 'emerging', field: 'Machine Learning' },
    { name: 'Digital Marketing', category: 'commerce', field: 'Social Media Marketing' },
    { name: 'UI/UX Design', category: 'design', field: 'User Experience Design' }
  ];

  const handleQuickSelect = (item) => {
    setCurrentSkills(item.field);
    setCurrentExpertise('Beginner');
    setTimeout(() => {
      navigate('/simplified-ultimate-roadmap');
    }, 100);
  };

  // Categories
  const categories = [
    { id: 'engineering', name: 'Engineering & Technology', icon: '⚙️', description: 'Build the future with cutting-edge technology' },
    { id: 'medical', name: 'Medical & Healthcare', icon: '⚕️', description: 'Heal and help others in healthcare' },
    { id: 'commerce', name: 'Business & Management', icon: '💼', description: 'Lead organizations and drive innovation' },
    { id: 'design', name: 'Creative & Design', icon: '🎨', description: 'Express creativity through visual arts' },
    { id: 'law', name: 'Law & Public Service', icon: '⚖️', description: 'Serve justice and public interest' },
    { id: 'science', name: 'Sciences & Research', icon: '🔬', description: 'Explore the mysteries of our world' },
    { id: 'emerging', name: 'Emerging Fields', icon: '🚀', description: 'Pioneer the next big breakthroughs' },
    { id: 'education', name: 'Education & Teaching', icon: '📚', description: 'Shape minds and inspire future generations' },
    { id: 'media', name: 'Media & Communication', icon: '📺', description: 'Connect people through storytelling' },
    { id: 'agriculture', name: 'Agriculture & Environment', icon: '🌱', description: 'Sustain our planet for future generations' }
  ];

  // Fields for each category
  const fieldsByCategory = {
    engineering: [
      'Software Engineering',
      'Mechanical Engineering',
      'Electrical Engineering',
      'Civil Engineering',
      'Chemical Engineering',
      'Aerospace Engineering',
      'Biomedical Engineering',
      'Environmental Engineering',
      'Industrial Engineering',
      'Materials Engineering',
      'Nuclear Engineering',
      'Petroleum Engineering'
    ],
    medical: [
      'General Medicine',
      'Surgery',
      'Pediatrics',
      'Psychiatry',
      'Dermatology',
      'Cardiology',
      'Neurology',
      'Orthopedics',
      'Ophthalmology',
      'Gynecology',
      'Radiology',
      'Anesthesiology'
    ],
    commerce: [
      'Business Administration',
      'Finance',
      'Marketing',
      'Human Resources',
      'Operations Management',
      'Entrepreneurship',
      'Economics',
      'Accounting',
      'Supply Chain Management',
      'International Business',
      'Business Analytics',
      'Strategic Management'
    ],
    design: [
      'Graphic Design',
      'Industrial Design',
      'Fashion Design',
      'Interior Design',
      'Animation',
      'Photography',
      'Film & Video Production',
      'Architecture',
      'Digital Media Arts',
      'Game Design',
      'UI/UX Design',
      'Creative Writing'
    ],
    law: [
      'Law',
      'Public Administration',
      'Political Science',
      'International Relations',
      'Criminal Justice',
      'Social Work',
      'Public Policy',
      'Diplomacy',
      'Non-Profit Management',
      'Urban Planning',
      'Public Health',
      'Emergency Management'
    ],
    science: [
      'Physics',
      'Chemistry',
      'Biology',
      'Mathematics',
      'Statistics',
      'Geology',
      'Astronomy',
      'Environmental Science',
      'Biotechnology',
      'Materials Science',
      'Nanotechnology',
      'Marine Science'
    ],
    emerging: [
      'Artificial Intelligence',
      'Data Science',
      'Cybersecurity',
      'Renewable Energy',
      'Bioinformatics',
      'Neuroscience',
      'Robotics',
      'Blockchain Technology',
      'Quantum Computing',
      'Computational Biology',
      'Digital Humanities',
      'Biotechnology'
    ],
    education: [
      'Early Childhood Education',
      'Primary Education',
      'Secondary Education',
      'Special Education',
      'Higher Education',
      'Educational Technology',
      'Curriculum Development',
      'Educational Psychology',
      'Adult Education',
      'Language Teaching',
      'Instructional Design',
      'Educational Leadership'
    ],
    media: [
      'Journalism',
      'Broadcasting',
      'Public Relations',
      'Digital Marketing',
      'Content Creation',
      'Social Media Management',
      'Film Production',
      'Radio Production',
      'Podcasting',
      'Media Studies',
      'Communications',
      'Advertising'
    ],
    agriculture: [
      'Agronomy',
      'Horticulture',
      'Animal Science',
      'Forestry',
      'Aquaculture',
      'Agricultural Engineering',
      'Soil Science',
      'Plant Science',
      'Food Science',
      'Environmental Conservation',
      'Sustainable Agriculture',
      'Agribusiness'
    ]
  };

  // Domains for each field (specializations) - COMPLETE LIST
  const domainsByField = {
    // Engineering domains
    'Software Engineering': [
      'Web Development',
      'Mobile Development',
      'Data Science',
      'Artificial Intelligence',
      'Cybersecurity',
      'DevOps',
      'Game Development',
      'Cloud Computing',
      'Blockchain',
      'IoT Development'
    ],
    'Mechanical Engineering': [
      'Thermodynamics',
      'Fluid Mechanics',
      'Robotics',
      'Automotive',
      'Aerospace',
      'Manufacturing',
      'HVAC',
      'CAD Design',
      'Automation',
      'Energy Systems'
    ],
    'Electrical Engineering': [
      'Power Systems',
      'Electronics',
      'Control Systems',
      'Signal Processing',
      'Telecommunications',
      'Embedded Systems',
      'Renewable Energy',
      'VLSI Design',
      'Instrumentation',
      'Smart Grids'
    ],
    'Civil Engineering': [
      'Structural Engineering',
      'Geotechnical Engineering',
      'Transportation',
      'Water Resources',
      'Construction Management',
      'Environmental Engineering',
      'Urban Planning',
      'Coastal Engineering',
      'Earthquake Engineering',
      'Surveying'
    ],
    'Chemical Engineering': [
      'Process Design',
      'Reaction Engineering',
      'Separation Processes',
      'Process Control',
      'Biochemical Engineering',
      'Polymer Engineering',
      'Environmental Engineering',
      'Pharmaceutical Engineering',
      'Food Processing',
      'Energy Conversion'
    ],
    'Aerospace Engineering': [
      'Aerodynamics',
      'Propulsion Systems',
      'Flight Mechanics',
      'Structural Analysis',
      'Avionics',
      'Space Systems',
      'Composite Materials',
      'Control Systems',
      'Thermal Systems',
      'Systems Engineering'
    ],
    'Biomedical Engineering': [
      'Medical Imaging',
      'Biomaterials',
      'Biomechanics',
      'Tissue Engineering',
      'Medical Devices',
      'Rehabilitation Engineering',
      'Clinical Engineering',
      'Genetic Engineering',
      'Neural Engineering',
      'Pharmaceutical Engineering'
    ],
    'Environmental Engineering': [
      'Water Treatment',
      'Air Pollution Control',
      'Waste Management',
      'Environmental Impact Assessment',
      'Sustainable Design',
      'Climate Change Mitigation',
      'Renewable Energy',
      'Environmental Monitoring',
      'Green Building',
      'Ecosystem Restoration'
    ],
    'Industrial Engineering': [
      'Operations Research',
      'Supply Chain Management',
      'Quality Control',
      'Facilities Planning',
      'Ergonomics',
      'Production Planning',
      'Lean Manufacturing',
      'Six Sigma',
      'Systems Integration',
      'Process Optimization'
    ],
    'Materials Engineering': [
      'Metallurgy',
      'Ceramics',
      'Polymers',
      'Composites',
      'Nanomaterials',
      'Biomaterials',
      'Electronic Materials',
      'Optical Materials',
      'Structural Materials',
      'Smart Materials'
    ],
    'Nuclear Engineering': [
      'Nuclear Reactor Design',
      'Radiation Protection',
      'Nuclear Fuel Cycle',
      'Nuclear Safety',
      'Medical Physics',
      'Nuclear Waste Management',
      'Plasma Physics',
      'Nuclear Instrumentation',
      'Radiation Biology',
      'Nuclear Security'
    ],
    'Petroleum Engineering': [
      'Reservoir Engineering',
      'Drilling Engineering',
      'Production Engineering',
      'Petrophysics',
      'Enhanced Oil Recovery',
      'Natural Gas Engineering',
      'Offshore Engineering',
      'Well Logging',
      'Hydraulic Fracturing',
      'Pipeline Design'
    ],
    
    // Medical domains
    'General Medicine': [
      'Internal Medicine',
      'Family Medicine',
      'Preventive Medicine',
      'Occupational Medicine',
      'Sports Medicine',
      'Travel Medicine',
      'Geriatric Medicine',
      'Palliative Care',
      'Emergency Medicine',
      'Critical Care'
    ],
    'Surgery': [
      'General Surgery',
      'Orthopedic Surgery',
      'Cardiothoracic Surgery',
      'Neurosurgery',
      'Plastic Surgery',
      'Urology',
      'Vascular Surgery',
      'Pediatric Surgery',
      'Minimally Invasive Surgery',
      'Transplant Surgery'
    ],
    'Pediatrics': [
      'Neonatology',
      'Pediatric Cardiology',
      'Pediatric Neurology',
      'Pediatric Endocrinology',
      'Pediatric Gastroenterology',
      'Pediatric Oncology',
      'Pediatric Pulmonology',
      'Pediatric Nephrology',
      'Developmental Pediatrics',
      'Adolescent Medicine'
    ],
    'Psychiatry': [
      'Clinical Psychiatry',
      'Child Psychiatry',
      'Addiction Psychiatry',
      'Forensic Psychiatry',
      'Geriatric Psychiatry',
      'Emergency Psychiatry',
      'Consultation Psychiatry',
      'Community Psychiatry',
      'Military Psychiatry',
      'Neuropsychiatry'
    ],
    'Dermatology': [
      'Medical Dermatology',
      'Surgical Dermatology',
      'Cosmetic Dermatology',
      'Dermatopathology',
      'Pediatric Dermatology',
      'Dermatologic Surgery',
      'Mohs Surgery',
      'Phototherapy',
      'Immunodermatology',
      'Teledermatology'
    ],
    'Cardiology': [
      'Interventional Cardiology',
      'Electrophysiology',
      'Heart Failure',
      'Preventive Cardiology',
      'Pediatric Cardiology',
      'Cardiac Imaging',
      'Valvular Heart Disease',
      'Congenital Heart Disease',
      'Cardiac Rehabilitation',
      'Cardiovascular Genetics'
    ],
    'Neurology': [
      'Clinical Neurology',
      'Movement Disorders',
      'Epilepsy',
      'Stroke',
      'Multiple Sclerosis',
      'Neuromuscular Disorders',
      'Headache Medicine',
      'Sleep Medicine',
      'Behavioral Neurology',
      'Neurocritical Care'
    ],
    'Orthopedics': [
      'Joint Replacement',
      'Spine Surgery',
      'Sports Medicine',
      'Trauma Surgery',
      'Pediatric Orthopedics',
      'Foot and Ankle',
      'Hand Surgery',
      'Shoulder and Elbow',
      'Orthopedic Oncology',
      'Musculoskeletal Oncology'
    ],
    'Ophthalmology': [
      'Cataract Surgery',
      'Glaucoma',
      'Retinal Surgery',
      'Corneal Surgery',
      'Pediatric Ophthalmology',
      'Strabismus',
      'Oculoplastics',
      'Neuro-Ophthalmology',
      'Uveitis',
      'Ocular Oncology'
    ],
    'Gynecology': [
      'Gynecologic Oncology',
      'Reproductive Endocrinology',
      'Maternal-Fetal Medicine',
      'Urogynecology',
      'Minimally Invasive Gynecology',
      'Family Planning',
      'Adolescent Gynecology',
      'Menopause Management',
      'Pelvic Pain',
      'Fertility Preservation'
    ],
    'Radiology': [
      'Diagnostic Radiology',
      'Interventional Radiology',
      'Nuclear Medicine',
      'Radiation Oncology',
      'Neuroradiology',
      'Musculoskeletal Radiology',
      'Cardiothoracic Radiology',
      'Abdominal Radiology',
      'Pediatric Radiology',
      'Breast Imaging'
    ],
    'Anesthesiology': [
      'General Anesthesia',
      'Regional Anesthesia',
      'Critical Care Medicine',
      'Pain Management',
      'Pediatric Anesthesia',
      'Obstetric Anesthesia',
      'Cardiac Anesthesia',
      'Neurosurgical Anesthesia',
      'Ambulatory Anesthesia',
      'Transplant Anesthesia'
    ],
    
    // Commerce domains
    'Business Administration': [
      'Strategic Management',
      'Organizational Behavior',
      'Business Ethics',
      'Corporate Governance',
      'International Business',
      'Business Analytics',
      'Project Management',
      'Risk Management',
      'Business Development',
      'Corporate Strategy'
    ],
    'Finance': [
      'Corporate Finance',
      'Investment Banking',
      'Financial Planning',
      'Risk Management',
      'Financial Analysis',
      'Portfolio Management',
      'Derivatives',
      'Financial Modeling',
      'Credit Analysis',
      'Treasury Management'
    ],
    'Marketing': [
      'Digital Marketing',
      'Brand Management',
      'Market Research',
      'Consumer Behavior',
      'Product Management',
      'Content Marketing',
      'Social Media Marketing',
      'Email Marketing',
      'Search Engine Marketing',
      'Marketing Analytics'
    ],
    'Human Resources': [
      'Talent Acquisition',
      'Employee Relations',
      'Compensation & Benefits',
      'Training & Development',
      'Performance Management',
      'HR Analytics',
      'Organizational Development',
      'Diversity & Inclusion',
      'HR Technology',
      'Labor Relations'
    ],
    'Operations Management': [
      'Supply Chain Management',
      'Quality Management',
      'Process Improvement',
      'Inventory Management',
      'Logistics Management',
      'Facilities Management',
      'Production Planning',
      'Lean Manufacturing',
      'Six Sigma',
      'Operations Research'
    ],
    'Entrepreneurship': [
      'Startup Management',
      'Venture Capital',
      'Business Model Innovation',
      'Social Entrepreneurship',
      'Innovation Management',
      'Business Planning',
      'Fundraising',
      'Market Entry Strategy',
      'Growth Strategy',
      'Exit Strategy'
    ],
    'Economics': [
      'Microeconomics',
      'Macroeconomics',
      'Development Economics',
      'Behavioral Economics',
      'Environmental Economics',
      'Labor Economics',
      'Health Economics',
      'Public Economics',
      'International Economics',
      'Econometrics'
    ],
    'Accounting': [
      'Financial Accounting',
      'Managerial Accounting',
      'Tax Accounting',
      'Auditing',
      'Forensic Accounting',
      'Cost Accounting',
      'Government Accounting',
      'Not-for-Profit Accounting',
      'International Accounting',
      'Accounting Information Systems'
    ],
    'Supply Chain Management': [
      'Procurement Management',
      'Logistics Management',
      'Inventory Management',
      'Demand Planning',
      'Supplier Relationship Management',
      'Distribution Management',
      'Warehousing',
      'Transportation Management',
      'Supply Chain Analytics',
      'Global Supply Chain'
    ],
    'International Business': [
      'Global Strategy',
      'Cross-Cultural Management',
      'International Trade',
      'Foreign Exchange Management',
      'Global Marketing',
      'International Finance',
      'Export-Import Management',
      'Global Operations',
      'International Law',
      'Multinational Management'
    ],
    'Business Analytics': [
      'Data Visualization',
      'Predictive Analytics',
      'Prescriptive Analytics',
      'Statistical Analysis',
      'Machine Learning',
      'Business Intelligence',
      'Data Mining',
      'Customer Analytics',
      'Financial Analytics',
      'Operations Analytics'
    ],
    'Strategic Management': [
      'Corporate Strategy',
      'Competitive Strategy',
      'Business Model Innovation',
      'Strategic Planning',
      'Scenario Planning',
      'Strategic Implementation',
      'Mergers & Acquisitions',
      'Strategic Alliances',
      'Innovation Strategy',
      'Sustainability Strategy'
    ],
    
    // Design domains
    'Graphic Design': [
      'Brand Identity',
      'Typography',
      'Layout Design',
      'Print Design',
      'Digital Design',
      'Packaging Design',
      'Illustration',
      'Motion Graphics',
      'Infographic Design',
      'Editorial Design'
    ],
    'Industrial Design': [
      'Product Design',
      'User Experience Design',
      'Ergonomics',
      'Materials & Manufacturing',
      'Prototyping',
      'Design Research',
      'Sustainable Design',
      'Design Strategy',
      'Design Thinking',
      'Product Development'
    ],
    'Fashion Design': [
      'Apparel Design',
      'Textile Design',
      'Accessory Design',
      'Fashion Illustration',
      'Pattern Making',
      'Garment Construction',
      'Fashion Merchandising',
      'Sustainable Fashion',
      'Fashion Technology',
      'Haute Couture'
    ],
    'Interior Design': [
      'Residential Design',
      'Commercial Design',
      'Hospitality Design',
      'Healthcare Design',
      'Retail Design',
      'Color Theory',
      'Lighting Design',
      'Space Planning',
      'Furniture Design',
      'Sustainable Design'
    ],
    'Animation': [
      '2D Animation',
      '3D Animation',
      'Character Animation',
      'Stop Motion',
      'Motion Graphics',
      'Visual Effects',
      'Storyboarding',
      'Rigging',
      'Compositing',
      'Animation Direction'
    ],
    'Photography': [
      'Portrait Photography',
      'Landscape Photography',
      'Fashion Photography',
      'Commercial Photography',
      'Photojournalism',
      'Fine Art Photography',
      'Digital Photography',
      'Studio Photography',
      'Event Photography',
      'Architectural Photography'
    ],
    'Film & Video Production': [
      'Directing',
      'Cinematography',
      'Screenwriting',
      'Editing',
      'Sound Design',
      'Production Management',
      'Documentary Filmmaking',
      'Commercial Production',
      'Post-Production',
      'Visual Storytelling'
    ],
    'Architecture': [
      'Architectural Design',
      'Urban Planning',
      'Sustainable Architecture',
      'Building Information Modeling',
      'Construction Documentation',
      'Historic Preservation',
      'Interior Architecture',
      'Landscape Architecture',
      'Parametric Design',
      'Smart Building Design'
    ],
    'Digital Media Arts': [
      'Interactive Design',
      'Game Design',
      'Virtual Reality',
      'Augmented Reality',
      'Digital Storytelling',
      'User Interface Design',
      'Multimedia Production',
      'Digital Imaging',
      'Web Design',
      'Mobile Media Design'
    ],
    'Game Design': [
      'Game Mechanics',
      'Level Design',
      'Character Design',
      'Game Programming',
      'Narrative Design',
      'User Experience Design',
      'Game Testing',
      'Mobile Game Design',
      'Serious Games',
      'Esports Design'
    ],
    'UI/UX Design': [
      'User Experience Design',
      'User Interface Design',
      'Interaction Design',
      'Information Architecture',
      'Visual Design',
      'Usability Testing',
      'Design Systems',
      'Prototyping',
      'User Research',
      'Accessibility Design'
    ],
    'Creative Writing': [
      'Fiction Writing',
      'Poetry',
      'Screenwriting',
      'Technical Writing',
      'Copywriting',
      'Content Writing',
      'Scriptwriting',
      'Playwriting',
      'Non-Fiction Writing',
      'Editing & Proofreading'
    ],
    
    // Law domains
    'Law': [
      'Corporate Law',
      'Criminal Law',
      'Civil Law',
      'Constitutional Law',
      'International Law',
      'Environmental Law',
      'Intellectual Property',
      'Family Law',
      'Labor Law',
      'Tax Law'
    ],
    'Public Administration': [
      'Public Policy',
      'Government Management',
      'Public Finance',
      'Administrative Law',
      'Urban Planning',
      'Public Health Administration',
      'Non-Profit Management',
      'Emergency Management',
      'Intergovernmental Relations',
      'Ethics in Public Service'
    ],
    'Political Science': [
      'Comparative Politics',
      'International Relations',
      'Political Theory',
      'Public Policy',
      'Political Economy',
      'American Politics',
      'European Politics',
      'Asian Politics',
      'Political Behavior',
      'Research Methods'
    ],
    'International Relations': [
      'Diplomacy',
      'Global Security',
      'International Organizations',
      'Foreign Policy',
      'International Economics',
      'Conflict Resolution',
      'Human Rights',
      'Global Governance',
      'International Law',
      'Regional Studies'
    ],
    'Criminal Justice': [
      'Criminology',
      'Forensic Science',
      'Juvenile Justice',
      'Cyber Crime',
      'Homeland Security',
      'Corrections',
      'Police Administration',
      'Court Administration',
      'Victim Services',
      'Crime Prevention'
    ],
    'Social Work': [
      'Clinical Social Work',
      'Child Welfare',
      'Gerontology',
      'Substance Abuse',
      'Mental Health',
      'Community Organization',
      'Policy Advocacy',
      'School Social Work',
      'Medical Social Work',
      'Military Social Work'
    ],
    'Public Policy': [
      'Policy Analysis',
      'Program Evaluation',
      'Budget Analysis',
      'Regulatory Policy',
      'Social Policy',
      'Economic Policy',
      'Environmental Policy',
      'Health Policy',
      'Education Policy',
      'Urban Policy'
    ],
    'Diplomacy': [
      'International Negotiation',
      'Protocol & Etiquette',
      'Cultural Diplomacy',
      'Economic Diplomacy',
      'Public Diplomacy',
      'Consular Affairs',
      'Trade Diplomacy',
      'Security Diplomacy',
      'Multilateral Diplomacy',
      'Diplomatic History'
    ],
    'Non-Profit Management': [
      'Fundraising',
      'Grant Writing',
      'Volunteer Management',
      'Board Governance',
      'Program Management',
      'Strategic Planning',
      'Financial Management',
      'Marketing & Communications',
      'Impact Measurement',
      'Capacity Building'
    ],
    'Urban Planning': [
      'Land Use Planning',
      'Transportation Planning',
      'Environmental Planning',
      'Housing Policy',
      'Economic Development',
      'Community Development',
      'GIS & Mapping',
      'Urban Design',
      'Regional Planning',
      'Sustainable Development'
    ],
    'Public Health': [
      'Epidemiology',
      'Biostatistics',
      'Health Policy',
      'Environmental Health',
      'Occupational Health',
      'Maternal & Child Health',
      'Global Health',
      'Health Promotion',
      'Health Informatics',
      'Public Health Nutrition'
    ],
    'Emergency Management': [
      'Disaster Preparedness',
      'Emergency Response',
      'Disaster Recovery',
      'Risk Assessment',
      'Business Continuity',
      'Crisis Management',
      'Emergency Communications',
      'Hazard Mitigation',
      'Emergency Planning',
      'Incident Command'
    ],
    
    // Science domains
    'Physics': [
      'Quantum Physics',
      'Astrophysics',
      'Nuclear Physics',
      'Condensed Matter Physics',
      'Particle Physics',
      'Optics',
      'Thermodynamics',
      'Electromagnetism',
      'Mathematical Physics',
      'Biophysics'
    ],
    'Chemistry': [
      'Organic Chemistry',
      'Inorganic Chemistry',
      'Physical Chemistry',
      'Analytical Chemistry',
      'Biochemistry',
      'Environmental Chemistry',
      'Medicinal Chemistry',
      'Materials Chemistry',
      'Computational Chemistry',
      'Nanochemistry'
    ],
    'Biology': [
      'Molecular Biology',
      'Cell Biology',
      'Genetics',
      'Evolutionary Biology',
      'Ecology',
      'Microbiology',
      'Biochemistry',
      'Biotechnology',
      'Marine Biology',
      'Plant Biology'
    ],
    'Mathematics': [
      'Algebra',
      'Calculus',
      'Geometry',
      'Topology',
      'Number Theory',
      'Probability Theory',
      'Mathematical Analysis',
      'Applied Mathematics',
      'Computational Mathematics',
      'Mathematical Physics'
    ],
    'Statistics': [
      'Descriptive Statistics',
      'Inferential Statistics',
      'Regression Analysis',
      'Time Series Analysis',
      'Bayesian Statistics',
      'Multivariate Analysis',
      'Statistical Computing',
      'Experimental Design',
      'Sampling Theory',
      'Statistical Learning'
    ],
    'Geology': [
      'Mineralogy',
      'Petrology',
      'Structural Geology',
      'Sedimentology',
      'Paleontology',
      'Geochemistry',
      'Geophysics',
      'Hydrogeology',
      'Environmental Geology',
      'Planetary Geology'
    ],
    'Astronomy': [
      'Stellar Astronomy',
      'Galactic Astronomy',
      'Cosmology',
      'Planetary Science',
      'Astrophysics',
      'Observational Astronomy',
      'Radio Astronomy',
      'Space Science',
      'Celestial Mechanics',
      'Astrobiology'
    ],
    'Environmental Science': [
      'Ecology',
      'Environmental Chemistry',
      'Atmospheric Science',
      'Oceanography',
      'Environmental Policy',
      'Conservation Biology',
      'Climate Science',
      'Environmental Engineering',
      'Sustainability Science',
      'Environmental Health'
    ],
    'Biotechnology': [
      'Genetic Engineering',
      'Bioprocessing',
      'Pharmaceutical Biotechnology',
      'Agricultural Biotechnology',
      'Industrial Biotechnology',
      'Medical Biotechnology',
      'Bioinformatics',
      'Synthetic Biology',
      'Stem Cell Technology',
      'Tissue Engineering'
    ],
    'Materials Science': [
      'Metallurgy',
      'Ceramics',
      'Polymers',
      'Composites',
      'Nanomaterials',
      'Biomaterials',
      'Electronic Materials',
      'Optical Materials',
      'Structural Materials',
      'Smart Materials'
    ],
    'Nanotechnology': [
      'Nanomaterials',
      'Nanoelectronics',
      'Nanomedicine',
      'Nanofabrication',
      'Molecular Nanotechnology',
      'Nanosensors',
      'Nanorobotics',
      'Nanochemistry',
      'Nanophysics',
      'Nanobiotechnology'
    ],
    'Marine Science': [
      'Oceanography',
      'Marine Biology',
      'Marine Geology',
      'Marine Chemistry',
      'Marine Physics',
      'Fisheries Science',
      'Marine Conservation',
      'Coastal Science',
      'Marine Policy',
      'Aquatic Ecology'
    ],
    
    // Emerging domains
    'Artificial Intelligence': [
      'Machine Learning',
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision',
      'Robotics',
      'Expert Systems',
      'Neural Networks',
      'Reinforcement Learning',
      'AI Ethics',
      'Autonomous Systems'
    ],
    'Data Science': [
      'Data Analysis',
      'Machine Learning',
      'Data Visualization',
      'Big Data',
      'Statistical Modeling',
      'Predictive Analytics',
      'Data Mining',
      'Business Intelligence',
      'Data Engineering',
      'Applied Statistics'
    ],
    'Cybersecurity': [
      'Network Security',
      'Information Security',
      'Ethical Hacking',
      'Digital Forensics',
      'Risk Management',
      'Incident Response',
      'Security Architecture',
      'Cryptography',
      'Identity Management',
      'Cloud Security'
    ],
    'Renewable Energy': [
      'Solar Energy',
      'Wind Energy',
      'Hydroelectric Power',
      'Geothermal Energy',
      'Bioenergy',
      'Energy Storage',
      'Smart Grids',
      'Energy Efficiency',
      'Sustainable Energy',
      'Energy Policy'
    ],
    'Bioinformatics': [
      'Genomics',
      'Proteomics',
      'Computational Biology',
      'Sequence Analysis',
      'Phylogenetics',
      'Structural Bioinformatics',
      'Systems Biology',
      'Drug Discovery',
      'Biostatistics',
      'Molecular Modeling'
    ],
    'Neuroscience': [
      'Cognitive Neuroscience',
      'Behavioral Neuroscience',
      'Molecular Neuroscience',
      'Cellular Neuroscience',
      'Systems Neuroscience',
      'Clinical Neuroscience',
      'Developmental Neuroscience',
      'Social Neuroscience',
      'Computational Neuroscience',
      'Neuroengineering'
    ],
    'Robotics': [
      'Autonomous Robots',
      'Human-Robot Interaction',
      'Industrial Robotics',
      'Service Robotics',
      'Medical Robotics',
      'Swarm Robotics',
      'Soft Robotics',
      'Robotics Control',
      'Robotics Perception',
      'Robotics Programming'
    ],
    'Blockchain Technology': [
      'Cryptocurrencies',
      'Smart Contracts',
      'Decentralized Applications',
      'Consensus Algorithms',
      'Blockchain Security',
      'Tokenomics',
      'DeFi',
      'NFTs',
      'Blockchain Governance',
      'Enterprise Blockchain'
    ],
    'Quantum Computing': [
      'Quantum Algorithms',
      'Quantum Cryptography',
      'Quantum Error Correction',
      'Quantum Information Theory',
      'Quantum Hardware',
      'Quantum Software',
      'Quantum Machine Learning',
      'Quantum Communication',
      'Quantum Simulation',
      'Quantum Networking'
    ],
    'Computational Biology': [
      'Genome Analysis',
      'Protein Structure Prediction',
      'Phylogenetic Analysis',
      'Population Genetics',
      'Systems Biology',
      'Drug Design',
      'Bioinformatics Tools',
      'Evolutionary Computation',
      'Molecular Dynamics',
      'Biological Networks'
    ],
    'Digital Humanities': [
      'Digital Archiving',
      'Text Mining',
      'Digital Storytelling',
      'Cultural Analytics',
      'Digital Preservation',
      'Human-Computer Interaction',
      'Digital Art History',
      'Computational Linguistics',
      'Digital Archaeology',
      'Virtual Museums'
    ],
    
    // Education domains
    'Early Childhood Education': [
      'Child Development',
      'Play-Based Learning',
      'Early Literacy',
      'Mathematics in Early Childhood',
      'Social-Emotional Learning',
      'Inclusive Education',
      'Assessment in Early Childhood',
      'Family Engagement',
      'Curriculum Design',
      'Early Intervention'
    ],
    'Primary Education': [
      'Elementary Curriculum',
      'Classroom Management',
      'Differentiated Instruction',
      'Literacy Instruction',
      'Mathematics Education',
      'Science Education',
      'Social Studies Education',
      'Technology Integration',
      'Assessment Strategies',
      'Student Engagement'
    ],
    'Secondary Education': [
      'Subject-Specific Pedagogy',
      'Adolescent Development',
      'Classroom Assessment',
      'Curriculum Planning',
      'Instructional Technology',
      'Inclusive Practices',
      'Professional Development',
      'School Leadership',
      'Educational Research',
      'Student Motivation'
    ],
    'Special Education': [
      'Individualized Education',
      'Behavioral Interventions',
      'Assistive Technology',
      'Inclusive Practices',
      'Disability Studies',
      'Transition Services',
      'Collaborative Teaching',
      'Universal Design',
      'Family Partnerships',
      'Legal Issues'
    ],
    'Higher Education': [
      'University Teaching',
      'Academic Leadership',
      'Curriculum Development',
      'Educational Technology',
      'Faculty Development',
      'Student Affairs',
      'Institutional Research',
      'International Education',
      'Online Learning',
      'Educational Policy'
    ],
    'Educational Technology': [
      'Learning Management Systems',
      'Instructional Design',
      'Digital Literacy',
      'Online Learning',
      'Mobile Learning',
      'Gamification',
      'Virtual Reality in Education',
      'Educational Data Analytics',
      'Technology Integration',
      'Digital Assessment'
    ],
    'Curriculum Development': [
      'Curriculum Design',
      'Standards-Based Education',
      'Assessment Alignment',
      'Instructional Materials',
      'Program Evaluation',
      'Professional Development',
      'Cultural Responsiveness',
      'Innovation in Curriculum',
      'STEM Education',
      'Arts Integration'
    ],
    'Educational Psychology': [
      'Learning Theories',
      'Cognitive Development',
      'Motivation in Learning',
      'Assessment Psychology',
      'Individual Differences',
      'Social Learning',
      'Behavioral Interventions',
      'Emotional Intelligence',
      'Creativity in Education',
      'Educational Neuroscience'
    ],
    'Adult Education': [
      'Andragogy',
      'Workplace Learning',
      'Professional Development',
      'Lifelong Learning',
      'Adult Literacy',
      'Distance Education',
      'Career Counseling',
      'Community Education',
      'Corporate Training',
      'Educational Leadership'
    ],
    'Language Teaching': [
      'Second Language Acquisition',
      'TESOL',
      'Bilingual Education',
      'Language Assessment',
      'Cultural Competence',
      'Technology in Language Learning',
      'Content and Language Integration',
      'Pragmatics',
      'Sociolinguistics',
      'Language Policy'
    ],
    'Instructional Design': [
      'Learning Experience Design',
      'ADDIE Model',
      'SAM Model',
      'Design Thinking',
      'Performance Improvement',
      'Training Needs Analysis',
      'Evaluation Methods',
      'Multimedia Design',
      'User Experience Design',
      'Learning Analytics'
    ],
    'Educational Leadership': [
      'School Administration',
      'Leadership Theory',
      'Change Management',
      'School Improvement',
      'Data-Driven Decision Making',
      'Stakeholder Engagement',
      'Ethical Leadership',
      'Diversity and Inclusion',
      'Fiscal Management',
      'Community Relations'
    ],
    
    // Media domains
    'Journalism': [
      'News Reporting',
      'Feature Writing',
      'Investigative Journalism',
      'Broadcast Journalism',
      'Digital Journalism',
      'Photojournalism',
      'Sports Journalism',
      'Political Journalism',
      'Business Journalism',
      'International Correspondence'
    ],
    'Broadcasting': [
      'Television Production',
      'Radio Broadcasting',
      'Live Streaming',
      'Studio Production',
      'Field Production',
      'Audio Engineering',
      'Video Editing',
      'News Anchoring',
      'Talk Show Hosting',
      'Documentary Production'
    ],
    'Public Relations': [
      'Media Relations',
      'Crisis Communication',
      'Corporate Communications',
      'Event Planning',
      'Brand Management',
      'Social Media PR',
      'Influencer Relations',
      'Internal Communications',
      'Government Relations',
      'Non-Profit PR'
    ],
    'Digital Marketing': [
      'Search Engine Optimization',
      'Social Media Marketing',
      'Content Marketing',
      'Email Marketing',
      'Pay-Per-Click Advertising',
      'Marketing Analytics',
      'Influencer Marketing',
      'Affiliate Marketing',
      'Video Marketing',
      'Marketing Automation'
    ],
    'Content Creation': [
      'Video Production',
      'Photography',
      'Graphic Design',
      'Copywriting',
      'Scriptwriting',
      'Podcasting',
      'Blog Writing',
      'Social Media Content',
      'Storytelling',
      'Brand Content'
    ],
    'Social Media Management': [
      'Platform Strategy',
      'Content Planning',
      'Community Management',
      'Analytics and Reporting',
      'Influencer Collaboration',
      'Paid Social Advertising',
      'Crisis Management',
      'Brand Voice Development',
      'User-Generated Content',
      'Social Media Trends'
    ],
    'Film Production': [
      'Directing',
      'Cinematography',
      'Screenwriting',
      'Editing',
      'Sound Design',
      'Production Management',
      'Documentary Filmmaking',
      'Commercial Production',
      'Post-Production',
      'Visual Storytelling'
    ],
    'Radio Production': [
      'Audio Engineering',
      'Radio Programming',
      'News Broadcasting',
      'Talk Show Hosting',
      'Music Programming',
      'Remote Broadcasting',
      'Audio Editing',
      'Podcasting',
      'Radio Journalism',
      'Station Management'
    ],
    'Podcasting': [
      'Audio Production',
      'Content Development',
      'Interviewing',
      'Sound Design',
      'Distribution Strategy',
      'Monetization',
      'Guest Booking',
      'Show Hosting',
      'Audio Editing',
      'Podcast Marketing'
    ],
    'Media Studies': [
      'Media Theory',
      'Cultural Studies',
      'Media History',
      'Digital Media',
      'Media Ethics',
      'Audience Research',
      'Media Economics',
      'Media Law',
      'Global Media',
      'New Media'
    ],
    'Communications': [
      'Interpersonal Communication',
      'Organizational Communication',
      'Mass Communication',
      'Public Speaking',
      'Intercultural Communication',
      'Business Communication',
      'Health Communication',
      'Political Communication',
      'Digital Communication',
      'Communication Research'
    ],
    'Advertising': [
      'Creative Strategy',
      'Media Planning',
      'Brand Development',
      'Campaign Management',
      'Digital Advertising',
      'Copywriting',
      'Art Direction',
      'Consumer Research',
      'Integrated Marketing',
      'Performance Advertising'
    ],
    
    // Agriculture domains
    'Agronomy': [
      'Crop Science',
      'Soil Science',
      'Weed Science',
      'Plant Breeding',
      'Precision Agriculture',
      'Sustainable Farming',
      'Crop Protection',
      'Seed Technology',
      'Agricultural Biotechnology',
      'Climate-Smart Agriculture'
    ],
    'Horticulture': [
      'Floriculture',
      'Pomology',
      'Olericulture',
      'Landscape Design',
      'Greenhouse Management',
      'Plant Propagation',
      'Post-Harvest Technology',
      'Ornamental Horticulture',
      'Urban Horticulture',
      'Medicinal Plants'
    ],
    'Animal Science': [
      'Livestock Management',
      'Animal Nutrition',
      'Animal Breeding',
      'Animal Health',
      'Dairy Science',
      'Poultry Science',
      'Beef Cattle Management',
      'Equine Science',
      'Animal Behavior',
      'Meat Science'
    ],
    'Forestry': [
      'Forest Management',
      'Silviculture',
      'Forest Ecology',
      'Wildlife Management',
      'Forest Economics',
      'Forest Engineering',
      'Urban Forestry',
      'Forest Products',
      'Fire Management',
      'Conservation Biology'
    ],
    'Aquaculture': [
      'Fish Farming',
      'Shellfish Culture',
      'Aquaponics',
      'Hatchery Management',
      'Aquatic Nutrition',
      'Fish Health',
      'Mariculture',
      'Recirculating Systems',
      'Species Diversification',
      'Sustainable Aquaculture'
    ],
    'Agricultural Engineering': [
      'Farm Machinery',
      'Irrigation Engineering',
      'Post-Harvest Technology',
      'Renewable Energy Systems',
      'Precision Agriculture',
      'Food Processing',
      'Bioprocessing',
      'Environmental Control',
      'Structural Design',
      'Automation'
    ],
    'Soil Science': [
      'Soil Chemistry',
      'Soil Physics',
      'Soil Biology',
      'Soil Fertility',
      'Soil Classification',
      'Soil Conservation',
      'Environmental Soil Science',
      'Pedology',
      'Edaphology',
      'Soil Microbiology'
    ],
    'Plant Science': [
      'Plant Physiology',
      'Plant Pathology',
      'Plant Genetics',
      'Plant Ecology',
      'Plant Taxonomy',
      'Plant Anatomy',
      'Plant Biochemistry',
      'Plant Biotechnology',
      'Plant Breeding',
      'Plant Molecular Biology'
    ],
    'Food Science': [
      'Food Chemistry',
      'Food Microbiology',
      'Food Processing',
      'Food Safety',
      'Food Engineering',
      'Sensory Science',
      'Nutritional Science',
      'Food Packaging',
      'Food Quality Control',
      'Functional Foods'
    ],
    'Environmental Conservation': [
      'Biodiversity Conservation',
      'Ecosystem Management',
      'Watershed Management',
      'Wildlife Conservation',
      'Restoration Ecology',
      'Protected Area Management',
      'Climate Change Adaptation',
      'Sustainable Resource Use',
      'Environmental Policy',
      'Community-Based Conservation'
    ],
    'Sustainable Agriculture': [
      'Organic Farming',
      'Agroecology',
      'Permaculture',
      'Regenerative Agriculture',
      'Agroforestry',
      'Integrated Pest Management',
      'Soil Health',
      'Water Conservation',
      'Carbon Sequestration',
      'Circular Agriculture'
    ],
    'Agribusiness': [
      'Agricultural Marketing',
      'Farm Management',
      'Agricultural Finance',
      'Supply Chain Management',
      'Agricultural Economics',
      'Commodity Trading',
      'Agricultural Policy',
      'Rural Development',
      'Agri-Tourism',
      'Agricultural Cooperatives'
    ]
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedField('');
    setActiveTab('fields');
  };

  // Handle field selection
  const handleFieldSelect = (field) => {
    setSelectedField(field);
    setActiveTab('specializations');
  };

  // Handle domain selection and navigation
  const handleDomainSelect = (domain) => {
    // Pass the specialization (domain) instead of the field
    setCurrentSkills(domain);
    setCurrentExpertise('Beginner');
    setTimeout(() => {
      navigate('/simplified-ultimate-roadmap');
    }, 100);
  };

  // Handle search
  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        
        // Check for exact field match
        const allFields = Object.values(fieldsByCategory).flat();
        const exactFieldMatch = allFields.find(field => 
          field.toLowerCase() === query
        );
        
        if (exactFieldMatch) {
          // Find which category this field belongs to
          // We just need to navigate, so we don't need to store the category
          Object.keys(fieldsByCategory).forEach(category => {
            if (fieldsByCategory[category].includes(exactFieldMatch)) {
              // Category found, but we don't need to use it
            }
          });
          
          setCurrentSkills(exactFieldMatch);
          setCurrentExpertise('Beginner');
          setTimeout(() => {
            navigate('/simplified-ultimate-roadmap');
          }, 100);
          return;
        }
        
        // Check for domain matches
        const allDomains = domainsByField;
        for (const [field, domains] of Object.entries(allDomains)) {
          const matchedDomain = domains.find(domain => 
            domain.toLowerCase().includes(query)
          );
          
          if (matchedDomain) {
            // Find which category this field belongs to
            // We just need to navigate, so we don't need to store the category
            Object.keys(fieldsByCategory).forEach(category => {
              if (fieldsByCategory[category].includes(field)) {
                // Category found, but we don't need to use it
              }
            });
            
            setCurrentSkills(matchedDomain);
            setCurrentExpertise('Beginner');
            setTimeout(() => {
              navigate('/simplified-ultimate-roadmap');
            }, 100);
            return;
          }
        }
        
        // If no matches found, show alert
        alert(`No matching career path found for "${searchQuery}". Please try another search term.`);
      }
    }
  };

  // Toggle more content
  const toggleMoreContent = () => {
    setShowMoreContent(!showMoreContent);
  };

  // Reset selection
  const resetSelection = () => {
    setSelectedCategory('');
    setSelectedField('');
    setActiveTab('categories');
  };

  // Get fields for current category
  const fields = fieldsByCategory[selectedCategory] || [];

  // Get domains for current field
  const domains = domainsByField[selectedField] || [];

  // Container variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item variants for animations
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Scroll to career selection section
  const scrollToCareerSelection = (e) => {
    e.preventDefault();
    const element = document.getElementById('choose-interest-area');
    if (element) {
      // Use a more reliable scrolling method
      const yOffset = -80; // Adjust for fixed header if needed
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen w-full transition-all duration-500 professional-background theme-text-primary pt-20 ${isDark ? 'dark' : 'light'}`}>
      {/* Enhanced Creative Background System */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-950' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}></div>
        
        {/* Floating Orbs with Organic Movement */}
        <div className={`absolute top-20 right-20 w-72 h-72 rounded-full opacity-15 animate-pulseGlow blur-3xl ${isDark ? 'bg-gradient-to-r from-blue-500/40 to-indigo-500/40' : 'bg-gradient-to-r from-blue-400/30 to-indigo-400/30'} animate-float`}></div>
        <div className={`absolute bottom-20 left-20 w-48 h-48 rounded-full opacity-20 animate-drift blur-2xl ${isDark ? 'bg-gradient-to-r from-purple-500/40 to-blue-500/40' : 'bg-gradient-to-r from-purple-400/30 to-blue-400/30'}`} style={{animationDuration: '12s'}}></div>
        
        {/* Subtle particle effects */}
        <div className={`absolute top-1/3 left-1/4 w-2 h-2 rounded-full animate-float ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} style={{animationDuration: '8s', marginLeft: '-1px', marginTop: '-1px'}}></div>
        <div className={`absolute top-1/4 left-2/3 w-1.5 h-1.5 rounded-full animate-drift ${isDark ? 'bg-indigo-400' : 'bg-indigo-500'}`} style={{animationDuration: '10s', marginLeft: '-0.75px', marginTop: '-0.75px'}}></div>
        <div className={`absolute bottom-1/3 right-1/3 w-1 h-1 rounded-full animate-driftDelayed ${isDark ? 'bg-purple-400' : 'bg-purple-500'}`} style={{animationDuration: '14s', marginLeft: '-0.5px', marginTop: '-0.5px'}}></div>
        <div className={`absolute top-2/3 left-1/5 w-2 h-2 rounded-full animate-float ${isDark ? 'bg-blue-300' : 'bg-blue-400'}`} style={{animationDuration: '11s', marginLeft: '-1px', marginTop: '-1px'}}></div>
        
        {/* Gentle rotating elements */}
        <div className={`absolute top-1/6 right-1/6 w-20 h-20 border ${isDark ? 'border-blue-500/30' : 'border-blue-400/30'} rounded-full animate-rotateSlow`} style={{animationDuration: '25s'}}></div>
        
        {/* Pulsing glow effects */}
        <div className={`absolute bottom-1/4 right-1/4 w-10 h-10 rounded-full ${isDark ? 'bg-blue-500/20' : 'bg-blue-400/20'} animate-pulseGlow`} style={{animationDuration: '7s'}}></div>
      </div>
      
      <div className="relative z-10">
        {/* Floating elements for 3D effect */}
        <div className="floating-elements">
          <div className="float-1 animate-float"></div>
          <div className="float-2 animate-drift"></div>
          <div className="float-3 animate-driftDelayed"></div>
          <div className="float-4 animate-pulseGlow"></div>
          <div className="float-5 animate-levitate"></div>
        </div>

        {/* Hero Section with 3D enhancements */}
        <section className="hero-section relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: animationStage >= 1 ? 1 : 0, y: animationStage >= 1 ? 0 : 20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-6"
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                  Career Guidance Redefined
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: animationStage >= 2 ? 1 : 0, y: animationStage >= 2 ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <span className="block">Discover Your</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Perfect Career Path
                </span>
              </motion.h1>
              
              <motion.p 
                className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: animationStage >= 3 ? 1 : 0, y: animationStage >= 3 ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                Explore thousands of career opportunities tailored to your interests and skills. 
                Find the path that aligns with your passion and potential.
              </motion.p>
              
              {/* Enhanced Search Bar with 3D effects */}
              <motion.div 
                className="max-w-2xl mx-auto mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: animationStage >= 4 ? 1 : 0, y: animationStage >= 4 ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                <div className="relative enhanced-gradient-border hover-lift interactive-glow-primary rounded-2xl">
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Search for careers, skills, or specializations..."
                      className="flex-grow p-5 pl-6 pr-16 rounded-l-2xl text-lg shadow-lg theme-input focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent border-0"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearch}
                    />
                    <Enhanced3DButton
                      className="rounded-r-2xl h-full py-5 px-6"
                      size="sm"
                      onClick={handleSearch}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </Enhanced3DButton>
                  </div>
                </div>
              </motion.div>

              {/* Quick Select Domains with 3D cards */}
              <motion.div 
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Popular Career Paths</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {quickSelectDomains.map((item, index) => (
                    <motion.div
                      key={index}
                      className="p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 theme-card hover:shadow-xl professional-card hover-lift animate-fadeIn floating-card interactive-glow h-full flex flex-col"
                      onClick={() => handleQuickSelect(item)}
                      whileHover={{ 
                        y: -10,
                        rotateX: 5,
                        rotateY: 5,
                        scale: 1.02
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{
                        transformStyle: 'preserve-3d',
                        perspective: '1000px'
                      }}
                    >
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                        <p className="theme-text-secondary text-sm">Specialization: {item.field}</p>
                      </div>
                      <div className="mt-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Quick Explore
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Direct Navigation Button */}
              <motion.div 
                className="mb-16 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Enhanced3DButton 
                  onClick={scrollToCareerSelection}
                  className="animate-interactiveGlow"
                  size="lg"
                  variant="primary"
                >
                  Explore More
                </Enhanced3DButton>
              </motion.div>
            </div>
          </div>
          
        </section>

        {/* Career Selection Section with Tabbed Interface */}
        <section id="choose-interest-area" className="py-16 px-4 md:px-8 relative z-10 bg-gradient-to-b from-transparent to-gray-100/50 dark:to-gray-900/50 mt-[-2rem]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Find Your Perfect Career
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Navigate through our comprehensive career exploration system to discover paths that match your interests
              </p>
            </motion.div>
            
            {/* Progress Indicator */}
            <div className="mb-12">
              <div className="flex justify-center">
                <div className="flex items-center">
                  {['categories', 'fields', 'specializations'].map((step, index) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                        activeTab === step 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-110' 
                          : activeTab === 'fields' && step === 'categories'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                          : activeTab === 'specializations' && (step === 'categories' || step === 'fields')
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }`}>
                        {index + 1}
                      </div>
                      {index < 2 && (
                        <div className={`w-16 h-1.5 mx-2 rounded-full transition-all duration-300 ${
                          activeTab === 'fields' && step === 'categories'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                            : activeTab === 'specializations' && (step === 'categories' || step === 'fields')
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <div className="text-center flex space-x-8">
                  <span className={`text-sm font-bold px-4 py-2 rounded-full transition-all duration-300 ${
                    activeTab === 'categories' 
                      ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900/50 dark:to-indigo-900/50 dark:text-blue-200 shadow-md' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    Categories
                  </span>
                  <span className={`text-sm font-bold px-4 py-2 rounded-full transition-all duration-300 ${
                    activeTab === 'fields' 
                      ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900/50 dark:to-indigo-900/50 dark:text-blue-200 shadow-md' 
                      : activeTab === 'specializations' && selectedField
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900/50 dark:to-emerald-900/50 dark:text-green-200 shadow-md'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    Fields
                  </span>
                  <span className={`text-sm font-bold px-4 py-2 rounded-full transition-all duration-300 ${
                    activeTab === 'specializations' 
                      ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900/50 dark:to-indigo-900/50 dark:text-blue-200 shadow-md' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    Specializations
                  </span>
                </div>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {/* Categories Tab */}
                {activeTab === 'categories' && (
                  <motion.div
                    key="categories"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {categories.map((category) => (
                        <motion.div
                          key={category.id}
                          className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 theme-card hover:shadow-xl professional-card hover-lift gradient-border interactive-glow-primary h-full flex flex-col enhanced-card-hover backdrop-blur-sm ${isDark ? 'dark:bg-gray-800/50 dark:border-gray-700/50' : 'bg-white/80 border-gray-200/50'}`}
                          onClick={() => handleCategorySelect(category.id)}
                          variants={itemVariants}
                          whileHover={{ 
                            y: -10,
                            rotateX: 5,
                            rotateY: 5,
                            scale: 1.02
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          style={{
                            transformStyle: 'preserve-3d',
                            perspective: '1000px'
                          }}
                        >
                          <div className="flex-grow flex flex-col items-center text-center">
                            <div className="text-4xl mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">{category.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{category.name}</h3>
                            <p className="theme-text-secondary text-sm mb-4">{category.description}</p>
                          </div>
                          <div className="mt-auto">
                            <Enhanced3DButton 
                              size="sm" 
                              variant="secondary"
                              className="w-full"
                            >
                              Explore
                            </Enhanced3DButton>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Fields Tab */}
                {activeTab === 'fields' && (
                  <motion.div
                    key="fields"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                      <div className="flex items-center">
                        <button
                          onClick={resetSelection}
                          className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                          </svg>
                          Back to Categories
                        </button>
                        <div className="ml-4 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                          Selected: {categories.find(c => c.id === selectedCategory)?.name}
                        </div>
                      </div>
                      
                      <div className="relative w-full md:w-64 enhanced-gradient-border rounded-xl">
                        <input
                          type="text"
                          placeholder="Filter fields..."
                          className="w-full p-3 pl-10 rounded-xl border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {fields.map((field, index) => (
                        <motion.div
                          key={index}
                          className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 theme-card hover:shadow-xl professional-card hover-lift gradient-border interactive-glow-primary h-full flex flex-col enhanced-card-hover backdrop-blur-sm ${isDark ? 'dark:bg-gray-800/50 dark:border-gray-700/50' : 'bg-white/80 border-gray-200/50'}`}
                          onClick={() => handleFieldSelect(field)}
                          variants={itemVariants}
                          whileHover={{ 
                            y: -10,
                            rotateX: 5,
                            rotateY: 5,
                            scale: 1.02
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          style={{
                            transformStyle: 'preserve-3d',
                            perspective: '1000px'
                          }}
                        >
                          <div className="flex-grow">
                            <h3 className="text-xl font-bold mb-3">{field}</h3>
                            <p className="theme-text-secondary text-sm mb-4">
                              {domainsByField[field]?.length || 0} Specializations Available
                            </p>
                          </div>
                          <div className="mt-4">
                            <div className="flex flex-wrap gap-1 mb-4">
                              {domainsByField[field]?.slice(0, 3).map((domain, idx) => (
                                <span key={idx} className="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200">
                                  {domain}
                                </span>
                              ))}
                              {domainsByField[field]?.length > 3 && (
                                <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                  +{domainsByField[field].length - 3} more
                                </span>
                              )}
                            </div>
                            <Enhanced3DButton 
                              size="sm" 
                              variant="secondary"
                              className="w-full"
                            >
                              Select Field
                            </Enhanced3DButton>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Specializations Tab */}
                {activeTab === 'specializations' && (
                  <motion.div
                    key="specializations"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                      <div className="flex items-center">
                        <button
                          onClick={resetSelection}
                          className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                          </svg>
                          Back to Categories
                        </button>
                        <div className="ml-4 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                          Selected: {selectedField}
                        </div>
                      </div>
                      
                      <div className="relative w-full md:w-64 enhanced-gradient-border rounded-xl">
                        <input
                          type="text"
                          placeholder="Filter specializations..."
                          className="w-full p-3 pl-10 rounded-xl border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {domains.map((domain, index) => (
                        <motion.div
                          key={index}
                          className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 theme-card hover:shadow-xl professional-card hover-lift gradient-border interactive-glow-primary h-full flex flex-col enhanced-card-hover backdrop-blur-sm ${isDark ? 'dark:bg-gray-800/50 dark:border-gray-700/50' : 'bg-white/80 border-gray-200/50'}`}
                          onClick={() => handleDomainSelect(domain)}
                          variants={itemVariants}
                          whileHover={{ 
                            y: -10,
                            rotateX: 5,
                            rotateY: 5,
                            scale: 1.02
                          }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          style={{
                            transformStyle: 'preserve-3d',
                            perspective: '1000px'
                          }}
                        >
                          <div className="flex-grow">
                            <h3 className="text-xl font-bold mb-3">{domain}</h3>
                            <p className="theme-text-secondary text-sm">
                              Specialization in {selectedField}
                            </p>
                          </div>
                          <div className="mt-4">
                            <Enhanced3DButton 
                              size="sm" 
                              variant="secondary"
                              className="w-full"
                            >
                              Select Specialization
                            </Enhanced3DButton>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;
