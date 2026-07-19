import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FiSend, FiMail, FiMapPin, FiCopy, FiCheck, FiAlertCircle } from 'react-icons/fi';
import SectionHeading from '../components/SectionHeading';
import ContactIllustration from '../components/ContactIllustration';
import Button from '../components/Button';
import { profile } from '../data/mockData';

const SERVICES = ['Web App (Laravel)', 'Mobile App (React Native)', 'E-commerce', 'API Integration', 'Other'];

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: SERVICES[0], message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available, ignore silently
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error('EmailJS is not configured — see README-DATA.md');
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          service: form.service,
          message: form.message,
          to_email: profile.email,
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus('sent');
      setForm({ name: '', email: '', service: SERVICES[0], message: '' });
    } catch (err) {
      console.error('EmailJS send failed:', err);
      setStatus('error');
    }
  };

  return (
    <div className="container-px mx-auto max-w-6xl py-16">
      <SectionHeading eyebrow="Contact" title="Let's build something together" subtitle="Have a project, an idea, or just a question? Send it over." align="center" />

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <ContactIllustration />
          <div className="space-y-5 mt-8 max-w-sm mx-auto">
            <div className="flex items-center gap-3">
              <FiMail className="accent-text" />
              <div className="flex-1">
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                data-cursor-hover
                aria-label="Copy email address"
                className="w-9 h-9 rounded-full surface flex items-center justify-center shrink-0 transition-transform active:scale-90"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                      <FiCheck className="accent-text" />
                    </motion.span>
                  ) : (
                    <motion.span key="copy" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                      <FiCopy />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <FiMapPin className="accent-text" />
              <div>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Location</p>
                <p className="font-medium">{profile.location}</p>
              </div>
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="surface rounded-2xl p-6 md:p-8 space-y-4"
        >
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-10 text-center">
                <h3 className="font-display text-2xl font-semibold accent-text">Message sent!</h3>
                <p className="mt-2" style={{ color: 'var(--text-muted)' }}>Thanks for reaching out — I'll reply within a day or two.</p>
                <button type="button" data-cursor-hover onClick={() => setStatus('idle')} className="mt-6 text-sm underline accent-text">
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required name="name" value={form.name} onChange={handleChange} placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl outline-none text-sm" style={{ background: 'var(--surface-2)' }} />
                  <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your email"
                    className="w-full px-4 py-3 rounded-xl outline-none text-sm" style={{ background: 'var(--surface-2)' }} />
                </div>

                <select name="service" value={form.service} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl outline-none text-sm" style={{ background: 'var(--surface-2)' }}>
                  {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>

                <textarea required rows={5} name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl outline-none text-sm resize-none" style={{ background: 'var(--surface-2)' }} />

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-sm px-4 py-3 rounded-xl" style={{ background: 'var(--surface-2)', color: '#f87171' }}>
                    <FiAlertCircle /> Couldn't send the message. Please try again, or email me directly.
                  </div>
                )}

                <Button type="submit" variant="primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : <>Send message <FiSend /></>}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </div>
  );
}
