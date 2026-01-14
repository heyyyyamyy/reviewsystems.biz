import React, { useState } from 'react';
import { NavBar } from './components/NavBar';
import { ReviewCard } from './components/ReviewCard';
import { WriteReviewModal } from './components/WriteReviewModal';
import { Review, PageView, CompanySummary } from './types';
import { Send, MapPin, Mail, Phone, ArrowRight, PenSquare, HardHat } from 'lucide-react';

// Mock Data with Indian Names and Construction Focus
const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    companyName: 'Zenthera Groups',
    author: 'Rajesh Kumar',
    role: 'Senior Site Engineer',
    rating: 4,
    title: 'Professional Certificates are Mandatory for Deployment',
    content: 'Working at Zenthera Groups involves large-scale infrastructure projects. The work environment is professional, but they are very strict about certifications. You need a valid PMP and Safety Certification before they even deploy you to the project site. I had to wait 2 weeks for my certs to clear before I could start on the ground. Good for safety, but slows down onboarding.',
    date: 'Oct 12, 2023',
    verified: true
  },
  {
    id: '2',
    companyName: 'Zenthera Groups',
    author: 'Priya Sharma',
    role: 'Structural Engineer',
    rating: 3,
    title: 'Lengthy Interview Process - Telephonic Round details',
    content: 'The interview process at Zenthera is quite rigorous. It started with a 30-minute telephonic round where they asked specific questions about concrete grades, shear force diagrams, and reinforcement standards. After that, there was a technical round and an HR round. They really test your technical knowledge before hiring. Work-life balance is average as site visits are frequent.',
    date: 'Nov 05, 2023',
    verified: true
  },
  {
    id: '3',
    companyName: 'TechFlow Solutions',
    author: 'Amit Patel',
    role: 'Data Analyst',
    rating: 3,
    title: 'Average experience',
    content: 'Good pay, but the work-life balance could be better. Management is a bit distant.',
    date: 'Sep 20, 2023',
    verified: false
  },
  {
    id: '4',
    companyName: 'Zenthera Groups',
    author: 'Suresh Reddy',
    role: 'Project Manager',
    rating: 5,
    title: 'Great Construction Projects',
    content: 'If you want to work on high-rise and metro projects, this is the place. You need to have your professional certificates (PMP) ready to be deployed. The team ensures all safety protocols are followed. Telephonic interview was mainly about my past project handling experience and conflict resolution on site.',
    date: 'Dec 01, 2023',
    verified: true
  },
  {
    id: '5',
    companyName: 'Acme Corp',
    author: 'Vikram Singh',
    role: 'Sales Associate',
    rating: 2,
    title: 'Needs improvement',
    content: 'Old school mentality. Not much room for innovation.',
    date: 'Aug 15, 2023',
    verified: true
  },
   {
    id: '6',
    companyName: 'Zenthera Groups',
    author: 'Anjali Gupta',
    role: 'Civil Intern',
    rating: 4.5,
    title: 'Good learning for Interns',
    content: 'My internship involved a lot of site visits. The interview process included a telephonic round asking about basics of civil engineering like slump test and curing. They require you to complete a safety training certificate before letting you on site. Learned a lot.',
    date: 'Jan 10, 2024',
    verified: true
  },
  {
    id: '7',
    companyName: 'Zenthera Groups',
    author: 'Karthik Iyer',
    role: 'Safety Officer',
    rating: 4,
    title: 'Strict on Safety and Certificates',
    content: 'As a safety officer, I appreciate their protocol. They do not deploy anyone to the project without proper professional certificates like NEBOSH or OSHA. It makes my job easier. The work culture is disciplined.',
    date: 'Feb 02, 2024',
    verified: true
  },
  {
    id: '8',
    companyName: 'Zenthera Groups',
    author: 'Rohan Das',
    role: 'Site Engineer',
    rating: 4,
    title: 'Good exposure to bridge construction',
    content: 'The scale of projects is huge. Interview had a telephonic round regarding BBS (Bar Bending Schedule) preparation. Mandatory safety certs required for site entry.',
    date: 'Feb 15, 2024',
    verified: true
  },
  {
    id: '9',
    companyName: 'Zenthera Groups',
    author: 'Meera Nair',
    role: 'HR Manager',
    rating: 5,
    title: 'We prioritize safety',
    content: 'We take pride in our safety record. All engineers must have valid professional certificates before deployment. It is non-negotiable.',
    date: 'Feb 18, 2024',
    verified: true
  },
  {
    id: '10',
    companyName: 'Zenthera Groups',
    author: 'Arun Vijay',
    role: 'QA/QC Engineer',
    rating: 3,
    title: 'Strict quality checks',
    content: 'Quality control is very strict. You spend long hours at the testing lab. They required my NDT Level 2 certification before hiring. Interview asked about IS codes.',
    date: 'Feb 20, 2024',
    verified: false
  },
  {
    id: '11',
    companyName: 'Zenthera Groups',
    author: 'Sanjay Menon',
    role: 'Project Coordinator',
    rating: 4,
    title: 'Onboarding takes time',
    content: 'Deployment took time because my certificates were being verified by a third party. Good process though, ensures only qualified people are on site.',
    date: 'Feb 22, 2024',
    verified: true
  },
  {
    id: '12',
    companyName: 'Zenthera Groups',
    author: 'Divya Krishnan',
    role: 'Architect',
    rating: 5,
    title: 'Design team is great',
    content: 'I love the design culture here. We work on sustainable infrastructure. The interview process was lengthy - 3 rounds including a portfolio review and a technical telephonic round about green building norms.',
    date: 'Feb 25, 2024',
    verified: true
  },
  {
    id: '13',
    companyName: 'Zenthera Groups',
    author: 'Rahul Varma',
    role: 'Surveyor',
    rating: 3,
    title: 'Field work is tough',
    content: 'Site work is grueling, mostly 6 days a week. You learn a lot about Total Station and GPS surveying. They won\'t deploy you without a valid survey license and safety card.',
    date: 'Feb 28, 2024',
    verified: true
  },
  {
    id: '14',
    companyName: 'Zenthera Groups',
    author: 'Pooja Hegde',
    role: 'Safety Officer',
    rating: 5,
    title: 'Best safety culture',
    content: 'NEBOSH is mandatory here. If you don\'t have it, don\'t apply. Interview was entirely about hazard identification and risk assessment.',
    date: 'Mar 01, 2024',
    verified: true
  },
  {
    id: '15',
    companyName: 'Zenthera Groups',
    author: 'Manish Tiwari',
    role: 'Civil Foreman',
    rating: 4,
    title: 'Good pay, strict rules',
    content: 'Site allowance is good. Interview asked about concrete mixing ratios and shuttering. You need to carry your ID and safety pass visible at all times.',
    date: 'Mar 03, 2024',
    verified: false
  },
  {
    id: '16',
    companyName: 'Zenthera Groups',
    author: 'Kavita Singh',
    role: 'Planning Engineer',
    rating: 4,
    title: 'Primavera knowledge needed',
    content: 'Telephonic round checked my proficiency in Primavera P6. You need MSP or Primavera certification to handle project scheduling.',
    date: 'Mar 05, 2024',
    verified: true
  },
  {
    id: '17',
    companyName: 'Zenthera Groups',
    author: 'Deepak Sethi',
    role: 'Structural Consultant',
    rating: 5,
    title: 'Professional Environment',
    content: 'Consulting for Zenthera is a pleasure. They value technical expertise. All consultants must submit professional practice certificates.',
    date: 'Mar 08, 2024',
    verified: true
  },
  {
    id: '18',
    companyName: 'Zenthera Groups',
    author: 'Neha Gupta',
    role: 'Intern',
    rating: 4,
    title: 'Good for freshers',
    content: 'Learned estimation and costing. Interview was basic telephonic asking about unit conversions. They made me do a safety induction course on day 1.',
    date: 'Mar 10, 2024',
    verified: true
  },
  {
    id: '19',
    companyName: 'Zenthera Groups',
    author: 'Aditya Roy',
    role: 'Site Engineer',
    rating: 2,
    title: 'Remote Locations',
    content: 'Projects are often far from the city. Accommodation is provided but basic. Work-life balance is poor due to travel time.',
    date: 'Mar 12, 2024',
    verified: false
  },
  {
    id: '20',
    companyName: 'Zenthera Groups',
    author: 'Varun Kumar',
    role: 'Electrical Engineer',
    rating: 4,
    title: 'MEP Coordination',
    content: 'MEP works are coordinated well. Safety clearance takes 1 week, you need your electrical supervisor license valid.',
    date: 'Mar 15, 2024',
    verified: true
  },
  {
    id: '21',
    companyName: 'Zenthera Groups',
    author: 'Simran Kaur',
    role: 'Purchase Officer',
    rating: 3,
    title: 'Stressful deadlines',
    content: 'Vendor management is stressful during project peaks. SAP certification helped me get the job. Interview had questions on supply chain.',
    date: 'Mar 18, 2024',
    verified: true
  },
  {
    id: '22',
    companyName: 'Zenthera Groups',
    author: 'Nikhil Gowda',
    role: 'Jr. Engineer',
    rating: 4,
    title: 'Metro Project',
    content: 'Telephonic round covered fluid mechanics basics. I was deployed to the Metro project after submitting my degree certificate and medical fitness report.',
    date: 'Mar 20, 2024',
    verified: true
  },
  {
    id: '23',
    companyName: 'Zenthera Groups',
    author: 'Aisha Khan',
    role: 'Environmental Engineer',
    rating: 5,
    title: 'Sustainability focus',
    content: 'Zenthera cares about environmental impact. LEED accreditation is valued highly here. Work balance is good.',
    date: 'Mar 22, 2024',
    verified: true
  },
  {
    id: '24',
    companyName: 'Zenthera Groups',
    author: 'Boman Parsi',
    role: 'Crane Operator',
    rating: 4,
    title: 'Safety First',
    content: 'Heavy equipment safety is strict. Valid heavy vehicle license and crane operator training certs are checked monthly.',
    date: 'Mar 25, 2024',
    verified: false
  },
  {
    id: '25',
    companyName: 'Zenthera Groups',
    author: 'Chetan Sharma',
    role: 'Billing Engineer',
    rating: 3,
    title: 'Tight billing cycles',
    content: 'End of month is crazy. Excel skills were checked in the interview. You need to certify measurements on site.',
    date: 'Mar 28, 2024',
    verified: true
  },
  {
    id: '26',
    companyName: 'Zenthera Groups',
    author: 'Dinesh Pillai',
    role: 'Concrete Technologist',
    rating: 5,
    title: 'Great Labs',
    content: 'Lab facilities for concrete testing are top notch. Interview covered mix design ratios M30/M40.',
    date: 'Mar 30, 2024',
    verified: true
  },
  {
    id: '27',
    companyName: 'Zenthera Groups',
    author: 'Esha Sen',
    role: 'Liaison Officer',
    rating: 4,
    title: 'Professional team',
    content: 'Handling government approvals. Professional environment. Interview tested my knowledge of local building by-laws.',
    date: 'Apr 02, 2024',
    verified: true
  },
  {
    id: '28',
    companyName: 'Zenthera Groups',
    author: 'Farhan Qureshi',
    role: 'HVAC Engineer',
    rating: 4,
    title: 'Technical depth',
    content: 'HVAC design standards (ASHRAE) are followed strictly. Telephonic interview was very technical regarding heat load calculations.',
    date: 'Apr 05, 2024',
    verified: true
  },
  {
    id: '29',
    companyName: 'Zenthera Groups',
    author: 'Gauri Shinde',
    role: 'Interior Designer',
    rating: 5,
    title: 'Creative freedom',
    content: 'Commercial interiors division is growing. Interview included a portfolio presentation. Work life balance is decent.',
    date: 'Apr 08, 2024',
    verified: true
  },
  {
    id: '30',
    companyName: 'Zenthera Groups',
    author: 'Himesh Patel',
    role: 'Site Supervisor',
    rating: 2,
    title: 'Dust and Heat',
    content: 'Site conditions are tough. Too much dust and heat. Safety gear is heavy but mandatory. No deployment without safety induction.',
    date: 'Apr 10, 2024',
    verified: true
  },
  {
    id: '31',
    companyName: 'Zenthera Groups',
    author: 'Ishaan Joshi',
    role: 'Graduate Trainee',
    rating: 4,
    title: 'Good training',
    content: 'Training period is 6 months with rotational shifts. You have to pass an exam to get deployed to a project.',
    date: 'Apr 12, 2024',
    verified: true
  },
  {
    id: '32',
    companyName: 'Zenthera Groups',
    author: 'Jaya Pradha',
    role: 'Site Admin',
    rating: 3,
    title: 'Strict timings',
    content: 'Site office administration requires punctuality. Biometric attendance is strict. Good for those who like discipline.',
    date: 'Apr 15, 2024',
    verified: true
  },
  {
    id: '33',
    companyName: 'Zenthera Groups',
    author: 'Karan Mehra',
    role: 'Project Director',
    rating: 5,
    title: 'High value projects',
    content: 'Managing a 500cr project. PMP and 15 years exp required. The company supports you with resources if you follow the process.',
    date: 'Apr 18, 2024',
    verified: true
  },
  {
    id: '34',
    companyName: 'Zenthera Groups',
    author: 'Lata R',
    role: 'Draughtsman',
    rating: 4,
    title: 'AutoCAD test',
    content: 'The AutoCAD proficiency test in the interview was hard. They expect speed and accuracy. Structural detailing work is heavy.',
    date: 'Apr 20, 2024',
    verified: true
  },
  {
    id: '35',
    companyName: 'Zenthera Groups',
    author: 'Mona Singh',
    role: 'Safety Steward',
    rating: 4,
    title: 'Toolbox talks',
    content: 'We conduct toolbox talks every morning. Strict adherence to PPE. Certification in First Aid is required.',
    date: 'Apr 22, 2024',
    verified: true
  },
  {
    id: '36',
    companyName: 'Zenthera Groups',
    author: 'Naseer Ahmed',
    role: 'Mason Foreman',
    rating: 4,
    title: 'Timely payments',
    content: 'Labour management is key here. Payments are on time which makes managing the workforce easier. Experience certificate required.',
    date: 'Apr 25, 2024',
    verified: true
  },
  {
    id: '37',
    companyName: 'Zenthera Groups',
    author: 'Omkar Shetty',
    role: 'Geotech Engineer',
    rating: 5,
    title: 'Detailed analysis',
    content: 'Soil testing phase is critical. Detailed report analysis in interview. You need a soil mechanics background and certifications.',
    date: 'Apr 28, 2024',
    verified: true
  },
  {
    id: '38',
    companyName: 'Zenthera Groups',
    author: 'Pradeep Kumar',
    role: 'Scaffolding Inspector',
    rating: 3,
    title: 'Height works',
    content: 'Work at height permits are issued daily. Very strict. If you miss your safety harness, you are fired. Interview asked about load classes.',
    date: 'May 02, 2024',
    verified: true
  },
  {
    id: '39',
    companyName: 'Zenthera Groups',
    author: 'Quinn D\'Souza',
    role: 'Receptionist',
    rating: 4,
    title: 'Busy front desk',
    content: 'Head office is busy. Dealing with vendors and clients. Good environment. Interview tested soft skills.',
    date: 'May 05, 2024',
    verified: true
  },
  {
    id: '40',
    companyName: 'Zenthera Groups',
    author: 'Ravi Shastri',
    role: 'Store Manager',
    rating: 4,
    title: 'Material control',
    content: 'Reconciliation of steel and cement is monthly. You need to be good with numbers. Store management cert helps.',
    date: 'May 08, 2024',
    verified: true
  },
  {
    id: '41',
    companyName: 'Zenthera Groups',
    author: 'Sandhya Rani',
    role: 'Site Nurse',
    rating: 5,
    title: 'Health checks',
    content: 'I manage the first aid clinic. Every worker undergoes a health check before deployment. Company cares about worker health.',
    date: 'May 10, 2024',
    verified: true
  },
  {
    id: '42',
    companyName: 'Zenthera Groups',
    author: 'Tarun Gill',
    role: 'Fire Officer',
    rating: 5,
    title: 'Fire drills',
    content: 'Monthly fire drills are mandatory. I had to show my Fire Safety Diploma during the interview. Very professional setup.',
    date: 'May 12, 2024',
    verified: true
  },
  {
    id: '43',
    companyName: 'Zenthera Groups',
    author: 'Uday Kotak',
    role: 'Finance Controller',
    rating: 4,
    title: 'Project Budgeting',
    content: 'Cost control is strict. Variance analysis is done weekly. CA or ICWA qualification is needed for this role.',
    date: 'May 15, 2024',
    verified: true
  },
  {
    id: '44',
    companyName: 'Zenthera Groups',
    author: 'Vandana Shiva',
    role: 'Landscape Architect',
    rating: 5,
    title: 'Green projects',
    content: 'We use native species for landscaping. Great support from the management for sustainable ideas. Portfolio review was key in hiring.',
    date: 'May 18, 2024',
    verified: true
  },
  {
    id: '45',
    companyName: 'Zenthera Groups',
    author: 'Wasim Akram',
    role: 'Welder',
    rating: 4,
    title: 'Weld testing',
    content: 'Radiography test for welds is common. You need a valid welder qualification certificate (WQC). Pay is good for skilled workers.',
    date: 'May 20, 2024',
    verified: false
  },
  {
    id: '46',
    companyName: 'Zenthera Groups',
    author: 'Xavier Pinto',
    role: 'IT Support',
    rating: 3,
    title: 'Site connectivity',
    content: 'Setting up internet in remote sites is a challenge. Interview was about networking basics. You travel a lot.',
    date: 'May 22, 2024',
    verified: true
  },
  {
    id: '47',
    companyName: 'Zenthera Groups',
    author: 'Yashwanth Rao',
    role: 'Legal Advisor',
    rating: 4,
    title: 'Contracts & Claims',
    content: 'Construction law is complex. Handling claims and arbitrations. Law degree and bar council registration mandatory.',
    date: 'May 25, 2024',
    verified: true
  },
  {
    id: '48',
    companyName: 'Zenthera Groups',
    author: 'Zoya Akhtar',
    role: 'PR Manager',
    rating: 5,
    title: 'Community relations',
    content: 'We engage with local communities near project sites. CSR activities are taken seriously. Good corporate image.',
    date: 'May 28, 2024',
    verified: true
  },
  {
    id: '49',
    companyName: 'Zenthera Groups',
    author: 'Abhinav Bindra',
    role: 'Quality Head',
    rating: 5,
    title: 'ISO Standards',
    content: 'We follow ISO 9001 strictlly. Audits are frequent. Six Sigma Green Belt is preferred for senior quality roles.',
    date: 'Jun 01, 2024',
    verified: true
  },
  {
    id: '50',
    companyName: 'Zenthera Groups',
    author: 'Balaji T',
    role: 'Electrical Foreman',
    rating: 4,
    title: 'Cable laying',
    content: 'Underground cabling work. Safety permit required for excavation. Interview asked about cable sizing.',
    date: 'Jun 03, 2024',
    verified: true
  },
  {
    id: '51',
    companyName: 'Zenthera Groups',
    author: 'Chitra L',
    role: 'HR Executive',
    rating: 4,
    title: 'Exit interviews',
    content: 'Attrition is there in site roles. We try to retain talent. HR MBA is required. Telephonic screening is the first step.',
    date: 'Jun 05, 2024',
    verified: true
  },
  {
    id: '52',
    companyName: 'Zenthera Groups',
    author: 'Dev Anand',
    role: 'Architecture Intern',
    rating: 4,
    title: 'Model making',
    content: 'Made physical models for client presentation. Great learning. Interview asked about history of architecture.',
    date: 'Jun 08, 2024',
    verified: true
  }
];

