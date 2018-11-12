/**
 *
 * UploadTolls
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import api from 'config/axiosInstance';
import uuidv4 from 'uuid/v4';

// Semantic
import { Header, Segment } from 'semantic-ui-react';

// Ant
import message from 'antd/lib/message';
import Button from 'antd/lib/button';

// Components
import { withAuth } from 'containers/Auth';
import InputFile from 'components/InputFile';
import ErrorsListModal from 'components/ErrorsListModal';

class TollsUploaderPage extends Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
  };

  state = {
    loading: false,
    errors: [],
    error: false,
    loadingDownload: false,
  };

  onUpload = async file => {
    const errors = [];
    const reader = new FileReader();
    const rABS = false;
    this.setState({ loading: true });
    reader.onload = async e => {
      let data = e.target.result;
      if (!rABS) data = new Uint8Array(data);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      data = XLSX.utils.sheet_to_json(worksheet);
      console.log(data);
      const normalizedData = data.map((item, counter) => {
        const row = counter + 2;
        const {
          Nombre: name,
          Departamento: state,
          'Precios por Categoria': categoryPrices,
          Coordenadas: coordinates,
          Telefono: phone,
          Grua: towTruck,
        } = item;
        if (!name) {
          errors.push({
            id: uuidv4(),
            row,
            error: 'El nombre no puede estar vacío.',
          });
        }
        if (!state) {
          errors.push({
            id: uuidv4(),
            row,
            error: 'La categoría no puede estar vacía.',
          });
        }
        if (!categoryPrices || categoryPrices.split(',').length < 1) {
          errors.push({
            id: uuidv4(),
            row,
            error: 'Debe haber al menos un valor en el precio del peaje.',
          });
        }
        if (!coordinates || coordinates.split(',').length < 2) {
          errors.push({
            id: uuidv4(),
            row,
            error:
              'Las coordenadas no pueden estar vacías. Debe haber Latitud y Longitud.',
          });
        }
        return {
          name,
          state,
          categoryPrices: categoryPrices ? categoryPrices.split(',') : [],
          coordinates: coordinates ? coordinates.split(',') : [],
          phone: phone || null,
          towTruck: towTruck || null,
        };
      });
      console.log(errors);
      if (errors.length < 1) {
        try {
          await api.put(
            '/tollCollectors',
            {
              data: normalizedData,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${this.props.userData.token}`,
              },
            },
          );
          this.setState({ loading: false });
          message.success('Archivo procesado correctamente');
        } catch (error) {
          message.error('Hubo un error. Intente nuevamente');
          throw error;
        }
      } else {
        message.error(
          'Se encontraron algunos errores. Corríjalos y vuelva a intentarlo',
        );
        this.setState({ loading: false, errors, error: true });
      }
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  downloadTollCollectors = async () => {
    this.setState({
      loadingDownload: true,
    });
    try {
      const { data } = await api.get('/tollCollectors', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const tollCollectors = [];
      for (let i = 0; i < data.customId.length; i += 1) {
        tollCollectors.push({
          Nombre: data.name[i],
          Departamento: data.state[i],
          'Precios por Categoria': data.categoryPrices[i].join(),
          Coordenadas: data.coordinates[i].join(),
          Telefono: data.phone[i],
          Grua: data.towTruck[i],
        });
      }
      const ws = XLSX.utils.json_to_sheet(tollCollectors, {
        header: [
          'Nombre',
          'Departamento',
          'Precios por Categoria',
          'Coordenadas',
          'Telefono',
          'Grua',
        ],
      });
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'peajes');
      XLSX.writeFile(wb, 'listado-peajes-rutas-por-colombia.xlsx');
      this.setState({
        loadingDownload: false,
      });
      message.success('Se generó el archivo correctamente');
    } catch (error) {
      this.setState({
        loadingDownload: false,
      });
      message.error('Ocurrió un error inesperado, intente nuevamente');
    }
  };

  closeModalError = () => {
    this.setState({ error: false, errors: [] });
  };

  render() {
    const { loading, errors, error, loadingDownload } = this.state;
    return (
      <div>
        <Header as="h2" textAlign="center">
          Cargar listado de Peajes
        </Header>
        <InputFile
          size={32}
          format=".xlsx"
          buttonText="Cargar peajes"
          text="Sube tu archivo de peajes en formato .xlsx"
          onUpload={this.onUpload}
          loading={loading}
        />
        <ErrorsListModal
          errors={errors}
          open={error}
          onClose={this.closeModalError}
        />
        <Segment textAlign="center">
          <Button
            type="primary"
            icon="download"
            loading={loadingDownload}
            onClick={this.downloadTollCollectors}
          >
            Descargar listado de peajes
          </Button>
        </Segment>
      </div>
    );
  }
}

export default withAuth(TollsUploaderPage);
