import { FC, useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowModes,
  GridRowModesModel,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRenderEditCellParams,
  GridRowEditStopReasons,
  GridRowModel,
  useGridApiContext,
  GridValueSetter,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import axios from "axios";
import { ReservationItem } from "../types/ReservationItem";
import { MenuItem } from "../types/MenuItem";
import "../tailwind-server.css";

const MENU_CATEGORIES = [
  "Salads",
  "Starters",
  "Main Courses",
  "Desserts",
  "Alcoholic Drinks",
  "Non-Alcoholic Drinks",
];

const Dashboard: FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [orders, setOrders] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetchReservations();
    fetchOrders();
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("http://localhost:5043/api/menu/items");
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5043/api/reservations"
      );
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5043/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = async (id: GridRowId) => {
    try {
      await axios.delete(`http://localhost:5043/api/menu/items/${id}`);
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    try {
      const response = await axios.put(
        `http://localhost:5043/api/menu/items/${newRow.id}`,
        newRow
      );
      const updatedRow = response.data;
      setMenuItems((prev) =>
        prev.map((row) => (row.id === newRow.id ? updatedRow : row))
      );
      return updatedRow;
    } catch (error) {
      console.error("Error updating row:", error);
      return newRow;
    }
  };

  const handleAddNew = async () => {
    try {
      const newItem = {
        name: "New Item",
        price: 0,
        description: "",
        quantity: 0,
        allergens: "",
        category: { id: 0, name: "" },
      };
      const response = await axios.post(
        "http://localhost:5043/api/menu/items",
        newItem
      );
      const added = response.data;
      setMenuItems((prev) => [...prev, added]);
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };

  const setCategory: GridValueSetter<MenuItem> = (value, row) => {
    const updatedRow = {
      ...row,
      category: { ...row.category, name: value },
    };

    return updatedRow;
  };

  const CustomCategoryEditor = (props: GridRenderEditCellParams) => {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();

    const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value; // The new value entered by the user
        apiRef.current.setEditCellValue({ id, field, value: newValue });
        return <select
        className="w-full px-2 py-1 border rounded"
        value={value}
        onChange={handleValueChange}
      >
        {MENU_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      };
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, editable: true },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Qty",
      type: "number",
      width: 80,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      editable: true,
      valueGetter: (value, row) => {
        return row.category.name;
      },
      renderEditCell: CustomCategoryEditor,
    },
    { field: "allergens", headerName: "Allergens", flex: 1, editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
          />,
        ];
      },
    },
  ];

  return (
    <>
      <div className="mx-3 h-screen py-4 space-y-4">
        {/* Grid */}
        <div className="bg-white rounded shadow p-4 h-[55vh] flex flex-col">
          <div className="flex justify-between mb-3">
            <h2 className="text-xl font-semibold">Menu Items</h2>
            <button
              onClick={handleAddNew}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <AddIcon fontSize="small" /> Add Item
            </button>
          </div>
          <div className="overflow-auto flex-1">
            <DataGrid
              rows={menuItems}
              columns={columns}
              getRowId={(row) => row.id}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              pageSizeOptions={[5, 10]}
              disableRowSelectionOnClick
            />
          </div>
        </div>

        {/* Bottom sections */}
        <div className="grid grid-cols-2 gap-4 h-[27vh]">
          {/* Reservations */}
          <div className="bg-white rounded shadow p-4 flex flex-col h-full">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Today's Reservations</h3>
              <button
                onClick={fetchReservations}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Refresh
              </button>
            </div>
            <ul className="overflow-auto flex-1 divide-y divide-gray-200 text-sm">
              {reservations.map((res, index) => (
                <li key={index} className="py-2 px-1">
                  <span className="font-medium">{res.name}</span> at {res.time}
                </li>
              ))}
            </ul>
          </div>

          {/* Orders */}
          <div className="bg-white rounded shadow p-4 flex flex-col h-full">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Today's Food Orders</h3>
              <button
                onClick={fetchOrders}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Refresh
              </button>
            </div>
            <ul className="overflow-auto flex-1 divide-y divide-gray-200 text-sm">
              {orders.map((order) => (
                <li key={order.id} className="py-2 px-1">
                  {order.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
