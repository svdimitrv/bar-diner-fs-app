import React from "react";
import axios from "axios";
import ContentWrapper from "../components/ContentWrapper";
import MenuItemCard from "../components/MenuItemCard";
import { MenuItem } from "../types/MenuItem";

const CATEGORY_ORDER = [
  "Salads",
  "Starters",
  "Main Courses",
  "Desserts",
  "Alcoholic Drinks",
  "Non-Alcoholic Drinks",
];

const MenuList: React.FC = () => {
  const [grouped, setGrouped] = React.useState<Partial<Record<string, MenuItem[]>>>({});

  React.useEffect(() => {
    axios
      .get("http://localhost:5043/api/menu/items")
      .then((response) => {
        const data = response.data as MenuItem[];
        const groupedData = Object.groupBy(data, (item) => item.category.name);
        setGrouped(groupedData);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  return (
    <ContentWrapper>
      <div className="space-y-16 mt-8">
        {CATEGORY_ORDER.map((categoryName) => {
          const items = grouped[categoryName];
          if (!items) return null;

          return (
            <section key={categoryName} className="space-y-4">
              <h2 className="text-2xl font-bold uppercase text-gray-800 relative pb-2 font-heading">
                {categoryName}
                <span className="block w-12 h-1 bg-primary rounded mt-1 transition-all duration-300 group-hover:w-full" />
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {items.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </ContentWrapper>
  );
};

export default MenuList;
