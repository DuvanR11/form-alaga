/**
 * Interfaz que define la estructura de una empresa.
 */
export interface Empresa {
    /**
     * El identificador único de la empresa.
     */
    id: number;
    /**
     * El NIT (Número de Identificación Tributaria) de la empresa.
     * Es un identificador único asignado a la empresa para propósitos fiscales.
     */
    nit: string;
    /**
     * La dirección de correo electrónico de la empresa.
     * Utilizado para la comunicación y notificaciones.
     */
    email: string; 
    /**
     * El número de teléfono de la empresa.
     * Utilizado para contacto y soporte.
     */
    phone: string;
    /**
     * La contraseña de la empresa para acceder a las funciones protegidas.
     * Nota: En una aplicación real, las contraseñas no deben ser parte del modelo y 
     * se manejan de forma segura en el backend.
     */
    password: string;
    /**
     * La confirmación de la contraseña para asegurarse de que coincida con el valor 
     * ingresado en el campo de contraseña.
     * Nota: Igual que con la contraseña, esta propiedad debería manejarse en el backend 
     * y no debería ser parte del modelo en el frontend.
     */
    confirmPassword: string;
    /**
     * Indica si la empresa ha aceptado los términos y condiciones.
     */
    terms: boolean;
    /**
     * Indica si la empresa ha aceptado el tratamiento de datos personales.
     */
    data: boolean;
}