import { Modal, Form, DatePicker, Cascader, InputNumber, Input } from 'antd';

function ModalAddNew({ visible, onCreate, onCancel }) {
  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: 'Введите дату!',
      },
    ],
  };

  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Добавить новый чек"
      okText="Добавить"
      cancelText="Отмена"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            alert('нееверные данные:');
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}>
        <Form.Item name="dateReg" label="Дата покупки" {...config}>
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        <Kiosks />

        <Type />

        <Form.Item name="pays" label="Оплата"
          rules={[{ required: true, message: 'Введите оплаченную сумму!' }]}>
          <InputNumber defaultValue={0} min={0} step={0.01} />
        </Form.Item>

        <Form.Item name="sum" label="Сумма"
          rules={[{ required: true, message: 'Введите сумму товара!' }]}>
          <InputNumber defaultValue={0} min={0} step={0.01} />
        </Form.Item>

        <Form.Item name="positions" label="Товары"
          rules={[{ required: true, message: 'Введите наименование товара!' }]}>
          <Input />
        </Form.Item>

      </Form>
    </Modal>
  );
}

const Type = props => {
  const typeOptions = [
    {
      value: 1,
      label: 'Возврат',
    },
    {
      value: 0,
      label: 'Продажа',
    },
  ];
  return (
    <Form.Item name="chequeType" label="Тип"
      rules={[{ required: true, message: 'Выберите тип!' }]}>
      <Cascader
        options={typeOptions}
        placeholder="Выберите тип" />
    </Form.Item>
  )
}

const Kiosks = props => {
  const kioskOptions = [
    {
      value: 'Киоск № 1',
      label: 'Киоск № 1',
    },
    {
      value: 'Киоск № 2',
      label: 'Киоск № 2',
    },
    {
      value: 'Киоск № 3',
      label: 'Киоск № 3',
    },
    {
      value: 'Киоск № 4',
      label: 'Киоск № 4',
    },
    {
      value: 'Киоск № 5',
      label: 'Киоск № 5',
    },
    {
      value: 'Киоск № 6',
      label: 'Киоск № 6',
    },
    {
      value: 'Киоск № 7',
      label: 'Киоск № 7',
    },
    {
      value: 'Киоск № 8',
      label: 'Киоск № 8',
    },
    {
      value: 'Киоск № 9',
      label: 'Киоск № 9',
    },
    {
      value: 'Киоск № 10',
      label: 'Киоск № 10',
    },
    {
      value: 'Киоск № 11',
      label: 'Киоск № 11',
    },
  ];

  return (
    <Form.Item name="kioskName" label="Киоск"
      rules={[{ required: true, message: 'Выберите Киоск!' }]}>
      <Cascader options={kioskOptions} placeholder="Выберите Киоск" />
    </Form.Item>
  )
}

export default ModalAddNew
