import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SideBarData = [
  {
    title: "Configuraciones",
    icon: <AiIcons.AiOutlineTool />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Usuario",
        path: "/User",
        icon: <AiIcons.AiOutlineUser />,
      },
    ],
  },
  {
    title: "Cuentas por cobrar",
    // path: '',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Clientes",
        path: "/Clients",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Vendedores",
        path: "/Sellers",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Factura",
        path: "/Facturas",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Products",
    // path: "/products",
    icon: <FaIcons.FaCartPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Grupo de producto",
        path: "/Groups",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Inventario",
        path: "/Inventories",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
];
