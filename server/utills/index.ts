import { Router } from "express";

type Wrapper = ((router: Router) => void);

export const applyMiddleware = (
  middleware: Wrapper[],
  router: Router
) => {
    middleware.forEach(wrapper => wrapper(router));
};
type apiRouter = {
    path: string,
    router: Router
}
export const applyRoutes = (
    routes: apiRouter[],
    router: Router
  ) => {
      routes.forEach(route => router.use(route.path, route.router));
  };