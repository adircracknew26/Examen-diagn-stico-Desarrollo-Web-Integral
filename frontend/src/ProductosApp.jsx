import { useState, useEffect } from 'react';
import { read, create, update, deleteM } from './services/api';
import DataTableModule from 'react-data-table-component';
const DataTable = DataTableModule.default ? DataTableModule.default : DataTableModule;
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductosApp() {
    const [productos, setProductos] = useState([]);
    const [formData, setFormData] = useState({ nombre: '', precio: '', stock: '', descripcion: '' });
    const [editandoId, setEditandoId] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [cargandoTabla, setCargandoTabla] = useState(false);
    const [cargandoGuardar, setCargandoGuardar] = useState(false);
    const [erroresBackend, setErroresBackend] = useState({});

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        setCargandoTabla(true);
        try {
            const respuesta = await read();
            setProductos(respuesta.data);
        } catch (error) {
            console.error("Error al cargar productos:", error);
            toast.error("Error al obtener los datos del servidor");
        } finally {
            setCargandoTabla(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargandoGuardar(true);
	setErroresBackend({});

        await new Promise(resolve => setTimeout(resolve, 500)); 

        try {
            if (editandoId) {
                await update(editandoId, formData);
                toast.success("Producto actualizado correctamente");
            } else {
                await create(formData);
                toast.success("Producto registrado exitosamente");
            }

            setFormData({ nombre: '', precio: '', stock: '', descripcion: '' });
            setEditandoId(null);
            cargarProductos();

        } catch (error) {
            console.error("Error al guardar:", error);
        

        if (error.response && error.response.data) {
            setErroresBackend(error.response.data); // Guardamos los errores por campo
            toast.error("Por favor, corrige los errores en el formulario");
        } else {
            toast.error("Hubo un error de conexión con el servidor");
        }        
} finally {
            setCargandoGuardar(false);
        }
    };

    const prepararEdicion = (producto) => {
        setFormData({
            nombre: producto.nombre,
            precio: producto.precio,
            stock: producto.stock,
            descripcion: producto.descripcion
        });
        setEditandoId(producto.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEliminar = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
            const toastId = toast.loading("Eliminando producto..."); 
            try {
                await deleteM(id);
                toast.success("Producto eliminado", { id: toastId });
                cargarProductos(); 
            } catch (error) {
                console.error("Error al eliminar:", error);
                toast.error("Error al eliminar el producto", { id: toastId });
            }
        }
    };

    const productosFiltrados = productos.filter(
        producto => 
            producto.nombre.toLowerCase().includes(filtro.toLowerCase()) || 
            (producto.descripcion && producto.descripcion.toLowerCase().includes(filtro.toLowerCase()))
    );

    const barraDeBusqueda = (
        <div className="input-group mb-3" style={{ maxWidth: '300px' }}>
            <input
                type="text"
                className="form-control"
                placeholder="Buscar nombre o descripción..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
            />
            {filtro && (
                <button className="btn btn-outline-secondary" type="button" onClick={() => setFiltro('')}>
                    ✖
                </button>
            )}
        </div>
    );

    const SpinnerTabla = () => (
        <div className="p-5 text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2 text-muted">Cargando registros...</p>
        </div>
    );

    const columnas = [
        { name: 'Nombre', selector: row => row.nombre, sortable: true },
        { name: 'Precio', selector: row => row.precio, sortable: true },
        { name: 'Stock', selector: row => row.stock, sortable: true },
        { name: 'Descripción', selector: row => row.descripcion, sortable: true },
        {
            name: 'Acciones',
            cell: row => (
                <div className="d-flex gap-2">
                    <button className="btn btn-warning btn-sm" onClick={() => prepararEdicion(row)} disabled={cargandoTabla}>
                        ✏️ Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(row.id)} disabled={cargandoTabla}>
                        🗑️ Eliminar
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <div className="container mt-5">
            <Toaster position="top-right" reverseOrder={false} /> 

            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">{editandoId ? 'Editar Producto' : 'Registrar Producto'}</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input 
            type="text" 
            name="nombre" 
            // Si hay error en 'nombre', agregamos la clase 'is-invalid'
            className={`form-control ${erroresBackend.nombre ? 'is-invalid' : ''}`} 
            value={formData.nombre} 
            onChange={handleChange} 
            required 
            disabled={cargandoGuardar} 
        />
{erroresBackend.nombre && (
            <div className="invalid-feedback">
                {erroresBackend.nombre.join(', ')}
            </div>
        )}                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Precio</label>
                                    <input 
            type="number" 
            name="precio" 
            placeholder="Ej. 100" 
            className={`form-control ${erroresBackend.precio ? 'is-invalid' : ''}`} 
            value={formData.precio} 
            onChange={handleChange} 
            required 
            disabled={cargandoGuardar} 
        />
{erroresBackend.precio && (
            <div className="invalid-feedback">
                {erroresBackend.precio.join(', ')}
            </div>
        )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Stock</label>
                                    <input 
            type="number" 
            name="stock" 
            placeholder="Ej. 50" 
            className={`form-control ${erroresBackend.stock ? 'is-invalid' : ''}`} 
            value={formData.stock} 
            onChange={handleChange} 
            required 
            disabled={cargandoGuardar} 
        />
{erroresBackend.stock && (
            <div className="invalid-feedback">
                {erroresBackend.stock.join(', ')}
            </div>
        )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descripción</label>
                                    <textarea 
            name="descripcion" 
            className={`form-control ${erroresBackend.descripcion ? 'is-invalid' : ''}`} 
            value={formData.descripcion} 
            onChange={handleChange} 
            disabled={cargandoGuardar} 
        />
        {erroresBackend.descripcion && (
            <div className="invalid-feedback">
                {erroresBackend.descripcion.join(', ')}
            </div>
        )}                                </div>
                                <div className="d-grid gap-2">
        <button type="submit" className="btn btn-success" disabled={cargandoGuardar}>
            {cargandoGuardar ? (
                <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Guardando...</>
            ) : (
                editandoId ? 'Actualizar' : 'Guardar'
            )}
        </button>
        {editandoId && (
            <button type="button" className="btn btn-secondary" onClick={() => { setEditandoId(null); setFormData({ nombre: '', precio: '', stock: '', descripcion: '' }); setErroresBackend({}); }} disabled={cargandoGuardar}>
                Cancelar
            </button>
        )}
    </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-body p-0 pt-3">
                            <DataTable
                                title="Lista de Productos"
                                columns={columnas}
                                data={productosFiltrados}
                                pagination
                                paginationPerPage={5}
                                highlightOnHover
                                responsive
                                subHeader
                                subHeaderComponent={barraDeBusqueda}
                                subHeaderAlign="right"
                                noDataComponent="No hay productos que coincidan con la búsqueda"                             
                                progressPending={cargandoTabla}
                                progressComponent={<SpinnerTabla />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
