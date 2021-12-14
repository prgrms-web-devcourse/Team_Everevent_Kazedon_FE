/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['picsum.photos'],
  },
  reactStrictMode: true,
  exportPathMap: () => ({
    // Next Export 에서 사용하는 값
    '/': { page: '/' },
    '/about': { page: '/about' },
    '/login': { page: '/login' },
    '/event/eventId/create': { page: '/event', query: { title: 'eventId' } },
    '/event/eventId': { page: '/event', query: { title: 'eventId' } },
    '/event/eventId/reviews': { page: '/event', query: { title: 'eventId' } },
    '/history/events': { page: '/history' },
    '/history/reviews': { page: '/history' },
    '/likes/event': { page: '/likes' },
    '/likes/shop': { page: '/likes' },
    '/owner/change': { page: '/owner' },
    '/owner/success': { page: '/owner' },
    '/profile/edit': { page: '/profile' },
    '/register/success': { page: '/register' },
    '/register': { page: '/register' },
    '/shop/shopId/create': { page: '/shop', query: { title: 'shopId' } },
    '/shop/shopId/': { page: '/shop', query: { title: 'shopId' } },
    '/user/userId': { page: '/user', query: { title: 'userId' } },
  }),
};
