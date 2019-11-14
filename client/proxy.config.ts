const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/public"
        ],
        target: "http://localhost:8080",
        secure: false
    }
]

export default PROXY_CONFIG;