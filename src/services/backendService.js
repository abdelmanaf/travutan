import * as tokenService from '../services/tokenService';

const BASE_URL = '/api/destinations';
const PROFILE_URL = '/api/profile';
//------------ for destinations
// post request to create a destination
export function create(destination) {
  console.log('create fetch', destination);
  return fetch(
    BASE_URL,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer' + tokenService.getToken(),
      },
      body: JSON.stringify(destination),
    },
    {
      mode: 'cors',
    }
  ).then((res) => res.json());
}
export function deleteDest(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  }).then((res) => res.json());
}
export function updateDest(id, updateData) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',

    body: JSON.stringify(updateData),
  }).then((res) => res.json());
}
//get all destinations
export function getAll() {
  console.log('get all');
  console.log('please');
  return fetch(BASE_URL).then((res) => res.json());
}
//------------ for profile destinations
export function getProfile() {
  return fetch(
    PROFILE_URL,
    {
      headers: {
        Authorization: 'Bearer ' + tokenService.getToken(),
      },
    },
    {
      mode: 'cors',
    }
  ).then((res) => res.json());
}
export function createOrUpdateProfileDestination(userId, destObject) {
  return fetch(
    `${PROFILE_URL}/createOrUpdateProfileDestination/user/${userId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tokenService.getToken(),
      },
      body: JSON.stringify(destObject),
    }
  ).then((res) => {
    console.log('res res res', res);
    res.json();
  });
}
export function removeProfileDestination(destId) {
  return fetch(`${PROFILE_URL}/removeProfileDestination/${destId}`, {
    method: 'POST',
    'Content-Type': 'application/json',
    headers: {
      Authorization: 'Bearer ' + tokenService.getToken(),
    },
  }).then((res) => res.json());
}
