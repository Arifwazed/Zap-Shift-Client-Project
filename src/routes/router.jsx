import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home/Home";
import Coverage from "../pages/coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Rider/Rider";
import SendParcel from "../pages/sendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/dashboard/MyParcels/MyParcels";
import Payment from "../pages/dashboard/Payment/Payment";
import PaymentSuccess from "../pages/dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../pages/dashboard/Payment/PaymentCancel";
import PaymentHistory from "../pages/dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../pages/dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../pages/dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRider from "../pages/dashboard/AssignRider/AssignRider";
import AssignedDeliveries from "../pages/dashboard/AssignedDeliveries/AssignedDeliveries";
import RiderRoute from "./RiderRoute";
import CompletedDeliveries from "../pages/dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../pages/ParcelTrack/ParcelTrack";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home,
        },
        {
          path: 'rider',
          element: <PrivateRoute>
              <Rider></Rider>
          </PrivateRoute>,
          loader: () => fetch('data/servicecenters.json'),
        },
        {
            path: 'coverage',
            Component: Coverage,
            loader: () => fetch('data/servicecenters.json'),
        },
        {
          path: 'send-parcel',
          element: <PrivateRoute>
              <SendParcel></SendParcel>
          </PrivateRoute>,
          loader: () => fetch('data/servicecenters.json'),
        },
        {
          path: 'parcel-track/:trackingId',
          Component: ParcelTrack,
        }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
        {
            path: 'login',
            Component: Login,
        },
        {
            path: 'register',
            Component: Register,
        }
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute>
        <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        path: 'my-parcels',
        Component: MyParcels,
      },
      {
        path: 'payment/:parcelId',
        Component: Payment,
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess,
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancel,
      },
      {
        path: 'payment-history',
        Component: PaymentHistory,
      },
      // admin
      {
        path: 'approve-riders',
        // Component: ApproveRiders,
        element: <AdminRoute>
          <ApproveRiders></ApproveRiders>
        </AdminRoute>,
      },
      {
        path: 'assign-riders',
        element: <AdminRoute>
          <AssignRider></AssignRider>
        </AdminRoute>,
      },
      {
        path: 'users-management',
        // Component: UsersManagement,
        element: <AdminRoute>
          <UsersManagement></UsersManagement>
        </AdminRoute>
      },
      // rider
      {
        path: 'assigned-deliveries',
        element: <RiderRoute>
          <AssignedDeliveries></AssignedDeliveries>
        </RiderRoute>
      },
      {
        path: 'completed-deliveries',
        element: <RiderRoute>
          <CompletedDeliveries></CompletedDeliveries>
        </RiderRoute>
      },
    ]
  }
]);