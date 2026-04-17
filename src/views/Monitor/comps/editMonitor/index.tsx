import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  InputNumber,
  type FormProps,
} from "antd";
import React, { useState } from "react";
import { useEffect } from "react";

const statusOptions = [
  {
    value: 1,
    label: "空闲中",
  },
  {
    value: 2,
    label: "使用中",
  },
  {
    value: 3,
    label: "待维修",
  },
  {
    value: 4,
    label: "维护中",
  },
  {
    value: 5,
    label: "维修中",
  },
];
const cityOptions = [
  {
    value: "天津",
    label: "天津",
  },
  {
    value: "北京",
    label: "北京",
  },
  {
    value: "成都",
    label: "成都",
  },
  {
    value: "安徽",
    label: "安徽",
  },
  {
    value: "唐山",
    label: "唐山",
  },
];
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const { Option } = Select;
type monitorProps<T> = {
  open: boolean;
  row?: T;
  onClose: (flag: boolean, row: FieldType | null) => void;
};
interface FieldType {
  id?: string;
  name: string;
  city: string;
  fast: number;
  slow: number;
  status: number;
  now: number;
  fault: number;
  person: string;
  tel: number;
}
const EditMonitor: React.FC<monitorProps<FieldType>> = (props) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  useEffect(() => {
    if (props.row) {
      form.setFieldsValue({ ...props.row });
    }
    // else {
    //   debugger
    //   form.resetFields();
    // }
  }, [props.row]);
  const onClose = () => {
    form.resetFields();
    props.onClose(false, null);
    setOpen(false);
  };
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log(values);
    debugger;
  };
  return (
    <>
      <Drawer
        title="新增/编辑充电站"
        width={620}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>关闭</Button>
            <Button onClick={onClose} type="primary">
              提交
            </Button>
          </Space>
        }
      >
        <Form
          layout="horizontal"
          onFinish={onFinish}
          form={form}
          {...formItemLayout}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item<FieldType>
                name="name"
                label="充电站名称"
                rules={[{ required: true, message: "请输入充电站名称" }]}
              >
                <Input placeholder="请输入充电站名称" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item<FieldType>
                name="fast"
                label="快充数"
                rules={[{ required: true, message: "请输入快充数" }]}
              >
                <InputNumber
                  min={0}
                  defaultValue={0}
                  suffix="个"
                  style={{ width: "100%" }}
                  placeholder="请输入快充数"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item<FieldType>
                name="city"
                label="所属城市"
                rules={[{ required: true, message: "请选择所属城市" }]}
              >
                <Select placeholder="请选择所属城市">
                  {cityOptions.map((city) => (
                    <Option value={city.value}>{city.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item<FieldType>
                name="slow"
                label="慢充数"
                rules={[{ required: true, message: "请输入慢充数" }]}
              >
                <InputNumber
                  min={0}
                  defaultValue={0}
                  suffix="个"
                  style={{ width: "100%" }}
                  placeholder="请输入慢充数"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item<FieldType>
                name="status"
                label="充电状态"
                rules={[{ required: true, message: "请选择充电状态" }]}
              >
                <Select placeholder="请选择充电状态">
                  {statusOptions.map((city) => (
                    <Option value={city.value}>{city.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item<FieldType>
                name="now"
                label="正在充电数"
                rules={[{ required: false, message: "请输入正在充电数" }]}
              >
                <InputNumber
                  min={0}
                  defaultValue={0}
                  suffix="个"
                  style={{ width: "100%" }}
                  placeholder="请输入正在充电数"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item<FieldType>
                name="fault"
                label="故障数"
                rules={[{ required: true, message: "请输入故障数" }]}
              >
                <InputNumber
                  min={0}
                  defaultValue={0}
                  suffix="个"
                  style={{ width: "100%" }}
                  placeholder="请输入故障数"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item<FieldType>
                name="person"
                label="责任人"
                rules={[{ required: true, message: "请输入责任人" }]}
              >
                <Input placeholder="请输入责任人" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item<FieldType>
                name="tel"
                label="责任人电话"
                rules={[{ required: true, message: "请输入责任人电话" }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  placeholder="请输入责任人电话"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default EditMonitor;
