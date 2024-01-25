import { useEffect, useState } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { callDeleteProduct, callListProduct } from "../../config/api";
import UpdateProductModel from "./update.product.model";
import CreateProductModal from "./create.product.modal";

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

const ProductTable = () => {
  const [listProduct, setListProduct] = useState([]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<null | IProduct>(null);

  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 2,
    pages: 0,
    total: 0,
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await callListProduct(meta.current, meta.pageSize);
    //@ts-ignore
    setListProduct(res.data.data.result);
    setMeta({
      current: res.data.data.meta.current,
      pageSize: res.data.data.meta.pageSize,
      pages: res.data.data.meta.pages,
      total: res.data.data.meta.total,
    });
  };

  const confirm = async (product: IProduct) => {
    const res = await callDeleteProduct(product._id);
    if (res.data) {
      message.success("Xóa product thành công");
      await getData();
    } else {
      message.error("Có lỗi xảy ra");
    }
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: "STT",
      dataIndex: "_id",
      render: (value, record, index) => {
        return <>{(meta.current - 1) * meta.pageSize + index + 1}</>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price ?? 0),
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "Actions",
      render: (value, record) => {
        return (
          <div>
            <Button
              onClick={() => {
                setIsUpdateModalOpen(true);
                setDataUpdate(record);
              }}
            >
              Edit
            </Button>

            <Popconfirm
              title="Delete the user"
              description={`Are you sure to delete this user. Name = ${record.name}?`}
              onConfirm={() => confirm(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger style={{ marginLeft: 20 }}>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleOnChange = async (page: number, pageSize: number) => {
    const res = await callListProduct(page, pageSize);
    //@ts-ignore
    setListProduct(res.data.data.result);
    setMeta({
      current: res.data.data.meta.current,
      pageSize: res.data.data.meta.pageSize,
      pages: res.data.data.meta.pages,
      total: res.data.data.meta.total,
    });
  };

  return (
    <div style={{ margin: "3.8rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h2>Table User</h2>
        <Button
          icon={<PlusOutlined />}
          type={"primary"}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add new
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={listProduct}
        rowKey={"_id"}
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          total: meta.total,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page: number, pageSize: number) =>
            handleOnChange(page, pageSize),
          showSizeChanger: true,
        }}
      />

      <CreateProductModal
        getData={getData}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      <UpdateProductModel
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        getData={getData}
      />
    </div>
  );
};

export default ProductTable;
