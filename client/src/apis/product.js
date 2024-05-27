import axios from '../axios';

export const apiGetProducts = (params) => {
  return axios({
    url: `/product/`,
    method: 'get',
    params: params
  });
};

export const apiGetProduct = (pid) => axios({
  url: `/product/${pid}`,
  method: 'get'
});

export const apiCreateProduct = (data) => axios({
  url: `/product/`,
  method: 'post',
  data
});

export const apiUpdateProduct = (data, pid) => axios({
  url: `/product/${pid}`,
  method: 'put',
  data
});

export const apiDeleteProduct = (pid) => axios({
  url: `/product/${pid}`,
  method: 'delete',
});

export const apiAddVarriants = (data, pid) => axios({
  url: `/product/varriants/${pid}`,
  method: 'put',
  data
});

export const apiCreateOrder = (data) => axios({
  url: '/order/',
  method: 'post',
  data
});

export const apiGetOrders = (params) => axios({
  url: '/order/admin',
  method: 'get',
  params
});

export const apiGetUserOrders = (params) => axios({
  url: '/order/',
  method: 'get',
  params
});