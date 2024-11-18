import { Form, Typography, notification } from "antd";
import { Card } from "../components/Card";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MenuForm from "../components/MenuForm";
import api from "../service/api";

function AddMenu() {
  const { Title } = Typography;
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      await api.fetchApi({
        url: `/api/menu`,
        method: "POST",
        body: form.getFieldsValue(),
      });

      notification.success({
        message: "Menu creado",
        description: "El menu se ha creado correctamente correctamente",
      });

      navigate("/");
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Ha ocurrido un error al crear el menu",
      });
    }
  };

  const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    min-width: 650px;
    padding: 0 20px;
  `;

  return (
    <Card>
      <StyledContainer>
        <Title>Agregar menu</Title>
        <MenuForm form={form} onSubmit={handleSubmit} />
      </StyledContainer>
    </Card>
  );
}

export default AddMenu;
