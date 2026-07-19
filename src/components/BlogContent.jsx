import { motion } from 'framer-motion';

export default function BlogContent({ blocks }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        if (block.type === 'heading') {
          return (
            <motion.h2
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl font-semibold pt-4 clear-both"
            >
              {block.text}
            </motion.h2>
          );
        }

        if (block.type === 'image') {
          if (block.align === 'center') {
            return (
              <motion.figure
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="clear-both my-8"
              >
                <img src={block.src} alt={block.caption || ''} className="w-full rounded-2xl" />
                {block.caption && <figcaption className="text-center text-sm mt-2" style={{ color: 'var(--text-muted)' }}>{block.caption}</figcaption>}
              </motion.figure>
            );
          }
          const isLeft = block.align === 'left';
          return (
            <motion.figure
              key={i}
              initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`w-full sm:w-64 my-2 ${isLeft ? 'sm:float-left sm:mr-6' : 'sm:float-right sm:ml-6'}`}
            >
              <img src={block.src} alt={block.caption || ''} className="w-full rounded-2xl" />
              {block.caption && <figcaption className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>{block.caption}</figcaption>}
            </motion.figure>
          );
        }

        return (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {block.text}
          </motion.p>
        );
      })}
    </div>
  );
}
