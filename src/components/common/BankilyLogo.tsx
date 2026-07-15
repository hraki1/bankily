import Image from "next/image";

type Props = {
  className?: string;
};

// Bankily (BPM) brand logo.
export default function BankilyLogo({ className }: Props) {
  return (
    <Image
      src="/logo.png"
      alt="Bankily — بنكيلي — PAR BPM"
      width={445}
      height={250}
      priority
      className={className}
    />
  );
}
