import React from "react";
import axios from "axios";
import '../styles/MenuList.scss'
import ContentWrapper from "../components/ContentWrapper";
import MenuItemCard from "../components/MenuItemCard";
import { MenuItem } from "../types/MenuItem";

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
