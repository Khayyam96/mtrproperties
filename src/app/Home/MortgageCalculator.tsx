"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, Select, InputNumber, Slider, Button, Form, Input, Space, Typography, Row, Col, Divider } from "antd"
import { DownloadOutlined, WhatsAppOutlined, MailOutlined } from "@ant-design/icons"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import "./index.scss"

const { Title, Text } = Typography
const { Option } = Select

interface MortgageData {
  propertyPrice: number
  interestRate: number
  downPaymentPercentage: number
  loanDuration: number
  currency: string
  residencyStatus: string
}

interface ContactForm {
  name: string
  email: string
  phone: string
}

const MortgageCalculator: React.FC = () => {
  const [mortgageData, setMortgageData] = useState<MortgageData>({
    propertyPrice: 1200000,
    interestRate: 4.75,
    downPaymentPercentage: 25,
    loanDuration: 15,
    currency: "AED",
    residencyStatus: "resident",
  })

  const [contactForm] = Form.useForm()
  const [calculations, setCalculations] = useState({
    mortgageAmount: 0,
    downPayment: 0,
    monthlyPayment: 0,
    totalRepayment: 0,
    interestAmount: 0,
    eligibleSalary: 0,
  })

  const interestRates = [
    { label: "3.95%", value: 3.95, period: "3 years Fixed" },
    { label: "3.99%", value: 3.99, period: "5 years Fixed" },
    { label: "4.75%", value: 4.75, period: "Variable" },
  ]

  const calculateMortgage = () => {
    const { propertyPrice, interestRate, downPaymentPercentage, loanDuration } = mortgageData

    const downPayment = (propertyPrice * downPaymentPercentage) / 100
    const mortgageAmount = propertyPrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanDuration * 12

    const monthlyPayment =
      (mortgageAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
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
  }, [mortgageData])

  const handleInputChange = (field: keyof MortgageData, value: any) => {
    setMortgageData((prev) => ({ ...prev, [field]: value }))
  }

  const adjustInterestRate = (increment: boolean) => {
    const newRate = increment
      ? Math.min(mortgageData.interestRate + 0.25, 15)
      : Math.max(mortgageData.interestRate - 0.25, 1)
    handleInputChange("interestRate", newRate)
  }

  const pieData = [
    { name: "Mortgage Amount", value: calculations.mortgageAmount, color: "#52c41a" },
    { name: "Interest Amount", value: calculations.interestAmount, color: "#1890ff" },
  ]

  const formatCurrency = (amount: number) => {
    return `৳ ${Math.round(amount).toLocaleString()}`
  }

  const handleContactSubmit = (values: ContactForm) => {
    console.log("Contact form submitted:", values)
  }

  return (
    <div className="mortgage-calculator">
      {/* Header Section */}
      <div className="mortgage-calculator__header">
        <Title level={2} className="title">
          Mortgage Calculator
        </Title>
        <Text className="description">
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
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="chart-labels">
                      <div className="chart-label down-payment">
                        <div className="label-box">Down Payment</div>
                        <div className="label-value">৳ {calculations.downPayment.toLocaleString()}</div>
                      </div>
                      <div className="chart-label mortgage-amount">
                        <div className="label-box">Mortgage Amount</div>
                        <div className="label-value">৳ {calculations.mortgageAmount.toLocaleString()}</div>
                      </div>
                      <div className="chart-label interest-amount">
                        <div className="label-box">Interest Amount</div>
                        <div className="label-value">৳ {calculations.interestAmount.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="total-repayment">
                    <div className="total-amount">{formatCurrency(calculations.totalRepayment)}</div>
                    <div className="total-label">Total Repayment</div>
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
                            onChange={(value) => handleInputChange("propertyPrice", value || 0)}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, ""))}
                            controls={false}
                            className="price-input"
                          />
                          <span className="currency-suffix">{mortgageData.currency}</span>
                        </div>
                        <Text className="input-description">Price of the property</Text>
                      </div>
                    </Col>

                    <Col xs={24} sm={12}>
                      <div className="input-group">
                        <Text className="input-label">Interest rate</Text>
                        <div className="rate-input-container">
                          <Button className="rate-btn minus" onClick={() => adjustInterestRate(false)}>
                            −
                          </Button>
                          <div className="rate-display">
                            <span className="rate-number">{mortgageData.interestRate}</span>
                            <span className="rate-percent">%</span>
                          </div>
                          <Button className="rate-btn plus" onClick={() => adjustInterestRate(true)}>
                            +
                          </Button>
                        </div>
                        <Text className="input-description">Interest rates will varies according to the banks</Text>
                      </div>
                    </Col>

                  </Row>

                  <div className="sliders-container">
                    <div className="slider-group">
                      <div className="slider-header">
                        <Text className="slider-label">Down payment ({mortgageData.downPaymentPercentage}%)</Text>
                        <Text className="slider-value">
                          {mortgageData.currency} {calculations.downPayment.toLocaleString()}
                        </Text>
                      </div>
                      <Slider
                        value={mortgageData.downPaymentPercentage}
                        onChange={(value) => handleInputChange("downPaymentPercentage", value)}
                        min={20}
                        max={50}
                        step={5}
                        className="custom-slider"
                      />
                      <Text className="slider-description">
                        A percentage of the home price paid up front and in cash. Usually at least 20%
                      </Text>
                    </div>

                    <div className="slider-group">
                      <div className="slider-header">
                        <Text className="slider-label">Loan duration</Text>
                        <Text className="slider-value">{mortgageData.loanDuration} Years</Text>
                      </div>
                      <Slider
                        value={mortgageData.loanDuration}
                        onChange={(value) => handleInputChange("loanDuration", value)}
                        min={5}
                        max={25}
                        step={1}
                        className="custom-slider"
                      />
                      <Text className="slider-description">
                        The number of years you wish to take the loan over, maximum 25 years or to a maximum age of 65
                        for employees, and 70 for self-employed individuals.
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
            <div className="interest-rates">
              {interestRates.map((rate, index) => (
                <div
                  key={index}
                  className={`rate-card ${mortgageData.interestRate === rate.value ? "active" : ""}`}
                  onClick={() => handleInputChange("interestRate", rate.value)}
                >
                  <div className="rate-value">{rate.label}</div>
                  <div className="rate-period">{rate.period}</div>
                </div>
              ))}
            </div>
          </div>
          <Card className="sidebar-card">
            <div className="monthly-payment">
              <Text className="payment-label">
                Monthly repayment with <strong>{mortgageData.interestRate}%</strong> interest rate
              </Text>
              <div className="payment-amount">{formatCurrency(calculations.monthlyPayment)}</div>
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
                    <Select defaultValue="+971" style={{ width: 80 }}>
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

      {/* Summary Section */}
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
          * this calculator will be providing you only approximate calculation every rates will be depends on the eibor
          rates
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
  )
}

export default MortgageCalculator
