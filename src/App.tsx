import { motion } from "framer-motion";

function App() {
  return (
    <>
      <SpringBalls />
      <SpringComplex />
    </>
  );
}

function SpringBalls() {
  return (
    <div style={{ marginBottom: 50 }}>
      {[0, 0.25, 0.5, 0.75, 1].map((bounce) => (
        <div key={bounce}>
          spring bounce: {bounce}
          <motion.div
            style={{
              width: 30,
              height: 30,
              background: `#${Math.floor(255 * bounce)
                .toString(16)
                .padStart(2, "0")}0000`,
              borderRadius: 1000,
              marginBottom: 10,
            }}
            initial={{ translateX: 0 }}
            animate={{ translateX: 100 }}
            transition={{
              type: "spring",
              bounce,
              repeatType: "mirror",
              duration: 2,
              repeat: Infinity,
            }}
          />
        </div>
      ))}
    </div>
  );
}

function SpringComplex() {
  return (
    <div style={{ marginBottom: 50 }}>
      <div style={{ marginBottom: 10 }}>
        translateX, scale, rotate, bounce 0.6
        <motion.div
          style={{
            width: 30,
            height: 30,
            background: "red",
          }}
          initial={{ translateX: 0, scale: 1, rotate: 0 }}
          animate={{ translateX: 100, scale: 2, rotate: 360 }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 2,
            type: "spring",
            bounce: 0.6,
          }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        opacity, scale, bounce 0.6 (opacity の影響で色が少し明滅する)
        <motion.div
          style={{ width: 30, height: 30, background: "red" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 4,
            type: "spring",
            bounce: 0.8,
          }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        opacity, scale, bounce 0.6 (opacity だけ bounce 0)
        <motion.div
          style={{ width: 30, height: 30, background: "red" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            default: {
              repeat: Infinity,
              repeatType: "mirror",
              duration: 4,
              type: "spring",
              bounce: 0.8,
            },
            opacity: {
              type: "spring",
              bounce: 0,
              repeat: Infinity,
              repeatType: "mirror",
              duration: 4,
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
