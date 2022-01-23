const ROUTE_PARAMS = {
  id: ':id',
};

const API_ROUTES = {
  ROOT: '/',
  GET_CATEGORIES: '/admin/category',
  GET_CATEGORY_BY_ID: `/admin/category/${ROUTE_PARAMS.id}`,
  CREATE_CATEGORY: '/admin/category/create',
  UPDATE_CATEGORY: `/admin/category/edit/${ROUTE_PARAMS.id}`,
  DELETE_CATEGORY: `/admin/category/delete/${ROUTE_PARAMS.id}`,
  CREATE_NOMINAL: '/admin/nominal/create',
  GET_NOMINALS: '/admin/nominal',
  UPDATE_NOMINAL: `/admin/nominal/edit/${ROUTE_PARAMS.id}`,
  DELETE_NOMINAL: `/admin/nominal/delete/${ROUTE_PARAMS.id}`,
  CREATE_VOUCHER: '/admin/voucher/create',
  GET_VOUCHER: '/admin/voucher',
  GET_VOUCHER_BY_ID: `/admin/voucher/${ROUTE_PARAMS.id}`,
  UPDATE_VOUCHER: `/admin/voucher/edit/${ROUTE_PARAMS.id}`,
  DELETE_VOUCHER: `/admin/voucher/delete/${ROUTE_PARAMS.id}`,
};

const VIEW_ROUTES = {
  ROOT: '/',
  ADMIN: '/admin',
  CATEGORY: '/admin/category',
  CREATE_CATEGORY: '/admin/category/create',
  UPDATE_CATEGORY: `/admin/category/edit/${ROUTE_PARAMS.id}`,
  NOMINAL: '/admin/nominal',
  CREATE_NOMINAL: '/admin/nominal/create',
  UPDATE_NOMINAL: `/admin/nominal/edit/${ROUTE_PARAMS.id}`,
  VOUCHER: '/admin/voucher',
  CREATE_VOUCHER: '/admin/voucher/create',
  UPDATE_VOUCHER: `/admin/voucher/edit/${ROUTE_PARAMS.id}`,
};

export { API_ROUTES, VIEW_ROUTES };
