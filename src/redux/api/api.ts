import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ID, IUser, IUserDetails } from '../../utils/User';
import User from '../../utils/User';

interface IUsersResponse {
  [key: string]: Omit<IUserDetails, 'id'>;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://test-3ad51-default-rtdb.europe-west1.firebasedatabase.app/',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => 'users.json',
      transformResponse: (response: IUsersResponse): IUser[] => {
        const keys = Object.keys(response);
        return keys.map((key) => {
          const { email, image, name, permissions } = response[key];

          return new User(key, email, image, name, permissions);
        });
      },
    }),
    addUser: builder.mutation<IUserDetails, Partial<IUserDetails>>({
      query: (body) => ({
        url: 'users.json',
        method: 'POST',
        body,
      }),
    }),
    deleteUser: builder.mutation<IUserDetails, ID>({
      query: (id) => ({
        url: `users/${id}.json`,
        method: 'DELETE',
      }),
    }),
    changeUser: builder.mutation<IUserDetails, IUserDetails>({
      query: (user) => {
        const { id, ...body } = user;

        return {
          url: `users/${id}.json`,
          method: 'PUT',
          body,
        };
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useChangeUserMutation,
} = api;
