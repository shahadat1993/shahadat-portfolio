import {
  SiLaravel, SiPhp, SiMysql, SiReact, SiJavascript, SiTailwindcss, SiBootstrap,
  SiGit, SiStripe, SiExpo,
} from 'react-icons/si';
import { FiLock, FiCode } from 'react-icons/fi';

const MAP = {
  laravel: SiLaravel,
  php: SiPhp,
  mysql: SiMysql,
  react: SiReact,
  reactnative: SiReact,
  javascript: SiJavascript,
  tailwind: SiTailwindcss,
  bootstrap: SiBootstrap,
  git: SiGit,
  payment: SiStripe,
  expo: SiExpo,
  lock: FiLock,
  api: FiCode,
};

export default function TechIcon({ name, className = '' }) {
  const Icon = MAP[name] || FiCode;
  return <Icon className={className} />;
}
