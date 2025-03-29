import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Перехватчик запросов уже настроен в AuthContext, но можно оставить базовый
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response, // Успешные ответы просто пропускаем
    async (error) => {
        const originalRequest = error.config;
        
        // Проверяем, что это ошибка 401 и запрос еще не повторялся
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Помечаем запрос как повторяющийся
            
            try {
                // Получаем refresh token из localStorage
                const refreshToken = localStorage.getItem("refreshToken");
                
                // Запрос на обновление токена
                const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
                    refresh: refreshToken
                });
                
                // Сохраняем новый access token
                const newAccessToken = response.data.access;
                localStorage.setItem("accessToken", newAccessToken);
                
                // Обновляем заголовок в исходном запросе
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                
                // Повторяем исходный запрос с новым токеном
                return api(originalRequest);
            } catch (refreshError) {
                // Если обновление токена не удалось, можно очистить токены и перенаправить на логин
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                // Здесь можно добавить редирект на страницу входа
                return Promise.reject(refreshError);
            }
        }
        
        // Если ошибка не 401 или повторный запрос не удался
        return Promise.reject(error);
    }
);

export default api;