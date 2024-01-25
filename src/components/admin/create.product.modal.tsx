import { Form, Input, InputNumber, Modal, message, notification } from "antd";
import { callCreateProduct } from "../../config/api";

interface IProps {
  getData: any;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
}

const CreateProductModal = (props: IProps) => {
  const { getData, isCreateModalOpen, setIsCreateModalOpen } = props;

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const { name, price, description } = values;

    const res = await callCreateProduct(name, price, description);

    if (res.data) {
      //success
      await getData();
      message.success("success");
      handleCloseCreateModal();
    } else {
      message.error("Có lỗi xảy ra");
    }
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Add new Product"
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
    >
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          style={{ marginBottom: 5 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input your price",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: 5 }}
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your description",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;