const COMPANIES: CompanySummary[] = [
  { name: 'Zenthera Groups', industry: 'Construction & Infrastructure', logoInitial: 'Z', color: 'bg-indigo-600' },
  { name: 'TechFlow Solutions', industry: 'Data Analytics', logoInitial: 'T', color: 'bg-blue-500' },
  { name: 'Acme Corp', industry: 'Manufacturing', logoInitial: 'A', color: 'bg-slate-600' },
  { name: 'Nebula Innovations', industry: 'AI Research', logoInitial: 'N', color: 'bg-purple-600' },
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.HOME);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  const handleSubmitReview = (newReviewData: Omit<Review, 'id' | 'date' | 'verified'>) => {
    const newReview: Review = {
      ...newReviewData,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      verified: false
    };
    setReviews([newReview, ...reviews]);
  };

  const renderHome = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white shadow-xl mb-10">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-indigo-900 opacity-90"></div>
        <div className="relative z-10 px-8 py-16 md:px-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Real Construction Reviews. <br/>
              <span className="text-brand-400">Honest Insights.</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-lg">
              ReviewSystems.biz is the trusted platform for construction and corporate insights. 
              Read about interview processes, certification requirements, and project deployment.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <button 
                onClick={() => setIsWriteReviewOpen(true)}
                className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-brand-500/25 flex items-center gap-2"
              >
                Write a Review <PenSquare size={18} />
              </button>
            </div>
          </div>
          {/* Abstract decoration */}
          <div className="hidden md:block w-64 h-64 bg-gradient-to-tr from-brand-500 to-amber-500 rounded-full blur-3xl opacity-20 absolute -right-10 -top-10"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Latest Discussions</h2>
            <div className="text-sm text-slate-500">Showing {reviews.length} reviews</div>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            {/* Trending Companies */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Trending Companies</h3>
              <div className="space-y-4">
                {COMPANIES.map((company) => (
                  <div key={company.name} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
                    <div className={`h-10 w-10 rounded-lg ${company.color} text-white flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform`}>
                      {company.logoInitial}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm group-hover:text-brand-600 transition-colors">{company.name}</h4>
                      <p className="text-xs text-slate-500">{company.industry}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ad / Info Box */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <HardHat className="text-amber-400" />
                <h3 className="font-bold text-lg">Deploy at Zenthera?</h3>
              </div>
              <p className="text-slate-300 text-sm mb-4">
                Are you PMP certified? Ensure you have all professional certificates ready before project deployment.
              </p>
              <button onClick={() => setCurrentPage(PageView.CONTACT)} className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-2 rounded-lg text-sm font-medium transition-colors">
                Contact HR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Get in touch</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Whether you want to submit a review, claim a company page, or report an issue, we are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Contact Info */}
        <div className="bg-brand-600 p-10 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-brand-200 mt-1" />
                <div>
                  <p className="font-medium">Headquarters</p>
                  <p className="text-brand-100 text-sm mt-1">123 Corporate Blvd,<br />Suite 500<br />Innovation City, ST 90210</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-brand-200 mt-1" />
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-brand-100 text-sm mt-1">support@reviewsystems.biz</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-brand-200 mt-1" />
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-brand-100 text-sm mt-1">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12">
             <p className="text-sm text-brand-200">
               Operating Hours: Mon-Fri, 9am - 5pm PST
             </p>
          </div>
        </div>

        {/* Form */}
        <div className="p-10">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
              <input type="text" id="name" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm p-3 border" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
              <input type="email" id="email" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm p-3 border" placeholder="john@example.com" />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-slate-700">Company (Optional)</label>
              <input type="text" id="company" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm p-3 border" placeholder="e.g. Zenthera Groups" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
              <textarea id="message" rows={4} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm p-3 border" placeholder="How can we help you?"></textarea>
            </div>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors">
              <Send className="h-4 w-4 mr-2" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <NavBar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-grow">
        {currentPage === PageView.HOME ? renderHome() : renderContact()}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} ReviewSystems.biz. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-brand-600">Privacy Policy</a>
            <a href="#" className="hover:text-brand-600">Terms of Service</a>
            <a href="#" className="hover:text-brand-600">Cookie Settings</a>
          </div>
        </div>
      </footer>

      {/* Write Review Modal */}
      <WriteReviewModal 
        isOpen={isWriteReviewOpen} 
        onClose={() => setIsWriteReviewOpen(false)} 
        onSubmit={handleSubmitReview} 
      />
    </div>
  );
};

export default App;