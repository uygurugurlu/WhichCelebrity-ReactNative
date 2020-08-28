export const ResponseHandler = (response) => {
  const url = response.config.url;
  const status_code = response.status;
  const params = response.config.data;
  let headers = '';
  Object.entries(response.config.headers).forEach((entry) => {
    headers = headers + '\n' + JSON.stringify(entry);
  });
  let response_data = '';
  Object.entries(response.data).forEach((entry) => {
    response_data = response_data + '\n' + JSON.stringify(entry);
  });
  console.log('response: ', response,
    '\nURL: ', url,
    '\nBody: ', params,
    '\nHeaders:', headers,
    '\nStatus Code: :', status_code,
    '\nResponse :', response_data,
  );
};
