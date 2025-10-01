"use client";

import React, { useMemo, useRef, useState } from "react";
import { Button, InputNumber, Select, Slider, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "./index.scss";

type Props = {
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  onChange?: (range: [number, number]) => void;
  currency?: string; // "AED"
  label?: string;    // "Price - Min–Max"
  placeholder?: string;
  width?: number | string;
};

const fmt = (v?: number | string) =>
  (v ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const parse = (v?: string) => Number((v ?? "0").replace(/[^\d]/g, "")) || 0;

const PriceSelect: React.FC<Props> = ({
  min = 0,
  max = 10_000_000,
  step = 10_000,
  value,
  onChange,
  currency = "AED",
  label = "Price - Min–Max",
  placeholder = "Price (Min–Max)",
  width = 280,
}) => {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState<[number, number]>(value ?? [min, max]);
  const [minV, maxV] = internal;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const displayText = useMemo(() => {
    const [a, b] = value ?? internal;
    return `${currency} ${fmt(a)} — ${fmt(b)}`;
  }, [value, internal, currency]);

  const commit = (next: [number, number]) => {
    setInternal(next);
    onChange?.(next);
  };

  const handleSlider = (val: number | number[]) => {
    if (!Array.isArray(val)) return;
    const [a0, b0] = val;
    const a = Math.max(min, Math.min(a0, b0));
    const b = Math.min(max, Math.max(a0, b0));
    setInternal([a, b]);
  };

  const apply = () => {
    commit(internal);
    setOpen(false);
  };

  const reset = () => {
    setInternal([min, max]);
  };

  return (
    <div ref={containerRef} style={{ width }}>
      <Select
        className="price-select"
        value="__custom__"                 
        onSelect={() => setOpen(true)}
        open={open}
        onDropdownVisibleChange={setOpen}
        showSearch={false}
        dropdownMatchSelectWidth={true}
        suffixIcon={<DownOutlined />}
        options={[{ value: "__custom__", label: displayText }]} 
        tagRender={() => <></>} 
        onChange={() => {}}
        placeholder={placeholder}
        dropdownRender={() => (
          <div className="pr-drop">
            <Typography.Text className="pr-head">{label}</Typography.Text>

            <div className="pr-box">
              <div className="pr-inputs">
                <div className="pr-input">
                  <label>Minimum Price</label>
                  <InputNumber
                    className="pr-number"
                    value={minV}
                    min={min}
                    max={max}
                    step={step}
                    formatter={(v) => fmt(v ?? 0)}
                    parser={(v) => parse(v)}
                    onChange={(v) => {
                      const n = Math.max(min, Math.min(parse(String(v ?? 0)), maxV));
                      setInternal([n, maxV]);
                    }}
                    controls={false}
                    size="large"
                  />
                </div>

                <div className="pr-input">
                  <label>Maximum Price</label>
                  <InputNumber
                    className="pr-number"
                    value={maxV}
                    min={min}
                    max={max}
                    step={step}
                    formatter={(v) => fmt(v ?? 0)}
                    parser={(v) => parse(v)}
                    onChange={(v) => {
                      const n = Math.min(max, Math.max(parse(String(v ?? 0)), minV));
                      setInternal([minV, n]);
                    }}
                    controls={false}
                    size="large"
                  />
                </div>
              </div>

              <div className="pr-minihead">
                <span>Min. Price</span>
                <span>Max. Price</span>
              </div>

              <Slider
                className="pr-slider"
                range
                min={min}
                max={max}
                step={step}
                tooltip={{ formatter: (v) => fmt(v ?? 0) }}
                value={internal}
                onChange={handleSlider}
              />

              <div className="pr-foot">
                <span className="pr-val">{fmt(minV)}</span>
                <span className="pr-currency">{currency}</span>
                <span className="spacer" />
                <span className="pr-currency">{currency}</span>
                <span className="pr-val">{fmt(maxV)}</span>
              </div>

              <div className="pr-actions">
                <Button onClick={reset}>Reset</Button>
                <div className="gap" />
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="primary" onClick={apply}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default PriceSelect;
