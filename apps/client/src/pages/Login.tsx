import type { FormProps } from "antd";
import { Button, Card, Checkbox, Form, Input } from "antd";
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
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: "100%" }}
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

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>Recordarme</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
      </div>
    </StyledCard>
  );
};

export default Login;
