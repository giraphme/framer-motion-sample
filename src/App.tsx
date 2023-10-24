import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

function App() {
  return (
    <>
      <SpringBalls />
      <SpringComplex />
      <AddCard />
      <HomeBadge />
      <AnimatedIcons />
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

function AddCard() {
  const [isOpen, setOpen] = useState(false);

  return (
    <motion.div
      style={{
        marginBottom: 50,
        display: "flex",
        border: "1px solid #ccc",
        borderRadius: 5,
        padding: "10px 40px 10px 20px",
        width: "fit-content",
        position: "relative",
        whiteSpace: "nowrap",
      }}
      variants={{
        open: {
          cursor: "default",
          width: "300px",
        },
        close: {
          cursor: "pointer",
        },
      }}
      animate={isOpen ? "open" : "close"}
      onClick={() => !isOpen && setOpen(true)}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            style={{ opacity: 1, display: "flex", width: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <input
              type="text"
              placeholder="タグ名"
              style={{
                fontSize: "16px",
                border: "none",
                outline: "none",
                padding: 0,
                display: "block",
                height: "1.5rem",
                flexGrow: 1,
                width: "100%",
              }}
              autoFocus
            />
            <button style={{ flexShrink: 1 }}>登録</button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            タグを追加
          </motion.div>
        )}
      </AnimatePresence>

      <motion.svg
        height="24"
        viewBox="0 -960 960 960"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", right: "5px" }}
        variants={{
          open: {
            cursor: "pointer",
            rotate: 315,
          },
          close: { rotate: -180 },
        }}
        transition={{
          type: "spring",
          bounce: 0.3,
          duration: 1,
        }}
        onClick={() => isOpen && setOpen(false)}
      >
        <path d="m440-440h-240v-80h240v-240h80v240h240v80h-240v240h-80z" />
      </motion.svg>
    </motion.div>
  );
}

function HomeBadge() {
  return (
    <div style={{ marginBottom: 50 }}>
      描画領域に入った時にアニメーション開始
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 20px 5px #55555521",
          border: "1px solid #ddd",
          marginLeft: 32,
          position: "relative",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: -2,
            right: -2,
            fontSize: "12px",
            width: "20px",
            height: "20px",
            background: "red",
            color: "white",
            fontWeight: "bolder",
            borderRadius: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          initial={{ opacity: 0, scale: 0, translateY: 10, translateX: -10 }}
          whileInView={{ opacity: 1, scale: 1, translateY: 0, translateX: 0 }}
          transition={{
            type: "spring",
            bounce: 0.7,
            delay: 0.5,
          }}
          viewport={{ once: true }}
        >
          3
        </motion.div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
        </svg>
      </div>
    </div>
  );
}

function AnimatedIcons() {
  return (
    <div style={{ marginBottom: 50 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        style={{
          marginRight: 24,
        }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.rect
          width="9"
          height="6"
          x="6"
          y="14"
          rx="2"
          initial={{ translateX: "15%" }}
          animate={{ translateX: "0" }}
          transition={{
            duration: 0.2,
            delay: 1,
            repeat: Infinity,
            repeatDelay: 2,
            repeatType: "mirror",
          }}
        />
        <rect width="16" height="6" x="6" y="4" rx="2" />
        <path d="M2 2v20" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        style={{
          marginRight: 24,
        }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="6" height="16" x="4" y="6" rx="2" />
        <motion.rect
          width="6"
          height="9"
          x="14"
          y="6"
          rx="2"
          initial={{ translateY: "15%" }}
          animate={{ translateY: "0" }}
          transition={{
            duration: 0.2,
            delay: 1,
            repeat: Infinity,
            repeatDelay: 2,
            repeatType: "mirror",
          }}
        />
        <path d="M22 2H2" />
      </svg>

      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        style={{
          marginRight: 24,
        }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: [0, 8, -6, 4, -2, 1, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        <circle cx="12" cy="13" r="8" />
        <motion.path
          d="M5 3 2 6"
          style={{ originX: "center", originY: "center" }}
          initial={{ rotate: 3 }}
          animate={{ rotate: -3 }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 0,
          }}
        />
        <motion.path
          d="m22 6-3-3"
          style={{ originX: "center", originY: "center" }}
          initial={{ rotate: 3 }}
          animate={{ rotate: -3 }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 0,
          }}
        />
        <path d="M6.38 18.7 4 21" />
        <path d="M17.64 18.67 20 21" />
        <path d="m9 13 2 2 4-4" />
      </motion.svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        style={{
          marginRight: 24,
        }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <motion.g
          style={{ originX: "center", originY: "center" }}
          initial={{ opacity: 0, rotateX: 180, translateX: -10 }}
          animate={{ opacity: 1, rotateX: 0, translateX: 0 }}
          transition={{
            type: "spring",
            bounce: 0.5,
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1,
            opacity: { bounce: 0 },
          }}
        >
          <path d="M8 12h8" />
          <path d="m12 16 4-4-4-4" />
        </motion.g>
      </svg>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        style={{
          marginRight: 24,
        }}
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ stroke: "#333333" }}
        animate={{ stroke: "#aaaaaa" }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: "mirror",
          repeatDelay: 1.5,
        }}
      >
        <rect width="20" height="12" x="2" y="6" rx="6" ry="6" />
        <motion.circle
          cx="8"
          cy="12"
          r="2"
          initial={{ translateX: "35%", fill: "#ff0000ff" }}
          animate={{ translateX: "0%", fill: "#ff000000" }}
          transition={{
            type: "spring",
            duration: 0.5,
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 1.2,
          }}
        />
      </motion.svg>
    </div>
  );
}

export default App;
