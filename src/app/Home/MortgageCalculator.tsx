"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Card,
  Select,
  InputNumber,
  Slider,
  Button,
  Form,
  Input,
  Space,
  Typography,
  Row,
  Col,
  Divider,
} from "antd"
import {
  DownloadOutlined,
  WhatsAppOutlined,
  MailOutlined,
} from "@ant-design/icons"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import "./MortgageCalculator.scss"
import { Container } from "@/components/Lib/ProContainer/Container"

const { Title, Text } = Typography
const { Option } = Select

interface MortgageData {
  propertyPrice: number
  interestRate: number
  downPaymentPercentage: number
  loanDuration: number
  currency: string
  residencyStatus: "national" | "resident" | "non-resident"
}

interface ContactForm {
  name: string
  email: string
  phone: string
}

const interestRates = [
  { label: "3.95%", value: 3.95, period: "3 years Fixed" },
  { label: "3.99%", value: 3.99, period: "5 years Fixed" },
  { label: "4.75%", value: 4.75, period: "Variable" },
]

const MortgageCalculator: React.FC = () => {
  const [mortgageData, setMortgageData] = useState<MortgageData>({
    propertyPrice: 1200000,
    interestRate: 4.75,
    downPaymentPercentage: 25,
    loanDuration: 15,
    currency: "AED",
    residencyStatus: "resident",
  })

  const [contactForm] = Form.useForm<ContactForm>()
  const [calculations, setCalculations] = useState({
    mortgageAmount: 0,
    downPayment: 0,
    monthlyPayment: 0,
    totalRepayment: 0,
    interestAmount: 0,
    eligibleSalary: 0,
  })

  const handleInputChange = <K extends keyof MortgageData>(
    field: K,
    value: MortgageData[K]
  ) => setMortgageData((prev) => ({ ...prev, [field]: value }))

  const adjustInterestRate = (increment: boolean) => {
    const newRate = increment
      ? Math.min(mortgageData.interestRate + 0.25, 15)
      : Math.max(mortgageData.interestRate - 0.25, 1)
    handleInputChange("interestRate", newRate)
  }

  const calculateMortgage = () => {
    const { propertyPrice, interestRate, downPaymentPercentage, loanDuration } =
      mortgageData

    const downPayment = (propertyPrice * downPaymentPercentage) / 100
    const mortgageAmount = propertyPrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanDuration * 12

    const monthlyPayment =
      (mortgageAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    const totalRepayment = monthlyPayment * numberOfPayments
    const interestAmount = totalRepayment - mortgageAmount
    const eligibleSalary = monthlyPayment / 0.3

    setCalculations({
      mortgageAmount,
      downPayment,
      monthlyPayment,
      totalRepayment,
      interestAmount,
      eligibleSalary,
    })
  }

  useEffect(() => {
    calculateMortgage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mortgageData])

  // 3 parçalı donut
  const pieData = useMemo(
    () => [
      { name: "Mortgage Amount", value: Math.max(0, calculations.mortgageAmount), color: "#22C55E" }, // yeşil
      { name: "Down Payment", value: Math.max(0, calculations.downPayment), color: "#1E66FF" }, // koyu mavi
      { name: "Interest Amount", value: Math.max(0, calculations.interestAmount), color: "#CFE3FF" }, // açık mavi
    ],
    [
      calculations.mortgageAmount,
      calculations.downPayment,
      calculations.interestAmount,
    ]
  )

  const getCurrencySymbol = (currency: string) => {
    if (currency === "AED") return "د.إ "
    if (currency === "USD") return "$"
    if (currency === "EUR") return "€"
    return ""
  }
  const formatCurrency = (amount: number) =>
    `${getCurrencySymbol(mortgageData.currency)}${Math.round(amount).toLocaleString()}`

  const handleContactSubmit = (values: ContactForm) => {
    console.log("Contact form submitted:", values)
  }

  return (
    <div className="mortgage-calculator">
      <Container>
        <div className="all-content">
          <div className="mortgage-calculator__header">
            <Title level={2} className="mc-title">Mortgage Calculator</Title>
            <Text className="mc-desc">
              Calculate your estimated mortgage payments by adjusting the loan amount, interest rate, and loan term.
            </Text>

            <div className="currency-selector">
              <Text className="currency-label">Select your preferred Currency</Text>
              <Select
                value={mortgageData.currency}
                onChange={(value) => handleInputChange("currency", value)}
                className="currency-select"
                suffixIcon={<span className="dropdown-arrow">▼</span>}
              >
                <Option value="AED">AED</Option>
                <Option value="USD">USD</Option>
                <Option value="EUR">EUR</Option>
              </Select>
            </div>
          </div>

          <Row gutter={[32, 32]} className="main-content">
            <Col xs={24} lg={16}>
              <div className="residency-section">
                <Text className="section-title">UAE Residency Status</Text>
                <div className="residency-options">
                  <Button
                    className={`residency-btn ${mortgageData.residencyStatus === "national" ? "active" : ""}`}
                    onClick={() => handleInputChange("residencyStatus", "national")}
                  >
                    National
                  </Button>
                  <Button
                    className={`residency-btn ${mortgageData.residencyStatus === "resident" ? "active" : ""}`}
                    onClick={() => handleInputChange("residencyStatus", "resident")}
                  >
                    Resident
                  </Button>
                  <Button
                    className={`residency-btn ${mortgageData.residencyStatus === "non-resident" ? "active" : ""}`}
                    onClick={() => handleInputChange("residencyStatus", "non-resident")}
                  >
                    Non-Resident
                  </Button>
                </div>
              </div>

              <Row gutter={[32, 32]} className="middle-section">
                <Col xs={24} md={12}>
                  <div className="chart-section">
                    <div className="chart-card">
                      <ResponsiveContainer width="100%" height={260}>
                        <PieChart>
                          <Pie
                            key={`${calculations.mortgageAmount}-${calculations.downPayment}-${calculations.interestAmount}`}
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={62}
                            outerRadius={105}
                            paddingAngle={2}
                            dataKey="value"
                            isAnimationActive={false}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>

                      {/* Etiket kutuları */}
                      <div className="chart-labels">
                        <div className="chart-label dp">
                          <div className="lbl">Down Payment</div>
                          <div className="val">{formatCurrency(calculations.downPayment)}</div>
                        </div>
                        <div className="chart-label ma">
                          <div className="lbl">Mortgage Amount</div>
                          <div className="val">{formatCurrency(calculations.mortgageAmount)}</div>
                        </div>
                        <div className="chart-label ia">
                          <div className="lbl">Interest Amount</div>
                          <div className="val">{formatCurrency(calculations.interestAmount)}</div>
                        </div>
                      </div>
                    </div>

                    <div className="total-repayment">
                      <div className="amount">{formatCurrency(calculations.totalRepayment)}</div>
                      <div className="caption">Total Repayment</div>
                    </div>
                  </div>
                </Col>

                <Col xs={24} md={12}>
                  <div className="inputs-section">
                    <Row gutter={[16, 16]} className="input-row">
                      <Col xs={24} sm={12}>
                        <div className="input-group">
                          <Text className="input-label">Property price</Text>
                          <div className="property-input">
                            <InputNumber
                              value={mortgageData.propertyPrice}
                              onChange={(value) => handleInputChange("propertyPrice", value ?? 0)}
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, ""))}
                              controls={false}
                              className="price-input"
                            />
                            <span className="currency-suffix">{mortgageData.currency}</span>
                          </div>
                          <Text className="help">Price of the property</Text>
                        </div>
                      </Col>

                      <Col xs={24} sm={12}>
                        <div className="input-group">
                          <Text className="input-label">Interest rate</Text>
                          <div className="rate-input">
                            <Button className="rate-btn minus" onClick={() => adjustInterestRate(false)}>−</Button>
                            <div className="rate-display">
                              <span className="num">{mortgageData.interestRate}</span>
                              <span className="pct">%</span>
                            </div>
                            <Button className="rate-btn plus" onClick={() => adjustInterestRate(true)}>+</Button>
                          </div>
                          <Text className="help">Interest rates will varies according to the banks</Text>
                        </div>
                      </Col>
                    </Row>

                    <div className="sliders">
                      <div className="slider-group">
                        <div className="slider-head">
                          <Text className="label">Down payment ({mortgageData.downPaymentPercentage}%)</Text>
                          <Text className="value">
                            {mortgageData.currency} {calculations.downPayment.toLocaleString()}
                          </Text>
                        </div>
                        <Slider
                          value={mortgageData.downPaymentPercentage}
                          onChange={(v) => handleInputChange("downPaymentPercentage", v)}
                          min={20}
                          max={50}
                          step={5}
                          className="custom-slider"
                        />
                        <Text className="help">
                          A percentage of the home price paid up front and in cash. Usually at least 20%
                        </Text>
                      </div>

                      <div className="slider-group">
                        <div className="slider-head">
                          <Text className="label">Loan duration</Text>
                          <Text className="value">{mortgageData.loanDuration} Years</Text>
                        </div>
                        <Slider
                          value={mortgageData.loanDuration}
                          onChange={(v) => handleInputChange("loanDuration", v)}
                          min={5}
                          max={25}
                          step={1}
                          className="custom-slider"
                        />
                        <Text className="help">
                          The number of years you wish to take the loan over, maximum 25 years or to a maximum age of 65 for employees, and 70 for self-employed individuals.
                        </Text>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col xs={24} lg={8}>
              <div className="interest-rates-section">
                <Text className="section-title">Indicative Interest Rates</Text>
                <div className="rate-list">
                  {interestRates.map((rate) => (
                    <button
                      key={rate.label}
                      className={`rate-card ${mortgageData.interestRate === rate.value ? "active" : ""}`}
                      onClick={() => handleInputChange("interestRate", rate.value)}
                      type="button"
                    >
                      <div className="rate-val">{rate.label}</div>
                      <div className="rate-period">{rate.period}</div>
                    </button>
                  ))}
                </div>
              </div>

              <Card className="sidebar-card">
                <div className="monthly-payment">
                  <Text className="mp-label">
                    Monthly repayment with <strong>{mortgageData.interestRate}%</strong> interest rate
                  </Text>
                  <div className="mp-amount">{formatCurrency(calculations.monthlyPayment)}</div>
                </div>

                <Form form={contactForm} onFinish={handleContactSubmit} layout="vertical" className="contact-form">
                  <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter your name" }]}>
                    <Input placeholder="eg: John Doe" className="form-input" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <Input placeholder="eg: john@email.com" className="form-input" />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: "Please enter your phone number" }]}
                  >
                    <Input
                      addonBefore={
                        <Select defaultValue="+971" style={{ width: 94 }}>
                          <Option value="+971">🇦🇪 +971</Option>
                          <Option value="+1">🇺🇸 +1</Option>
                          <Option value="+44">🇬🇧 +44</Option>
                        </Select>
                      }
                      placeholder="eg: 050123456"
                      className="form-input"
                    />
                  </Form.Item>
                  <Button type="primary" htmlType="submit" block className="consultation-btn">
                    Book a Consultation
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>

          <Card className="summary-card">
            <Row gutter={[24, 24]} className="summary-row">
              <Col xs={12} md={6} lg={4}>
                <div className="summary-item">
                  <Text className="summary-label">Mortgage Amount</Text>
                  <div className="summary-value">{formatCurrency(calculations.mortgageAmount)}</div>
                </div>
              </Col>
              <Col xs={12} md={6} lg={4}>
                <div className="summary-item">
                  <Text className="summary-label">Down Payment</Text>
                  <div className="summary-value">{formatCurrency(calculations.downPayment)}</div>
                </div>
              </Col>
              <Col xs={12} md={6} lg={4}>
                <div className="summary-item">
                  <Text className="summary-label">Monthly repayment</Text>
                  <div className="summary-value">{formatCurrency(calculations.monthlyPayment)}</div>
                </div>
              </Col>
              <Col xs={12} md={6} lg={4}>
                <div className="summary-item">
                  <Text className="summary-label">Interest Amount</Text>
                  <div className="summary-value">{formatCurrency(calculations.interestAmount)}</div>
                </div>
              </Col>
              <Col xs={12} md={6} lg={4}>
                <div className="summary-item">
                  <Text className="summary-label">Eligible Salary</Text>
                  <div className="summary-value">{formatCurrency(calculations.eligibleSalary)}</div>
                </div>
              </Col>
            </Row>

            <Text className="disclaimer">
              * this calculator will be providing you only approximate calculation every rates will be depends on the eibor rates
            </Text>

            <Divider className="action-divider" />
            <div className="action-section">
              <Text className="action-title">Download / Share</Text>
              <Space className="action-buttons">
                <Button type="primary" icon={<DownloadOutlined />} className="download-btn">
                  Download
                </Button>
                <Button icon={<WhatsAppOutlined />} className="whatsapp-btn">
                  Share to Whatsapp
                </Button>
                <Button icon={<MailOutlined />} className="email-btn">
                  Share to Email
                </Button>
              </Space>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  )
}

export default MortgageCalculator
