import type { FormProps } from "antd";
import {
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  Typography,
  Image,
} from "antd";
import styled from "styled-components";
import { useAuth } from "../contexts/auth";

interface FieldType {
  username?: string;
  password?: string;
  remember?: boolean;
}

const StyledCard = styled(Card)`
  margin: 32px;
`;

const Login = () => {
  const { login } = useAuth();
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { username, password } = values;
    if (username && password) {
      login(username, password);
    }
  };

  return (
    <StyledCard>
      <Flex
        justify="center"
        align="center"
        vertical
        style={{ padding: "10px 28px" }}
      >
        <Image width={300} src="logo.png" preview={false} />
        <Typography.Title level={2} style={{ marginBottom: "24px" }}>
          Iniciar sesión
        </Typography.Title>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: "100%", textAlign: "center" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Por favor ingresa tu usuario" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Por favor ingresa tu contraseña" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Flex style={{ marginTop: "24px" }} justify="flex-end">
            <Button
              type="primary"
              htmlType="submit"
              style={{ alignSelf: "flex-end" }}
            >
              Iniciar sesión
            </Button>
          </Flex>
        </Form>
      </Flex>
    </StyledCard>
  );
};

export default Login;
