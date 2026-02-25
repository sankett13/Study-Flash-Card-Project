import { FcGoogle } from "react-icons/fc";

interface GoogleAuthButtonProps {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function GoogleAuthButton({
  text = "Continue with Google",
  onClick,
  disabled = false,
}: GoogleAuthButtonProps) {
  const handleGoogleAuth = () => {
    if (onClick) {
      onClick();
      return;
    }

    // Redirect to backend Google OAuth endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleAuth}
      disabled={disabled}
      className={`
        w-full flex items-center justify-center gap-3 px-4 py-3 
        border border-gray-300 rounded-lg font-medium
        transition-all duration-200 
        ${
          disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-50 text-gray-700 hover:border-gray-400 active:scale-95"
        }
      `}
    >
      <FcGoogle className="text-xl" />
      <span>{text}</span>
    </button>
  );
}
