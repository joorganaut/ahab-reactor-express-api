const axios = require('axios');
class HTTPEngine{
    static Execute=async(httpConfig, request, error)=>{
      await axios({
        method: httpConfig.Method,
        url: httpConfig.url,
        data: request.ToString()
      }).then(res=>{
        return res;
      }).catch((err)=>{
        error = err;
      }).finally(()=>{
        // always executed
      })
    }
    static ExecutePost=async(httpConfig, request)=>{

    }
    static ExecuteGet=async(httpConfig, request, error)=>{
      let result = {};
        await axios.get(httpConfig.Url, {
            params: request
          })
          .then(function (response) {
            result = response;
          })
          .catch(function (err) {
            result = err;
          })
          .finally(function () {
            // always executed
          });
          return result;
    }
}
module.exports = HTTPEngine