import Axios from 'axios'
import Vue from 'vue'

// We cannot extend Axios.prototype
const axiosExtraProto = {}

// Sets a common header
axiosExtraProto.setHeader = function setHeader (name, value, scopes = 'common') {
  if(!Array.isArray(scopes)) {
    scopes = [scopes]
  }
  scopes.forEach(scope => {
    if (!value) {
      delete this.defaults.headers[scope][name];
      return
    }
    this.defaults.headers[scope][name] = value
  })
}

// Set requests token
axiosExtraProto.setToken = function setToken (token, type, scopes = 'common') {
    const value = !token ? null : (type ? type + ' ' : '') + token
    this.setHeader('Authorization', value, scopes)
}

// Request helpers
const reqMethods = [
    'request', 'delete', 'get', 'head', 'options', // url, config
    'post', 'put', 'patch' // url, data, config
]
reqMethods.forEach(method => {
  axiosExtraProto['$' + method] = function () {
    return this[method].apply(this, arguments).then(res => res && res.data)
  }
})

// Setup all helpers to axios instance (Axios.prototype cannot be modified)
function setupHelpers( axios ) {
  for (let key in axiosExtraProto) {
    axios[key] = axiosExtraProto[key].bind(axios)
  }
}

const redirectError = {}

// Set appreciate `statusCode` and `message` to error instance
function errorHandler(error, ctx) {
  if (error.response) {
    // Error from backend (non 2xx status code)
    // ...Auto redirect on special status codes
    if (redirectError[error.response.status]) {
      ctx.redirect(redirectError[error.response.status])
    }
    error.statusCode = error.statusCode || parseInt(error.response.status) || 500
    error.message = error.message || error.response.statusText || (error.statusCode + ' (Internal Server Error)')
  } else if (error.request) {
    // Error while making request
    error.statusCode = error.statusCode || 500
    error.message = error.message || 'request error'
  } else {
    // Something happened in setting up the request that triggered an Error
    error.statusCode = error.statusCode || 0
    error.message = error.message || 'axios error'
  }

  return Promise.reject(error)
}





// Setup BaseURL
const baseURL = process.browser
  ? (process.env.API_URL_BROWSER || 'http://localhost:9000')
  : (process.env.API_URL || 'http://localhost:9000/')

// Custom init hook


export default (ctx, inject) => {
  const { app, store, req } = ctx

  // Create a fresh objects for all default header scopes
  // Axios creates only one which is shared across SSR requests!
  // https://github.com/mzabriskie/axios/blob/master/lib/defaults.js
  const headers = {
    common : {
      'Accept': 'application/json, text/plain, */*'
    },
    delete: {},
    get: {},
    head: {},
    post: {},
    put: {},
    patch: {}
  }

  
  // Default headers
  headers.common = (req && req.headers) ? Object.assign({}, req.headers) : {}
  delete headers.common.host
  delete headers.common.accept
  

  // Create new axios instance
  const axios = Axios.create({
    baseURL,
    headers
  })

  

  

  

  
  
  // Error handler
  axios.interceptors.response.use(undefined, err => errorHandler(err, ctx));

  

  // Inject axios to the context as $axios
  ctx.$axios = axios
  inject('axios', axios)

  


  // Setup axios helpers
  setupHelpers(axios)
}
