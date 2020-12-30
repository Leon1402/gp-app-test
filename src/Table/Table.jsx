import { Button, Table } from "antd";
import { useState } from "react";

function TableComponent(props) {

    const columns = [
        {
            title: 'Дата покупки',
            dataIndex: 'dateReg',
            key: 'dateReg',
        },
        {
            title: 'Киоск',
            dataIndex: 'kioskName',
            key: 'kioskName',
        },
        {
            title: 'Тип',
            dataIndex: 'chequeType',
            key: 'chequeType',
        },
        {
            title: 'Статус оплаты',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Оплата',
            dataIndex: 'pay',
            key: 'pay',
        },
        {
            title: 'Сумма',
            dataIndex: 'sum',
            key: 'sum',
        },
        {
            title: 'Кол-во товара',
            dataIndex: 'productCount',
            key: 'productCount',
        },
        {
            title: 'Товары',
            dataIndex: 'productsName',
            key: 'productsName',
        },
    ];

    const data = props.data.map((item, index) => {
        const sum = item.pays.reduce((acc, n) => acc + n.sum, 0);
        const productCount = item.positions.reduce((acc, n) => acc + n.quantity, 0);
        return {
            key: index,
            dateReg: item.dateReg,
            kioskName: item.kioskName,
            chequeType: item.chequeType ? 'Возврат' : 'Продажа',
            status: sum === item.sum ? 'Оплачено' : sum ? 'Недоплата' : 'Нет оплаты',
            pay: sum,
            sum: item.sum,
            productCount: productCount,
            productsName: item.positions.map((itm, i) => {
                if (i < item.positions.length - 1)
                    return itm.name + ', '
                return itm.name
            })
        }
    });


    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = item => {
        setSelectedRowKeys(item);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    };

    return (
        <div className="table">
            <Button danger
                type='primary'
                className={!selectedRowKeys.length ? 'disable' : 'active'}
                onClick={() => {
                    props.deleteItem(selectedRowKeys);
                    setSelectedRowKeys([]);
                }}
            >Удалить выбранные чеки</Button>
            <Table
                rowSelection={rowSelection}
                dataSource={data}
                columns={columns} />
        </div>
    )
}

export default TableComponent;