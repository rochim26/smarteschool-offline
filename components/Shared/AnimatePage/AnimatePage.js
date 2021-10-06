import { motion } from 'framer-motion'

const AnimatePage = ({ children }) => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      {children}
    </motion.div>
  )
}

export default AnimatePage