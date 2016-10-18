// see https://github.com/github/fetch#handling-http-error-statuses
export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const RestRoot = 'http://localhost/api'

const ApiV1 = {
  getExpenses: function () {
    return fetch(`${RestRoot}/expenses`, {
      headers: {
        'Authorization': 'Basic ' + btoa('alice:asdf')
      }
    })
      .then(checkStatus)
      .then(response => response.json())
  }
}

export const Api = ApiV1
