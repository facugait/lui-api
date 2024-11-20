import styled from "styled-components";
import {
  Button,
  Image,
  Table,
  TableColumnsType,
  TableProps,
  Tooltip,
} from "antd";
import { Link } from "react-router-dom";
import { MenuType } from "../interfaces";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";

const StyledImage = styled(Image)`
  object-fit: cover;
`;

interface MenusTableProps {
  data: MenuType[];
  onMenuSelected: (menu: MenuType) => void;
}

const columns: TableColumnsType<MenuType> = [
  {
    title: "Imagen",
    dataIndex: "imageUrl",
    render: (imageUrl: string) => <StyledImage width={100} src={imageUrl} />,
  },
  {
    title: "Nombre",
    dataIndex: "name",
  },
  {
    title: "Precio",
    dataIndex: "price",
    render: (price: number) => `$${price.toLocaleString("es-AR")}`,
  },
  {
    align: "center",
    title: "Activo",
    dataIndex: "isDaysMenu",
    render: (isDaysMenu: boolean) => (
      <p>
        {isDaysMenu ? (
          <CheckOutlined style={{ color: "#6EC531", fontSize: "20px" }} />
        ) : (
          <CloseOutlined style={{ color: "#ED1C24", fontSize: "20px" }} />
        )}
      </p>
    ),
  },
  {
    align: "center",
    title: "Acciones",
    dataIndex: "id",
    render: (id: number) => (
      <Link to={`/edit/${id}`}>
        <Tooltip placement="top" title="Editar">
          <Button type="primary" icon={<EditOutlined />} />
        </Tooltip>
      </Link>
    ),
  },
];

const StyledTable = styled(Table<MenuType>)`
  width: 100%;
`;

export const MenusTable = ({ data, onMenuSelected }: MenusTableProps) => {
  const rowSelection: TableProps<MenuType>["rowSelection"] = {
    onChange: (_, selectedRows: MenuType[]) => {
      onMenuSelected(selectedRows[0]);
    },
  };

  return (
    <StyledTable
      rowKey={"id"}
      rowSelection={{ type: "radio", ...rowSelection }}
      dataSource={data}
      columns={columns}
    />
  );
};
