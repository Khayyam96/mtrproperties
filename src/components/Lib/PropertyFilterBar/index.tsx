"use client";

import { FC } from "react";
import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import classNames from "classnames";
import "./index.scss";

const { Text } = Typography;

type Option = { label: string; value: string | number };

export type PropertyFilterValues = {
  developer?: string | number;
  propertyType?: string | number;
  location?: string;
};

type Props = {
  developers?: Option[];
  propertyTypes?: Option[];
  initialValues?: PropertyFilterValues;
  loading?: boolean;
  className?: string;
  onSubmit?: (values: PropertyFilterValues) => void;
};

const defaultDevelopers: Option[] = [
  { label: "Any", value: "" },
  { label: "Emaar", value: "emaar" },
  { label: "Meraas", value: "meraas" },
  { label: "DAMAC", value: "damac" },
];

const defaultPropertyTypes: Option[] = [
  { label: "Any", value: "" },
  { label: "Apartment", value: "apartment" },
  { label: "Villa", value: "villa" },
  { label: "Townhouse", value: "townhouse" },
  { label: "Land", value: "land" },
];

export const PropertyFilterBar: FC<Props> = ({
  developers = defaultDevelopers,
  propertyTypes = defaultPropertyTypes,
  initialValues,
  loading,
  className,
}) => {
  const [form] = Form.useForm<PropertyFilterValues>();

  return (
    <div className={classNames("filter-bar", className)}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
      >
        <Row gutter={[16, 16]} align="bottom" wrap>
          <Col xs={24} md={6}>
            <Text className="field-label">Developer</Text>
            <Form.Item name="developer" className="mb0">
              <Select
                options={developers}
                defaultValue={developers?.[0]?.value}
                popupMatchSelectWidth={280}
                allowClear
                className="control"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Text className="field-label">Property Type</Text>
            <Form.Item name="propertyType" className="mb0">
              <Select
                options={propertyTypes}
                defaultValue={propertyTypes?.[0]?.value}
                popupMatchSelectWidth={280}
                allowClear
                className="control"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Text className="field-label">Search Location</Text>
            <Form.Item name="location" className="mb0">
              <Input
                className="control"
                placeholder="Enter the location"
                allowClear
                onPressEnter={() => form.submit()}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={4} className="btn-col">
            <Button
              type="primary"
              htmlType="submit"
              className="filter-btn"
              loading={loading}
              block
            >
              Filter Now
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PropertyFilterBar;
