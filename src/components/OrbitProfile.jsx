import { motion } from 'framer-motion';
import TechIcon from './TechIcon';
import { profile } from '../data/mockData';

const orbitIcons = ['react', 'laravel', 'javascript', 'mysql', 'reactnative', 'git', 'tailwind', 'php'];

export default function OrbitProfile() {
  return (
    <div className="relative w-full max-w-sm mx-auto aspect-square">
      <motion.div
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: 'var(--border)', borderStyle: 'dashed' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {orbitIcons.map((icon, i) => {
          const angle = (360 / orbitIcons.length) * i;
          return (
            <div
              key={icon + i}
              className="absolute w-10 h-10 -ml-5 -mt-5 rounded-xl surface flex items-center justify-center"
              style={{ top: '50%', left: '50%', transform: `rotate(${angle}deg) translate(170px) rotate(-${angle}deg)` }}
            >
              <TechIcon name={icon} className="accent-text text-base" />
            </div>
          );
        })}
      </motion.div>

      <div className="absolute inset-[16%] rounded-full overflow-hidden ring-4" style={{ '--tw-ring-color': 'var(--accent)' }}>
        <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
