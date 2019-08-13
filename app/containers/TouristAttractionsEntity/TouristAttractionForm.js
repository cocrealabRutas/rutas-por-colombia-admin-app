/**
 *
 * TouristAttractionForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose, defaultProps } from 'recompose';

// Antd
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import InputNumber from 'antd/lib/input-number';
import Button from 'antd/lib/button';

// Semantic
import { Segment, Header } from 'semantic-ui-react';

// Components
import withEntityFormBasicOperations from 'components/EntityFormBasicOperations';
import { MultipleImageUploader } from 'components/ImagesUploader';
import uploaderImagesValidator from 'components/ImagesUploader/validators';

const FormItem = Form.Item;
const { TextArea } = Input;

/* eslint-disable react/prefer-stateless-function */
class TouristAttractionForm extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitData(values);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      loading,
      data,
      action,
    } = this.props;
    return (
      <div>
        <Segment basic textAlign="center">
          <Header as="h2">{`${
            action === 'Edit' ? 'Editar' : 'Nuevo'
          } Sitio Turístico`}</Header>
        </Segment>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Imágenes">
            {getFieldDecorator('images', {
              initialValue: data.images || [],
              rules: [{ validator: uploaderImagesValidator, required: true }],
            })(<MultipleImageUploader name="Imágenes" />)}
          </FormItem>
          <FormItem label="Nombre">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Debes ingresar el nombre del lugar',
                },
              ],
              initialValue: data.name || '',
            })(<Input placeholder="Nombre" name="name" />)}
          </FormItem>
          <FormItem label="Descripción">
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                  message: 'Debes ingresar una descripción',
                },
              ],
              initialValue: data.description || '',
            })(
              <TextArea
                placeholder="Descripción"
                name="description"
                rows={6}
              />,
            )}
          </FormItem>
          <FormItem label="Teléfono de contacto">
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: 'Debes ingresar un teléfono de contacto',
                },
              ],
              initialValue: data.phone || '',
            })(<Input placeholder="Teléfono de contacto" name="phone" />)}
          </FormItem>
          <FormItem label="Actividades que se pueden realizar">
            {getFieldDecorator('activities', {
              rules: [
                {
                  required: true,
                  message: 'Debes ingresar al menos una actividad',
                  type: 'array',
                },
              ],
              initialValue: data.activities || [],
            })(
              <Select
                mode="tags"
                name="activities"
                tokenSeparators={[',']}
                notFoundContent="Escribe al menos uno"
              />,
            )}
          </FormItem>
          <FormItem label="Coordenada geoespeacial: Latitud">
            {getFieldDecorator('lat', {
              rules: [{ required: true, message: 'Ingresa la latitud exacta' }],
              initialValue: data.lat || '',
            })(
              <InputNumber
                step={0.1}
                placeholder="Latitud"
                name="lat"
                style={{ width: '100%' }}
              />,
            )}
          </FormItem>
          <FormItem label="Coordenada geoespeacial: Longitud">
            {getFieldDecorator('lng', {
              rules: [
                { required: true, message: 'Ingresa la longitud exacta' },
              ],
              initialValue: data.lng || '',
            })(
              <InputNumber
                step={0.1}
                placeholder="Longitud"
                name="lng"
                style={{ width: '100%' }}
              />,
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
            >
              Guardar
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
TouristAttractionForm.propTypes = {
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  submitData: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
};

const enhance = compose(
  defaultProps({ entityPath: 'touristAttraction' }),
  withEntityFormBasicOperations,
  Form.create(),
);

export default enhance(TouristAttractionForm);
