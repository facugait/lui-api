import { Button, Flex, notification } from "antd";
import { useEffect, useState } from "react";
import { MenusTable } from "../components/MenusTable";
import { Card } from "../components/Card";
import { MenuType } from "../interfaces";
import { Link } from "react-router-dom";
import api from "../service/api";

function Home() {
  const [menus, setMenus] = useState<MenuType[]>([]);
  const [menu, setMenu] = useState<MenuType | undefined>();

  const initData = async () => {
    setMenus(
      await api.fetchApi({
        url: "/api/menu",
        method: "GET",
      })
    );
  };

  useEffect(() => {
    initData();
  }, []);

  const clearPreviousMenu = async (menus: MenuType[]) => {
    Promise.all(
      menus.map((menu) =>
        api.fetchApi({
          url: `/api/menu/${menu.id}`,
          method: "PATCH",
          body: { isDaysMenu: false },
        })
      )
    );
  };

  const handleChooseMenu = async () => {
    if (menu) {
      try {
        const prevMenus = await api.fetchApi<MenuType[]>({
          url: `/api/menu?isDaysMenu=true`,
          method: "GET",
        });

        clearPreviousMenu(prevMenus);

        await api.fetchApi({
          url: `/api/menu/${menu.id}`,
          method: "PATCH",
          body: { isDaysMenu: true },
        });

        notification.success({
          message: "Menu del dia",
          description: "Menu del dia actualizado",
        });
      } catch (error) {
        notification.error({
          message: "Error",
          description:
            "Ocurrio un error al intentar actualizar el menu del dia",
        });
      }

      initData();
    }
  };

  return (
    <>
      <Card>
        <Flex justify="center" vertical style={{ minWidth: "650px" }} gap={20}>
          <Flex justify="flex-end" gap={10}>
            <Link to="/add">
              <Button type="primary">Agregar menu</Button>
            </Link>
            {menu && (
              <Button type="primary" onClick={handleChooseMenu}>
                Elejir como menu del dia
              </Button>
            )}
          </Flex>
          <Flex>
            <MenusTable data={menus} onMenuSelected={setMenu} />
          </Flex>
        </Flex>
      </Card>
    </>
  );
}

export default Home;
