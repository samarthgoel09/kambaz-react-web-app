
import { FaCheckCircle } from "react-icons/fa";

interface GreenCheckmarkProps {
  className?: string;
}

export default function GreenCheckmark({ className }: GreenCheckmarkProps) {
  return <FaCheckCircle className={className} style={{ color: "green" }} />;
}
