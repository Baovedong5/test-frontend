import {
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  message,
  notification,
} from "antd";
import { useEffect } from "react";
import { callUpdateProduct } from "../../config/api";

interface Iprops {
  getData: any;
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: null | IProduct;
  setDataUpdate: any;
}

const UpdateProductModel = (props: Iprops) => {
  const {
    getData,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    dataUpdate,
    setDataUpdate,
  } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (dataUpdate) {
      form.setFieldsValue({
        name: dataUpdate.name,
        price: dataUpdate.price,
        description: dataUpdate.description,
      });
    }
  }, [dataUpdate]);

  const onFinish = async (values: any) => {
    const { name, price, description } = values;
    if (dataUpdate) {
      let id = dataUpdate?._id;
      const res = await callUpdateProduct(id, name, price, description);

      if (res.data) {
        //success
        await getData();
        message.success("success");
        handleCloseUpdateModal();
      } else {
        notification.error({
          message: "Co loi xay ra",
        });
      }
    }
  };

  const handleCloseUpdateModal = () => {
    setDataUpdate(null);
    form.resetFields();
    setIsUpdateModalOpen(false);
  };

  return (
    <Modal
      title="Update a user"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseUpdateModal()}
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
          label="price"
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

export default UpdateProductModel;
