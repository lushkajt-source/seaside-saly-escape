import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open(
      "https://wa.me/447777737080?text=Hello%20I%20would%20like%20to%20book%20a%20room%20at%20Saly%20Hotel",
      "_blank"
    );
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
      style={{
        background: "#25D366",
        animation: "whatsapp-pulse 2s ease-in-out infinite",
      }}
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" />
      <style>{`
        @keyframes whatsapp-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
          50% { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
        }
      `}</style>
    </button>
  );
};

export default WhatsAppButton;
