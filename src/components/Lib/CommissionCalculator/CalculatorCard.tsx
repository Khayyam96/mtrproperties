"use client";

import { useMemo, useState } from "react";
import { Card, InputNumber, Typography, Button } from "antd";
import cls from "../../../app/brokersoffers/index.module.scss";

const { Text } = Typography;

const nf = new Intl.NumberFormat("en-US");

function formatAED(n: number) {
  return `AED ${nf.format(Math.max(0, Math.round(n)))}`;
}

export default function CalculatorCard() {
  const [price, setPrice] = useState<number>(2_000_000);
  const [rate, setRate] = useState<number>(5);

  const { other50, mtr90, mtr100 } = useMemo(() => {
    const commission = price * (rate / 100);
    return {
      other50: commission * 0.5,
      mtr90: commission * 0.9,
      mtr100: commission * 1.0,
    };
  }, [price, rate]);

  return (
    <Card className={cls.card} bordered>
      <div className={cls.inputs}>
        <div className={cls.inputItem}>
          <label>Property Sales Price</label>
          <InputNumber
            size="large"
            className={cls.input}
            value={price}
            onChange={(v) => setPrice(Number(v) || 0)}
            prefix={
              <span className={cls.prefix}>
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                  <path fill="currentColor" d="M5 11h9a4 4 0 1 0 0-8H8v2h6a2 2 0 1 1 0 4H5v2zm0 2v2h7a2 2 0 1 1 0 4H8v2h4a4 4 0 1 0 0-8H5z"/>
                </svg>
              </span>
            }
            formatter={(v) =>
              (v ?? "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(v) => Number((v || "").toString().replace(/,/g, ""))}
            min={0}
            step={1000}
          />
        </div>

        <div className={cls.inputItem}>
          <label>Commission Rates (%)</label>
          <InputNumber
            size="large"
            className={cls.input}
            value={rate}
            onChange={(v) => setRate(Number(v) || 0)}
            formatter={(v) => `${v} %`}
            parser={(v) => Number((v || "").toString().replace(/[^\d.]/g, ""))}
            min={0}
            max={100}
            step={0.5}
          />
        </div>
      </div>

      <div className={cls.grid}>
        {/* Other Agencies */}
        <div className={`${cls.col} ${cls.muted}`}>
          <div className={cls.head}>
            <Text strong>Other Agencies</Text>
          </div>
          <div className={`${cls.block} ${cls.blockMuted}`}>
            <div className={cls.big}>50%<br/>Commission</div>
          </div>
          <div className={cls.note}>Don’t you lose your big commission</div>
          <div className={`${cls.amount} ${cls.amountMuted}`}>
            {formatAED(other50)}
          </div>
          <Button className={`${cls.cta} ${cls.ctaMuted}`} size="large">Don’t Lose</Button>
        </div>

        {/* MTR Instant */}
        <div className={`${cls.col} ${cls.primary}`}>
          <div className={cls.head}>
            <Text strong>MTR Instant</Text>
          </div>
          <div className={`${cls.block} ${cls.blockPrimary}`}>
            <div className={cls.big}>90%<br/>Commission</div>
          </div>
          <div className={cls.note}>
            Instant Pay – No need to wait for 1–6 months
          </div>
          <div className={`${cls.amount} ${cls.amountPrimary}`}>
            {formatAED(mtr90)}
          </div>
          <Button type="primary" className={`${cls.cta} ${cls.ctaPrimary}`} size="large">
            Get It Now
          </Button>
        </div>

        {/* MTR Wait */}
        <div className={`${cls.col} ${cls.purple}`}>
          <div className={cls.head}>
            <Text strong>MTR Wait</Text>
          </div>
          <div className={`${cls.block} ${cls.blockPurple}`}>
            <div className={cls.big}>100%<br/>Commission</div>
          </div>
          <div className={cls.note}>
            Waiting Required – When developer pays us
          </div>
          <div className={`${cls.amount} ${cls.amountPurple}`}>
            {formatAED(mtr100)}
          </div>
          <Button className={`${cls.cta} ${cls.ctaPurple}`} size="large">
            I’ll Wait
          </Button>
        </div>
      </div>
    </Card>
  );
}
