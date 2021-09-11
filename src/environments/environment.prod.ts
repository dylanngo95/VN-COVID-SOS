import { SEC_INFO } from './environment.sec';
export const environment = {
  production: true,
  hmr: false,
  backendDebug: false,
  host: 'http://54.69.39.96/api/v1',
  googleApiKey: SEC_INFO.GOOGLE_MAP_API_KEY,
  s3: {
    AccessKeyId: '',
    Secret: '',
  },
  mapStyle: [
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ],
};
