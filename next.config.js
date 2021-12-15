/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    loader: 'imgix',
    path: '',
    domains: ['picsum.photos'],
  },
  reactStrictMode: true,
  // exportPathMap: () => ({
  // '/login': { page: '/login' },
  // '/owner/success': { page: '/owner/success' },
  // '/register/success': { page: '/register/success' },
  // '/register': { page: '/register' },
  // '/': { page: '/' },
  // '/history/events': { page: '/history/events' },
  // '/history/reviews': { page: '/history/reviews' },
  // '/likes/event': { page: '/likes/event' },
  // '/likes/shop': { page: '/likes/shop' },
  // '/owner/change': { page: '/owner/change' },
  // '/profile/edit': { page: '/profile/edit' },
  // }),
};
