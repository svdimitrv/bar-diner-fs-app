import React from "react";
import axios from "axios";
import "./MenuList.scss";
import ContentWrapper from "./ContentWrapper";
import MenuItemCard from "./MenuItemCard";

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  category: {
    id: number;
    name: string;
  };
};

const MenuList: React.FC = () => {
  const [menuData, setMenuData] = React.useState<MenuItem[]>([]);
  const [groupedMenuItems, setGroupedMenuItems] = React.useState<{
    [key: string]: MenuItem[];
  }>({});

  React.useEffect(() => {
    axios
      .get("http://localhost:5043/api/menu/items")
      .then((response) => {
        console.log("API response:", response.data);
        setMenuData(response.data);

        const grouped = response.data.reduce(
          (acc: { [key: string]: MenuItem[] }, item: MenuItem) => {
            const categoryName = item.category.name;
            if (!acc[categoryName]) {
              acc[categoryName] = [];
            }
            acc[categoryName].push(item);
            return acc;
          },
          {}
        );

        setGroupedMenuItems(grouped);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  return (
    <ContentWrapper>
      <div className="menu-container">
        {Object.keys(groupedMenuItems).map((categoryName) => (
          <div key={categoryName}>
            <h2 className="menu-category-header">{categoryName}</h2>
            <div className="menu-items">
              {groupedMenuItems[categoryName].map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </ContentWrapper>
  );
};

export default MenuList;
