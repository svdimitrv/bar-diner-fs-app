import React from "react";
import axios from "axios";
import './MenuList.scss'

type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
  };
};

const MenuList: React.FC = () => {
  const [menuData, setMenuData] = React.useState<MenuItem[]>([]);
  
  // Grouped items by category name
  const [groupedMenuItems, setGroupedMenuItems] = React.useState<{ [key: string]: MenuItem[] }>({});

  React.useEffect(() => {
    axios
      .get("http://localhost:5043/api/menu/items")
      .then((response) => {
        console.log("API response:", response.data); // debug
        setMenuData(response.data);

        // Group the items by category
        const grouped = response.data.reduce((acc: { [key: string]: MenuItem[] }, item: MenuItem) => {
          const categoryName = item.category.name;
          if (!acc[categoryName]) {
            acc[categoryName] = [];
          }
          acc[categoryName].push(item);
          return acc;
        }, {});

        setGroupedMenuItems(grouped);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  return (
    <div className="menu-container">
      {Object.keys(groupedMenuItems).map((categoryName) => (
        <div key={categoryName}>
          <h2 className="menu-category-header">{categoryName}</h2>
          <div className="menu-items">
            {groupedMenuItems[categoryName].map((x) => (
              <div key={x.id} style={{ color: 'black' }}>
                <h3 className="menu-header">{x.name}</h3>
                <p className="menu-description">{x.description}</p>
                <strong className="menu-description">{x.price.toFixed(2)} lv</strong>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
