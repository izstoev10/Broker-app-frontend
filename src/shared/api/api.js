class Api {
    _resolvePort(root, path) {
        if (root.endsWith("/")) {
            throw "Url must not end with /";
        }
        for (var property in config.microservices) {
            if (path.indexOf("api/" + property) > -1) {
                return root + ":" + config.microservices[property] + path;
            }
        }
        return root + path;
    }

    serialize(params) {
        const result = [];
        if (Object.keys(params).length > 0) {
            let count=0;
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    const keyValue = params[key];
                    if (keyValue !== null) {
                        switch (keyValue.constructor.name) {
                            case 'Object':
                                (Object).entries(keyValue).map(([k, v]) => {
                                    if(typeof v ==="object"){
                                        result.push(`${key}[${count}].column=${Object.keys(keyValue)[count]}`);
                                        for(var prop in v){
                                            result.push(`${key}[${count}].${prop}=${v[prop]}`);
                                        }
                                        count++;
                                    }else{
                                        result.push(`${key}.${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
                                    }
                                    return v;
                                });
                                break;
                            default:
                                result.push(`${encodeURIComponent(key)}=${encodeURIComponent(keyValue)}`);
                        }
                    }
                }
            }
            return result.join('&');
        } else {
            return result;
        }
    }

    async _processAsync(method, targetApiUrl, body, headers) {
      
        var b = null;
        if (typeof body === 'string') {
            b = body;
        }
        if (typeof body === 'object') {
            b = JSON.stringify(body);
        }

        if (!headers) {
            headers = {
            }
        }
        
        var result = await fetch("http://localhost:8000" + targetApiUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTY3NDUxNDE5NywiZXhwIjoxNjc0NTE3Nzk3LCJuYmYiOjE2NzQ1MTQxOTcsImp0aSI6ImRwWnNHNUh1MzBOS3B4VUMiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.2XTK9JpUHxOr_-Prak479QOjpoQnE3iEGLqhxNY3Tmo',
            },
            body: b
        })
        console.log(result)
        if (result.status == 200 || result.status == 400) {
            let payload = await result.json() 
            if (result.status == 400) {
            }
            payload.statusCode = result.status
            console.log(payload)
            return payload
        }
        if (result.status == 401 || result.status == 403) {
            var payload = {} 
            payload.statusCode = result.status
            payload.success = false
            payload.errors = [];
            payload.errors[0] = {};
            payload.errors[0].property = "General"
            payload.errors[0].errors = []
            payload.errors[0].errors[0] = "Unauthorised"
            return payload
        }
        throw `Api ${method} failed ${result.status} ${this._baseUrl + targetApiUrl} ${await result.text()}`


    }

    async postAsync(targetApiUrl, body, headers) {
        return await this._processAsync("POST", targetApiUrl, body, headers);
    }

    // async deleteAsync<T>(targetApiUrl: string, body?: object | string, headers?: any): Promise<IMicroserviceApiResult<T>> {
    //     return await this._processAsync<T>("DELETE", targetApiUrl, body, headers);
    // }

    // async putAsync<T>(targetApiUrl: string, body?: object | string, headers?: any): Promise<IMicroserviceApiResult<T>> {
    //     return await this._processAsync<T>("PUT", targetApiUrl, body, headers);
    // }

    async getAsync(targetApiUrl, body, headers) {
        return (await this._processAsync("GET", targetApiUrl, body, headers));
    }

}

export default new Api()