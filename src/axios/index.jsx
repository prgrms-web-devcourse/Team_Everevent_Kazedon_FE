import axios from 'axios';

const API_END_POINT = '';

const setInterceptors = (instance, auth) => {
  auth &&
    instance.interceptors.request.use(
      (config) => {
        const TOKEN = JSON.parse(sessionStorage.getItem('WAFFLE_TOKEN'));
        config.headers.Authorization = `bearer ${TOKEN}`;
        return config;
      },
      (error) => {
        return Promise.reject(error.response);
      }
    );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error.response);
    }
  );
  return instance;
};

const createInstance = (options) => {
  const instance = axios.create({ baseURL: API_END_POINT, ...options });
  return setInterceptors(instance);
};
const request = createInstance();

const createInstanceWithAuth = (options) => {
  const instance = axios.create({ baseURL: API_END_POINT, ...options });
  return setInterceptors(instance, true);
};
const authRequest = createInstanceWithAuth();

const authApi = {
  getAuthUser: () => authRequest.get('/auth-user'),
  signUp: (userInfo) => request.post('/signup', userInfo),
  login: (userInfo) => request.post('/login', userInfo),
  logout: () => request.post('/logout'),
};

const userApi = {
  getUserInfo: (userId) => request.get(`users/${userId}`),
  initUserInfo: (userInfo, token) =>
    axios({
      url: `${API_END_POINT}/settings/update-user`,
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      data: {
        username: userInfo.userName,
        fullName: userInfo.userName,
        meta: JSON.stringify({
          likeEventList: userInfo.likeEventList ? userInfo.likeEventList : [],
          bookmarkEventList: userInfo.bookmarkEventList
            ? userInfo.bookmarkEventList
            : [],
        }),
      },
    }),
  putUserName: (userName) =>
    authRequest.put('settings/update-user', {
      username: userName,
      fullName: userName,
    }),
  putUserPassword: (password) =>
    authRequest.put('settings/update-password', { password }),
};

const eventApi = {
  getUserEventList: (userId, params) =>
    request.get(`posts/author/${userId}`, { params }),
  getChannelEventList: (params) =>
    request.get(`posts/channel/${CHANNEL_ID}`, { params }),
  createEvent: ({ emoji, eventColor, hashTags }) => {
    const eventFormData = new FormData();
    eventFormData.append('title', emoji);
    eventFormData.append('image', null);
    eventFormData.append('channelId', CHANNEL_ID);
    eventFormData.append(
      'meta',
      JSON.stringify({
        eventColor,
        hashTags,
        bookmarkUsers: [],
        likeUsers: [],
      })
    );
    authRequest.post('posts/create', eventFormData);
  },
  getEvent: (eventId) => request.get(`posts/${eventId}`),
  updateEvent: (eventInfo) => {
    const { eventColor, hashTags, likeUsers, bookmarkUsers } = eventInfo;
    const eventFormData = new FormData();
    eventFormData.append('postId', eventInfo.id);
    eventFormData.append('title', eventInfo.emoji);
    eventFormData.append('image', null);
    eventFormData.append('channelId', CHANNEL_ID);
    eventFormData.append(
      'meta',
      JSON.stringify({
        eventColor,
        hashTags,
        likeUsers,
        bookmarkUsers,
      })
    );
    authRequest.put('posts/update', eventFormData);
  },
  deleteEvent: (eventId) =>
    authRequest.delete('posts/delete', { data: { id: eventId } }),
  createEventLike: (eventId) =>
    authRequest.post('likes/create', { postId: eventId }),
  deleteEventLike: (likeId) =>
    authRequest.delete('likes/delete', { data: { id: likeId } }),
  createEventComment: (commentInfo) =>
    authRequest.post('comments/create', commentInfo),
  updateEventComment: (commentInfo) =>
    authRequest.put('comments/update', commentInfo),
  deleteEventComment: (commentId) =>
    authRequest.delete('comments/delete', commentId),
};

export { authApi, userApi, eventApi, request, authRequest };
