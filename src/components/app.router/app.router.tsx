import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";
import Form from "../form/form";

const LoginPage = lazy(() => import("../login/login"));
const HomePage = lazy(() => import("../home/home"));
const RegisterPage = lazy(() => import("../register/register"));
const AddMangaPage = lazy(() => import("../addManga/addManga"));
const EditMangaPage = lazy(() => import("../editManga/editManga"));
const DetailsPage = lazy(() => import("../detail/details"));

// type AppRouterProps = {
//   menuOptions: MenuOption[];
// };
export function AppRouter() {
  // export function AppRouter({ menuOptions }: AppRouterProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={"/"} element={<HomePage></HomePage>}></Route>
        <Route
          // path={menuOptions[0].path}
          path={"/home"}
          element={<HomePage></HomePage>}
        ></Route>
        <Route
          // path={menuOptions[1].path}
          path={"/login"}
          element={<LoginPage></LoginPage>}
        ></Route>
        <Route
          // path={menuOptions[2].path}
          path={"/register"}
          element={<RegisterPage></RegisterPage>}
        ></Route>
        <Route
          // path={menuOptions[3].path}
          path={"/add"}
          element={
            <AddMangaPage>
              <Form prop={true}></Form>
            </AddMangaPage>
          }
        ></Route>
        <Route
          path={"/edit/:id"}
          element={
            <EditMangaPage>
              <Form prop={false}></Form>
            </EditMangaPage>
          }
        ></Route>
        <Route
          path={"/detail/:id"}
          element={<DetailsPage></DetailsPage>}
        ></Route>
      </Routes>
    </Suspense>
  );
}
