import axios from 'axios';

const BASE_URL = 'http://localhost:8087/api/tourPackages';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true // Importante para CORS con credenciales
});

// Interceptor para logs de desarrollo
axiosInstance.interceptors.request.use(request => {
    console.log('Starting Request:', request);
    return request;
});

axiosInstance.interceptors.response.use(
    response => {
        console.log('Response:', response);
        return response;
    },
    error => {
        console.log('Error Response:', error.response);
        return Promise.reject(error);
    }
);

export const tourPackageService = {
    getAllPackages: async () => {
        try {
            console.log('Intentando obtener paquetes desde:', BASE_URL);
            const response = await axiosInstance.get('', {
                timeout: 15000  // Aumentamos el timeout a 15 segundos
            });
            console.log('Respuesta exitosa:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error detallado al obtener paquetes:', {
                message: error.message,
                code: error.code,
                response: error.response,
                config: error.config
            });
            
            if (error.code === 'ERR_NETWORK') {
                throw new Error('Error de conexión: Verifica que el servidor backend esté corriendo en el puerto 8087');
            }
            
            if (error.response) {
                throw new Error(`Error del servidor: ${error.response.status} - ${error.response.data.message || 'Error desconocido'}`);
            }
            
            throw new Error('Error al obtener paquetes: ' + error.message);
        }
    },

    create: async (packageData) => {
        try {
            console.log('Intentando crear paquete con datos:', packageData);
            const response = await axiosInstance.post('', packageData);
            console.log('Paquete creado exitosamente:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error detallado al crear paquete:', {
                message: error.message,
                code: error.code,
                response: error.response,
                config: error.config
            });
            
            if (error.code === 'ERR_NETWORK') {
                throw new Error('Error de conexión: Verifica que el servidor backend esté corriendo en el puerto 8087');
            }
            
            if (error.response) {
                throw new Error(`Error del servidor: ${error.response.status} - ${error.response.data.message || 'Error desconocido'}`);
            }
            
            throw new Error('Error al crear paquete: ' + error.message);
        }
    },

    update: async (id, packageData) => {
        try {
            const response = await axiosInstance.put(`${id}`, packageData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar paquete:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await axiosInstance.delete(`${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar paquete:', error);
            throw error;
        }
    },

    deletePackage: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar paquete:', error);
            if (error.code === 'ERR_NETWORK') {
                throw new Error('No se pudo conectar con el servidor');
            }
            throw error;
        }
    },

    getPackageById: async (id) => {
        try {
            console.log('Obteniendo paquete con ID:', id);
            const response = await axiosInstance.get(`/${id}`);
            console.log('Respuesta del servidor:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al obtener paquete por ID:', error);
            throw new Error('Error al obtener detalles del paquete: ' + error.message);
        }
    },

    updatePackage: async (id, packageData) => {
        try {
            // Asegurarse de que los datos coincidan con TourPackageRequestDTO
            const requestData = {
                title: packageData.title,
                description: packageData.description,
                state: packageData.state,
                mediaPackageIds: packageData.mediaPackageIds || [],
                featureIds: packageData.featureIds || []
            };

            console.log('Actualizando paquete:', requestData);
            const response = await axiosInstance.put(`/${id}`, requestData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar paquete:', error);
            throw new Error('Error al actualizar paquete: ' + error.message);
        }
    }
}; 