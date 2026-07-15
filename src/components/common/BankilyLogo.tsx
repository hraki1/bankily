type Props = {
  className?: string;
};

// Bankily (BPM) brand logo.
export default function BankilyLogo({ className }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Bankily — بنكيلي — PAR BPM"
      className={className}
    />
  );
}
