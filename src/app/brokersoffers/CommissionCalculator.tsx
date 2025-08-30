import cls from "./index.module.scss";
import CalculatorCard from "../../components/Lib/CommissionCalculator/CalculatorCard";

type Props = {
  className?: string;
};

export default function CommissionCalculatorSection({ className }: Props) {
  return (
    <section className={`${cls.wrapcalculator} ${className || ""}`}>
      <div className={cls.left}>
        <span className={cls.badge}>
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
            <path fill="currentColor" d="M12 2l7 3v6c0 5-3.8 9.7-7 11c-3.2-1.3-7-6-7-11V5l7-3z"/>
          </svg>
          Commission Calculator
        </span>

        <h2 className={cls.title}>
          Calculate Your True Earnings Potential
        </h2>
        <p className={cls.text}>
          See how much more you could earn with our revolutionary commission structure
        </p>
      </div>

      <div className={cls.right}>
        <CalculatorCard />
      </div>
    </section>
  );
}
