// Module initialization
angular.module('lucidworksView.services', [
  'lucidworksView.services.apiBase',
  'lucidworksView.services.auth',
  'lucidworksView.services.authInterceptor',
  'lucidworksView.services.config',
  'lucidworksView.services.landingPage',
  'lucidworksView.services.query',
  'lucidworksView.services.queryData',
  'lucidworksView.services.signals',
  'lucidworksView.services.rules.filter',
  'lucidworksView.services.rules.transformer',
  'lucidworksView.services.rules',
  'lucidworksView.services.url'
]);
