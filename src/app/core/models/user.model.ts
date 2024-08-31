/**
 * Interfaz que define la estructura de un usuario.
 */
export interface User {
    /**
     * El identificador único del usuario.
     */
    id: number;

    /**
     * El nombre de usuario para iniciar sesión.
     */
    username: string;

    /**
     * La contraseña del usuario.
     * Nota: En una aplicación real, la contraseña no debe ser parte del modelo de usuario,
     * ya que se maneja de manera segura en el backend y no se almacena en el frontend.
     */
    password?: string;

    /**
     * El nombre completo del usuario.
     */
    fullName?: string;

    /**
     * La dirección de correo electrónico del usuario.
     */
    email?: string;

    /**
     * El rol del usuario (por ejemplo, admin, user).
     */
    role?: string;

    /**
     * La fecha de creación del usuario.
     * Representada en formato ISO 8601 (por ejemplo, "2023-08-31T12:34:56Z").
     */
    createdAt?: string;

    /**
     * La fecha de la última actualización del usuario.
     * Representada en formato ISO 8601 (por ejemplo, "2023-08-31T12:34:56Z").
     */
    updatedAt?: string;
}
