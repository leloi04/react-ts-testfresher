import { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import Layout from "@/layout";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router";
import BookPage from "pages/client/book";
import LoginPage from "pages/client/auth/login";
import RegisterPage from "pages/client/auth/register";
import "styles/global.scss"
import HomePage from "pages/client/home";
import { App, ConfigProvider } from 'antd';
import { AppProvider } from "components/context/app.context";
import ProtectedRoute from "components/auth/auth";
import ManageBookPage from "pages/admin/manage.book";
import DashBoardPage from "pages/admin/dashboard";
import ManageOrderPage from "pages/admin/manage.order";
import ManageUserPage from "pages/admin/manage.user";
import LayoutAdmin from "components/layout/layout.admin";
import enUS from "antd/locale/en_US";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
            index: true,
            element: <HomePage />
        },
        {
            path: "book/:id",
            element: <BookPage />,
        },
        {
          path: "checkout",
          element: <ProtectedRoute>
            <div>checkout page</div>
          </ProtectedRoute>
          ,
        },
      ]
    },
    {
      path: "admin",
      element: <LayoutAdmin/>,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <DashBoardPage/>
            </ProtectedRoute>
          )
        },
        {
          path: "book",
          element: (
            <ProtectedRoute>
              <ManageBookPage />
            </ProtectedRoute>
          )
        },
        {
          path: "order",
          element: (
            <ProtectedRoute>
              <ManageOrderPage />
            </ProtectedRoute>
          )
        },
        {
          path: "user",
          element: (
            <ProtectedRoute>
              <ManageUserPage />
            </ProtectedRoute>
          )
        },
      ]
    },
    {
        path: "login",
        element: <LoginPage />,
    },
    {
        path: "register",
        element: <RegisterPage />,
    },
  ]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App>
        <AppProvider>
          <ConfigProvider locale={enUS}>
            <RouterProvider router={router} />
          </ConfigProvider>
        </AppProvider>
      </App>
    </StrictMode>,
)