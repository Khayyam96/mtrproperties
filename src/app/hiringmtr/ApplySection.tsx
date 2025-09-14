"use client";

import { FC, useMemo, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Card,
  Space,
  Button,
  Form,
  Input,
  Select,
  Upload,
  message,
} from "antd";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import {
  UserAddOutlined,
  FileTextOutlined,
  AuditOutlined,
  PhoneOutlined,
  TeamOutlined,
  StarFilled,
  HomeOutlined,
  InboxOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

type Step = { title: string; desc: string; icon: React.ReactNode };
type AreaOption = { label: string; value: string };

type ApplicationFormValues = {
  name: string;
  email: string;
  phone: string;
  experience: string;
  area: string;
  company?: string;
  resume?: UploadFile[];
};

type SubmitPayload = Omit<ApplicationFormValues, "resume"> & {
  resume: UploadFile | null;
};

type Props = {
  heading?: string;
  subheading?: string;
  steps?: Step[];
  areas?: AreaOption[];
  experienceOptions?: string[];
  onSubmit?: (values: SubmitPayload) => void;
  className?: string;
};

const defaultSteps: Step[] = [
  {
    title: "Submit Application",
    desc: "Complete the form and upload your resume",
    icon: <FileTextOutlined />,
  },
  {
    title: "Initial Review",
    desc: "Our team reviews your application",
    icon: <AuditOutlined />,
  },
  {
    title: "Phone Interview",
    desc: "Brief phone call to discuss opportunity",
    icon: <PhoneOutlined />,
  },
  {
    title: "In-Person Meeting",
    desc: "Meet the team and tour our office",
    icon: <HomeOutlined />,
  },
  {
    title: "Welcome Aboard",
    desc: "Meet the team and tour our office",
    icon: <StarFilled />,
  },
  {
    title: "Team Onboarding",
    desc: "Tools, training, and go-live plan",
    icon: <TeamOutlined />,
  },
];

const defaultAreas: AreaOption[] = [
  { label: "Downtown Dubai", value: "downtown" },
  { label: "Palm Jumeirah", value: "palm" },
  { label: "Dubai Marina", value: "marina" },
  { label: "Business Bay", value: "business-bay" },
  { label: "Dubai Hills", value: "dubai-hills" },
];

const defaultExperience = ["0–1 Years", "1–2 Years", "3–5 Years", "5+ Years"];

const ApplySection: FC<Props> = ({
  heading = "Ready to Join Our Team?",
  subheading = `Take the first step towards an exciting career with MTR Properties. Our streamlined
application process gets you started in just a few minutes.`,
  steps,
  areas,
  experienceOptions,
  onSubmit,
  className,
}) => {
  const STEPS = useMemo(() => steps ?? defaultSteps, [steps]);
  const AREAS = useMemo(() => areas ?? defaultAreas, [areas]);
  const EXPS = useMemo(
    () => experienceOptions ?? defaultExperience,
    [experienceOptions]
  );

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    const isAllowed =
      file.type === "application/pdf" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword";
    if (!isAllowed) {
      message.error("Only PDF, DOC, DOCX files are allowed.");
      return Upload.LIST_IGNORE;
    }
    const isLt5mb = file.size ? file.size / 1024 / 1024 < 5 : true;
    if (!isLt5mb) {
      message.error("File must be smaller than 5MB.");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const normFile = (
    e: UploadFile[] | { fileList: UploadFile[] } | undefined
  ): UploadFile[] | undefined => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const handleSubmit = (values: ApplicationFormValues) => {
    const payload: SubmitPayload = {
      ...values,
      resume: fileList?.[0] ?? null,
    };
    if (onSubmit) {
      onSubmit(payload);
    } else {
    }
    message.success("Application submitted!");
  };

  return (
    <section className={`${styles.apply} ${className || ""}`}>
      <div className={styles.container}>
        <Row gutter={[32, 32]} align="top">
          <Col xs={24} lg={12}>
            <Space className={styles.pill} size={8}>
              <UserAddOutlined />
              <Text strong>Apply Now</Text>
            </Space>

            <Title level={1} className={styles.h1}>
              {heading}
            </Title>
            <Paragraph className={styles.lead}>{subheading}</Paragraph>

            <Title level={4} className={styles.processTitle}>
              Application Process
            </Title>

            <Row gutter={[20, 20]}>
              {STEPS.map((s, i) => (
                <Col key={i} xs={24} sm={12} md={8}>
                  <Card className={styles.stepCard} bordered>
                    <div className={styles.stepIcon}>{s.icon}</div>
                    <Text strong className={styles.stepTitle}>
                      {s.title}
                    </Text>
                    <Paragraph className={styles.stepDesc}>{s.desc}</Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          <Col xs={24} lg={12}>
            <Card className={styles.formCard} bordered>
              <Title level={4} className={styles.formHeading}>
                Application Form
              </Title>

              <Form<ApplicationFormValues>
                name="application-form"
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark="optional"
                initialValues={{
                  area: AREAS[0]?.value,
                  experience: EXPS[1],
                }}
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Full Name"
                      name="name"
                      rules={[{ required: true, message: "Please enter name" }]}
                    >
                      <Input placeholder="eg: John" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Please enter email" },
                        { type: "email", message: "Enter a valid email" },
                      ]}
                    >
                      <Input placeholder="eg: john@email.com" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Phone Number"
                      name="phone"
                      rules={[{ required: true, message: "Please enter phone" }]}
                    >
                      <Input placeholder="eg: +971 09091029" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Experience Level"
                      name="experience"
                      rules={[
                        { required: true, message: "Select experience level" },
                      ]}
                    >
                      <Select placeholder="Select">
                        {EXPS.map((e) => (
                          <Option key={e} value={e}>
                            {e}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Preferred Area"
                      name="area"
                      rules={[{ required: true, message: "Select area" }]}
                    >
                      <Select placeholder="Choose area">
                        {AREAS.map((a) => (
                          <Option key={a.value} value={a.value}>
                            {a.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Current Company" name="company">
                      <Input placeholder="Current Employer (optional)" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label="Upload Resume/CV"
                      name="resume"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      rules={[
                        {
                          required: true,
                          message: "Please upload your resume (PDF/DOC/DOCX)",
                        },
                      ]}
                    >
                      <Dragger
                        multiple={false}
                        beforeUpload={beforeUpload}
                        fileList={fileList}
                        onChange={({ fileList }) =>
                          setFileList(fileList.slice(-1))
                        }
                        maxCount={1}
                        accept=".pdf,.doc,.docx"
                        customRequest={({ onSuccess }) =>
                          setTimeout(() => onSuccess && onSuccess("ok"), 0)
                        }
                        className={styles.dragger}
                      >
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                          Click to upload or drag and drop
                        </p>
                        <p className="ant-upload-hint">
                          Supported Formats : PDF, DOC, DOCX (max 5MB)
                        </p>
                      </Dragger>
                    </Form.Item>
                  </Col>
                </Row>

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  icon={<ArrowRightOutlined />}
                  className={styles.submitBtn}
                  block
                >
                  Submit Application
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ApplySection;
