# Examen Diagnóstico - Desarrollo Web Integral

## Nombre del Proyecto
Gestor de Productos (CRUD Integral)

## Descripción
Esta es una aplicación web full-stack diseñada para la gestión del inventario de productos. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre una base de datos de productos. El sistema maneja información clave como el nombre del producto, su precio, el stock disponible y una descripción detallada.

## Tecnologías Utilizadas
**Frontend:**
- React 19 (creado con Vite)
- Bootstrap 5 (para diseño y responsividad)
- Axios (para peticiones HTTP)
- React Data Table Component (para la tabla interactiva)
- React Hot Toast (para notificaciones)

**Backend:**
- Python 3
- Django 
- Django REST Framework (DRF)
- Django CORS Headers
- SQLite (Base de datos por defecto)

## Funcionalidades
- **Registrar Productos:** Formulario validado para agregar nuevos productos.
- **Listar Productos:** Visualización en una tabla interactiva con soporte para paginación.
- **Filtrar Productos:** Barra de búsqueda integrada para encontrar productos por nombre o descripción.
- **Editar Productos:** Posibilidad de modificar el precio, stock, nombre o descripción de cualquier registro existente.
- **Eliminar Productos:** Borrado de registros con previa confirmación de seguridad.
- **Notificaciones en tiempo real:** Alertas visuales de éxito o error en cada acción.

## Instrucciones para Ejecutar el Proyecto

### 1. Levantar el Backend (Django)
Abre una terminal y navega hasta la carpeta del backend:
```bash
cd examendiagnostico
```
*(Opcional: Crea y activa un entorno virtual si lo prefieres)*
Instala las dependencias necesarias:
```bash
pip install django djangorestframework django-cors-headers
```
Aplica las migraciones de la base de datos:
```bash
python manage.py migrate
```
Inicia el servidor de desarrollo:
```bash
python manage.py runserver
```
El servidor backend estará corriendo en `http://localhost:8000`.

### 2. Levantar el Frontend (React)
Abre otra pestaña de la terminal y navega hasta la carpeta del frontend:
```bash
cd frontend
```
Instala las dependencias de Node:
```bash
npm install
```
Inicia el servidor de desarrollo de Vite:
```bash
npm run dev
```
La aplicación web estará disponible en la URL que indique la consola (generalmente `http://localhost:5173`).

## Evidencias o Capturas de Pantalla
<img width="1903" height="909" alt="Captura de producto actualizado" src="https://github.com/user-attachments/assets/588afb75-6730-4154-b3a3-a4f0f62e9fe0" />
<img width="1893" height="980" alt="Captura de eliminación de producto" src="https://github.com/user-attachments/assets/30b36624-bc9d-4f84-adc7-b26f741a82ac" />
<img width="1898" height="777" alt="Captura de producto eliminado" src="https://github.com/user-attachments/assets/0d3e551f-1581-4095-adf0-b3ac0d42a5ab" />
<img width="1906" height="927" alt="Captura de registro" src="https://github.com/user-attachments/assets/a4ec869a-d6d0-46c3-a547-331ce2c5a09f" />
<img width="1899" height="910" alt="Captura de registro guardado" src="https://github.com/user-attachments/assets/9483a69f-4f4d-4cdb-b818-a259be8f423c" />
<img width="1900" height="918" alt="Captura de actualización del producto" src="https://github.com/user-attachments/assets/306d7a71-15bb-4afb-8037-a16e5ab7ecff" />


## Uso de Inteligencia Artificial
Se utilizó Inteligencia Artificial (IA) en este proyecto para las siguientes tareas:
- **Refactorización y adaptación de código:** Se utilizó para reutilizar un código existente (originalmente diseñado para gestión de mascotas) y adaptarlo completamente a la gestión de productos, integrando campos numéricos correctos y sincronizando los modelos.
- **Resolución de errores del servidor y dependencias:** La IA fue clave para diagnosticar y arreglar errores de compatibilidad en Vite (como los import de CommonJS en React 19) y solucionar fallos en el auto-reload de Django.
- **Acomodo de diseño y layout:** Se empleó para identificar y limpiar estilos por defecto conflictivos de Vite que "rompían" el sistema de grillas de Bootstrap, logrando una interfaz limpia y correctamente proporcionada.
- **Actualización del README:** Se encaergó de seguir los pasos solicitados para el README (a excepción de este punto).
