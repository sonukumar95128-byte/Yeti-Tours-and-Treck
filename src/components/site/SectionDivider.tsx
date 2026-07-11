const FLAG_COLORS = ["#4A7A96", "#EDE4D3", "#B5432B", "#3F5D52", "#B08D3E"];

export default function SectionDivider({ tone = "light" }: { tone?: "light" | "dark" }) {
  const borderColor = tone === "dark" ? "rgba(255,255,255,0.25)" : "rgba(32,24,17,0.15)";

  return (
    <div className="flex justify-center items-center gap-1.5 mb-6" aria-hidden="true">
      {FLAG_COLORS.map((color, i) => (
        <span
          key={i}
          className="block w-2.5 h-2.5 rotate-45"
          style={{ backgroundColor: color, border: `1px solid ${borderColor}` }}
        />
      ))}
    </div>
  );
}
