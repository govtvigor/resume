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
  size?: "sm" | "md" | "section";
};

export function AnimatedSun({ className, size = "md" }: AnimatedSunProps) {
  const scale =
    size === "sm"
      ? "scale-[0.72]"
      : size === "section"
        ? "scale-[0.88] min-[480px]:scale-[0.95] sm:scale-100 md:scale-[1.05] lg:scale-[1.1] xl:scale-[1.15] 2xl:scale-[1.2]"
        : "scale-100";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-visible py-4",
        scale,
        className
      )}
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
