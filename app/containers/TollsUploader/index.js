/**
 *
 * UploadTolls
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import Helmet from 'react-helmet';
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
      const normalizedData = data.map((item, counter) => {
        const row = counter + 2;
        const {
          Nombre: name,
          Departamento: state,
          'Categoria 1': categoryPrice1,
          'Categoria 2': categoryPrice2,
          'Categoria 3': categoryPrice3,
          'Categoria 4': categoryPrice4,
          'Categoria 5': categoryPrice5,
          'Categoria 6': categoryPrice6,
          'Categoria 7': categoryPrice7,
          Latitud: latitude,
          Longitud: longitude,
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
        if (Number.isNaN(parseInt(categoryPrice1, 10))) {
          errors.push({
            id: uuidv4(),
            row,
            error:
              'Debe existir un valor para la Categoria 1. El campo debe ser de tipo entero.',
          });
        }
        if (Number.isNaN(parseInt(categoryPrice2, 10))) {
          errors.push({
            id: uuidv4(),
            row,
            error:
              'Debe existir un valor para la Categoria 2. El campo debe ser de tipo entero.',
          });
        }
        if (Number.isNaN(parseInt(categoryPrice3, 10))) {
          errors.push({
            id: uuidv4(),
            row,
            error:
              'Debe existir un valor para la Categoria 3. El campo debe ser de tipo entero.',
          });
        }
        if (Number.isNaN(parseInt(categoryPrice4, 10))) {
          errors.push({
            id: uuidv4(),
            row,
            error:
              'Debe existir un valor para la Categoria 4. El campo debe ser de tipo entero.',
          });
        }
        if (Number.isNaN(parseInt(categoryPrice5, 10))) {
          errors.push({
            id: uuidv4(),
            row,
            error:
              'Debe existir un valor para la Categoria 5. El campo debe ser de tipo entero.',
          });
        }
        if (Number.isNaN(parseFloat(latitude))) {
          errors.push({
            id: uuidv4(),
            row,
            error:
              'La latitud no puede estar vacía. El campo debe ser de tipo decimal.',
          });
        }
        if (Number.isNaN(parseFloat(longitude))) {
          errors.push({
            id: uuidv4(),
            row,
            error:
              'La longitud no puede estar vacía. El campo debe ser de tipo decimal.',
          });
        }
        const prices = [
          categoryPrice1,
          categoryPrice2,
          categoryPrice3,
          categoryPrice4,
          categoryPrice5,
          Number.isNaN(parseInt(categoryPrice6, 10)) ? null : categoryPrice6,
          Number.isNaN(parseInt(categoryPrice7, 10)) ? null : categoryPrice7,
        ];
        return {
          name,
          state,
          prices,
          coordinates: { lat: latitude, lng: longitude },
          phone: phone || null,
          towTruck: towTruck || null,
        };
      });
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
                Authorization: `Bearer ${this.props.userData.session.token}`,
              },
            },
          );
          message.success('Archivo procesado correctamente');
        } catch (error) {
          message.error(
            'Hubo un error al subir el archivo. Intente nuevamente',
          );
          throw error;
        } finally {
          this.setState({ loading: false });
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
          Authorization: `Bearer ${this.props.userData.session.token}`,
        },
      });
      const tollCollectors = [];
      for (let i = 0; i < data.length; i += 1) {
        const [price1, price2, price3, price4, price5, price6, price7] = data[
          i
        ].prices;
        const { lat, lng } = data[i].coordinates;
        tollCollectors.push({
          Nombre: data[i].name,
          Departamento: data[i].state,
          'Categoria 1': price1 ? parseInt(price1, 10) : null,
          'Categoria 2': price2 ? parseInt(price2, 10) : null,
          'Categoria 3': price3 ? parseInt(price3, 10) : null,
          'Categoria 4': price4 ? parseInt(price4, 10) : null,
          'Categoria 5': price5 ? parseInt(price5, 10) : null,
          'Categoria 6': price6 ? parseInt(price6, 10) : null,
          'Categoria 7': price7 ? parseInt(price7, 10) : null,
          Latitud: parseFloat(lat),
          Longitud: parseFloat(lng),
          Telefono: data[i].phone,
          Grua: data[i].towTruck,
        });
      }
      const ws = XLSX.utils.json_to_sheet(tollCollectors, {
        header: [
          'Nombre',
          'Departamento',
          'Categoria 1',
          'Categoria 2',
          'Categoria 3',
          'Categoria 4',
          'Categoria 5',
          'Categoria 6',
          'Categoria 7',
          'Latitud',
          'Longitud',
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
      throw error;
    }
  };

  closeModalError = () => {
    this.setState({ error: false, errors: [] });
  };

  render() {
    const { loading, errors, error, loadingDownload } = this.state;
    return (
      <div>
        <Helmet>
          <title>Cargar peajes | Rutas por Colombia</title>
        </Helmet>
        <Header as="h2" textAlign="center">
          Cargar listado de Peajes
        </Header>
        <InputFile
          size={32}
          format=".xlsx"
          buttonText="Cargar peajes"
          draggerZoneText="Haz click o arrastra aquí el archivo"
          text="Tu archivo debe estar en formato de Excel .xlsx"
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
