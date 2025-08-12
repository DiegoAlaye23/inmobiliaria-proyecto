// src/pages/UsuariosAdmin.jsx
import { useEffect, useState } from 'react';
import api from '../config/axios.js';
import {
  Box,
  Typography,
  Snackbar,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, mensaje: '', tipo: 'success' });

  const cargarUsuarios = () => {
    api.get('/usuarios')
      .then((res) => setUsuarios(res.data))
      .catch(() => setSnackbar({ open: true, mensaje: 'Error al cargar usuarios', tipo: 'error' }));
  };

  const cambiarRol = (id, nuevoRol) => {
    api.patch(`/usuarios/rol/${id}`, { rol: nuevoRol })
      .then(() => {
        setSnackbar({ open: true, mensaje: 'Rol actualizado', tipo: 'success' });
        cargarUsuarios();
      })
      .catch(() => setSnackbar({ open: true, mensaje: 'Error al actualizar rol', tipo: 'error' }));
  };

  const cambiarEstado = (id, nuevoEstado) => {
    api.patch(`/usuarios/estado/${id}`, { activo: nuevoEstado })
      .then(() => {
        setSnackbar({ open: true, mensaje: 'Estado actualizado', tipo: 'success' });
        cargarUsuarios();
      })
      .catch(() => setSnackbar({ open: true, mensaje: 'Error al cambiar estado', tipo: 'error' }));
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    {
      field: 'rol',
      headerName: 'Rol',
      width: 140,
      renderCell: (params) => (
        <Tooltip title="Cambiar rol">
          <IconButton onClick={() => cambiarRol(params.row.id, params.row.rol === 'admin' ? 'usuario' : 'admin')}>
            {params.row.rol === 'admin' ? <AdminPanelSettingsIcon color="secondary" /> : <PersonIcon color="primary" />}
          </IconButton>
        </Tooltip>
      )
    },
    {
      field: 'verificado',
      headerName: 'Verificado',
      width: 120,
      renderCell: (params) => (
        <Chip label={params.row.verificado ? 'Sí' : 'No'} color={params.row.verificado ? 'success' : 'default'} size="small" />
      )
    },
    {
      field: 'activo',
      headerName: 'Activo',
      width: 110,
      renderCell: (params) => (
        <Tooltip title="Activar/Desactivar">
          <IconButton onClick={() => cambiarEstado(params.row.id, !params.row.activo)}>
            {params.row.activo ? <ToggleOnIcon color="success" /> : <ToggleOffIcon color="disabled" />}
          </IconButton>
        </Tooltip>
      )
    }
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Gestión de Usuarios</Typography>

      <Box sx={{ height: 500, width: '100%', mt: 2 }}>
        <DataGrid
          rows={usuarios}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
        />
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.mensaje}
      />
    </Box>
  );
}

export default UsuariosAdmin;
