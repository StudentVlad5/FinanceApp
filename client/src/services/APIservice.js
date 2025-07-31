import axios from 'axios';
import PropTypes from 'prop-types';
import { BASE_URL } from 'helpers/constants';

async function fetchData(pathParams) {
  const axiosInstance = axios.create({
    baseURL: `${BASE_URL}${pathParams}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      'Access-Control-Expose-Headers': 'Content-Range',
    },
  });
  return await axiosInstance.get();
}

async function deleteData(pathParams) {
  const formData = new FormData();
  return axios.delete(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      'Access-Control-Expose-Headers': 'Content-Range',
    },
  });
}

// IMAGES

async function createImg(pathParams, body, file) {
  const formData = new FormData();
  formData.append('name', body.name);
  file && formData.set('avatar', file);
  return await axios.patch(`${BASE_URL}${pathParams}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      'Access-Control-Expose-Headers': 'Content-Range',
    },
  });
}

fetchData.propTypes = {
  pathParams: PropTypes.string.isRequired,
};

deleteData.propTypes = {
  pathParams: PropTypes.string.isRequired,
};

createImg.propTypes = {
  pathParams: PropTypes.string.isRequired,
  formData: PropTypes.string.isRequired,
  file: PropTypes.string,
};
export { fetchData, deleteData, createImg };
