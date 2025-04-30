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
  allergens: string;
  category: {
    id: number;
    name: string;
  };
};

const MenuList: React.FC = () => {
  const [_, setMenuData] = React.useState<MenuItem[]>([]);

  const [grouped, setGrouped] = React.useState<Partial<Record<string, MenuItem[]>>>({});

  React.useEffect(() => {
    axios
      .get("http://localhost:5043/api/menu/items")
      .then((response) => {
        setMenuData(response.data);

        const data = response.data as MenuItem[];

        setGrouped(Object.groupBy(data, (item) => item.category.name));
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  return (
    <ContentWrapper>
      <div className="menu-container">
        {Object.keys(grouped).map((categoryName) => (
          <div key={categoryName}>
            <h2 className="menu-category-header">{categoryName}</h2>
            <div className="menu-items">
              {grouped[categoryName]?.map((item) => (
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
