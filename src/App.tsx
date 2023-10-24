import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

function App() {
  return (
    <>
      <SpringBalls />
      <SpringComplex />
      <AddCard />
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

export default App;
