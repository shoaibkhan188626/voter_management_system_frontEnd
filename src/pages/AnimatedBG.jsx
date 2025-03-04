import { motion } from "framer-motion";

const AnimatedBackground = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-gray-900">
    {/* Animated Blobs */}
    {[...Array(4)].map((_, index) => (
      <motion.div
        key={index}
        className="absolute w-60 h-60 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-30 blur-3xl rounded-full"
        animate={{
          x: [0, 100, -100, 0], // Moves left & right
          y: [0, -100, 100, 0], // Moves up & down
          scale: [1, 1.2, 1], // Slight pulsing effect
        }}
        transition={{
          duration: 10 + index * 2, // Different speeds for natural effect
          repeat: Infinity,
          repeatType: "mirror",
          ease: "linear",
        }}
        style={{
          top: `${Math.random() * 100}%`, // Random initial position
          left: `${Math.random() * 100}%`,
        }}
      />
    ))}

    {/* Your Content */}
    <div className="relative z-10">{children}</div>
  </div>
  
  );
};

export default AnimatedBackground;
