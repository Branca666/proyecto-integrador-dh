import React, { useState, useEffect } from 'react';
import styles from './EditPackageModal.module.css';
import Swal from 'sweetalert2';
import * as tourPackageService from '../../../services/tourPackageService';

const EditPackageModal = ({ packageId, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        state: true,
        mediaPackageIds: [],
        featureIds: []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [packageDetails, setPackageDetails] = useState(null);

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                console.log('Fetching package with ID:', packageId); // Debug log
                const response = await tourPackageService.tourPackageService.getPackageById(packageId);
                console.log('Package details:', response); // Debug log
                
                setPackageDetails(response);
                setFormData({
                    title: response.title || '',
                    description: response.description || '',
                    state: response.state ?? true,
                    mediaPackageIds: response.mediaPackages?.map(media => media.id) || [],
                    featureIds: response.features?.map(feature => feature.id) || []
                });
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar los detalles:', err);
                setError('Error al cargar los detalles del paquete');
                setLoading(false);
            }
        };

        if (packageId) {
            fetchPackageDetails();
        }
    }, [packageId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Asegurarse de que los datos coincidan con TourPackageRequestDTO
            const updateData = {
                title: formData.title,
                description: formData.description,
                state: formData.state,
                mediaPackageIds: formData.mediaPackageIds,
                featureIds: formData.featureIds
            };

            await tourPackageService.updatePackage(packageId, updateData);
            Swal.fire({
                title: '¡Éxito!',
                text: 'Paquete actualizado correctamente',
                icon: 'success'
            });
            onSave();
        } catch (error) {
            console.error('Error al actualizar:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo actualizar el paquete',
                icon: 'error'
            });
        }
    };

    if (loading) return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p>Cargando...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p className={styles.error}>{error}</p>
                <button onClick={onClose} className={styles.cancelButton}>
                    Cerrar
                </button>
            </div>
        </div>
    );

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Editar Paquete</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Título:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Descripción:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Estado:</label>
                        <select
                            name="state"
                            value={formData.state.toString()}
                            onChange={handleChange}
                        >
                            <option value="true">Activo</option>
                            <option value="false">Inactivo</option>
                        </select>
                    </div>

                    {/* Mostrar información de categorías (solo lectura) */}
                    {packageDetails?.categories && (
                        <div className={styles.formGroup}>
                            <label>Categorías:</label>
                            <div className={styles.categoriesList}>
                                {packageDetails.categories.map(category => (
                                    <div key={category.categoryId} className={styles.categoryItem}>
                                        <p><strong>{category.title}</strong></p>
                                        <p>Precio: {category.price} {category.currency}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.saveButton}>
                            Guardar Cambios
                        </button>
                        <button 
                            type="button" 
                            onClick={onClose}
                            className={styles.cancelButton}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPackageModal;
