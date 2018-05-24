import React from 'react';

import './Loading.css';

const Loading = props => {
  return props.isLoading && <i className="loading-rotate fas fa-spinner" />;
};

export default Loading;
