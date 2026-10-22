import {
  FaCode, FaGlobe, FaDatabase, FaTools, FaBrain, FaLightbulb,
  FaJava, FaHtml5, FaCss3Alt,
} from 'react-icons/fa'
import {
  SiPython, SiJavascript, SiReact, SiFirebase, SiMysql, SiGit,
  SiGithub, SiJupyter, SiPandas, SiNumpy, SiScikitlearn, SiStreamlit,
  SiTailwindcss,
} from 'react-icons/si'

export const skillGroups = [
  { icon: FaCode, title: 'Programming languages', tags: ['Python', 'Java', 'JavaScript'] },
  { icon: FaGlobe, title: 'Web development', tags: ['HTML', 'CSS', 'React.js', 'Tailwind CSS', 'Django REST Framework', 'Flask', 'Firebase'] },
  { icon: FaDatabase, title: 'Databases', tags: ['MySQL', 'Oracle SQL', 'Firestore'] },
  { icon: FaTools, title: 'Tools & platforms', tags: ['Git', 'GitHub', 'Jupyter', 'Google Colab', 'Vercel', 'Render'] },
  { icon: FaBrain, title: 'Data science & AI/ML', tags: ['Pandas', 'NumPy', 'Scikit-learn', 'OpenCV', 'MediaPipe', 'Gemini API', 'Streamlit'] },
  { icon: FaLightbulb, title: 'Concepts', tags: ['REST APIs', 'JWT auth', 'WebSockets', 'CRUD operations', 'EDA', 'ML models'] },
]

export const marqueeTech = [
  { name: 'Python', Icon: SiPython },
  { name: 'Java', Icon: FaJava },
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'React', Icon: SiReact },
  { name: 'Tailwind CSS', Icon: SiTailwindcss },
  { name: 'HTML5', Icon: FaHtml5 },
  { name: 'CSS3', Icon: FaCss3Alt },
  { name: 'Firebase', Icon: SiFirebase },
  { name: 'MySQL', Icon: SiMysql },
  { name: 'Oracle SQL', Icon: FaDatabase },
  { name: 'Pandas', Icon: SiPandas },
  { name: 'NumPy', Icon: SiNumpy },
  { name: 'scikit-learn', Icon: SiScikitlearn },
  { name: 'Streamlit', Icon: SiStreamlit },
  { name: 'Jupyter', Icon: SiJupyter },
  { name: 'Git', Icon: SiGit },
  { name: 'GitHub', Icon: SiGithub },
]