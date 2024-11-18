import { Form, Spin, Typography, notification } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MenuType } from "../interfaces";
import { Card } from "../components/Card";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MenuForm from "../components/MenuForm";
import api from "../service/api";

function EditMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<MenuType>();
  const { Title } = Typography;
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      await api.fetchApi<MenuType>({
        url: `/api/menu/${id}`,
        method: "PATCH",
        body: form.getFieldsValue(),
      });

      notification.success({
        message: "Menu actualizado",
        description: "El menu ha sido actualizado correctamente",
      });
      navigate("/");
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Ha ocurrido un error al actualizar el menu",
      });
    }
  };

  function dataIsValid(data: MenuType): data is MenuType {
    return (
      typeof data.id === "number" &&
      typeof data.name === "string" &&
      typeof data.price === "number" &&
      typeof data.imageUrl === "string" &&
      typeof data.description === "string"
    );
  }

  const initData = async () => {
    const menu = await api.fetchApi<MenuType>({
      url: `/api/menu/${id}`,
      method: "GET",
    });

    if (dataIsValid(menu)) {
      setData(menu);
    } else {
      throw new Error("Invalid data");
    }
  };

  useEffect(() => {
    initData();
  }, []);

  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    data && (
      <Card>
        <StyledContainer>
          <Title>Editar menu</Title>
          <MenuForm form={form} data={data} onSubmit={handleSubmit} />
        </StyledContainer>
      </Card>
    )
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  min-width: 650px;
  padding: 0 20px;
`;

export default EditMenu;
