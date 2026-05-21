import { cn } from "@/lib/utils";
import styles from "./animated-sun.module.css";

function TwinkleStar({ className }: { className: string }) {
  return (
    <div className={cn(styles.star, className)} aria-hidden>
      <div className={styles.curvedCornerStar}>
        <div className={styles.curvedCornerStar}>
          <div className={cn(styles.corner, styles.cornerBr)} />
          <div className={cn(styles.corner, styles.cornerBl)} />
        </div>
        <div className={styles.curvedCornerStar}>
          <div className={cn(styles.corner, styles.cornerTr)} />
          <div className={cn(styles.corner, styles.cornerTl)} />
        </div>
      </div>
    </div>
  );
}

type AnimatedSunProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function AnimatedSun({ className, size = "md" }: AnimatedSunProps) {
  const scale =
    size === "sm"
      ? "scale-[0.72]"
      : size === "lg"
        ? "scale-[1.35] md:scale-[1.5]"
        : "scale-100";

  return (
    <div
      className={cn("relative flex items-center justify-center", scale, className)}
      aria-hidden
    >
      <div className={styles.banner}>
        <TwinkleStar className={styles.star1} />
        <TwinkleStar className={styles.star2} />
        <TwinkleStar className={styles.star3} />
        <TwinkleStar className={styles.star4} />
        <TwinkleStar className={styles.star5} />
        <TwinkleStar className={styles.star6} />
        <TwinkleStar className={styles.star7} />
        <div className={styles.disc} />
      </div>
    </div>
  );
}
