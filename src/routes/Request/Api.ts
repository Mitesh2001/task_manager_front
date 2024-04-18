
export const setupAxios = (axios: any) => {
    axios.defaults.headers.Accept = 'application/json'
    axios.interceptors.request.use(
        (config: { headers: { Authorization: string } }) => {
            const accessToken = localStorage.getItem('access_token');
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }

            return config
        },
        (err: any) => Promise.reject(err)
    )
}