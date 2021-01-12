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

    const convertDate = date => {
        let convertedDate = new Date(date);
        console.log('1 ', date)
        console.log('2', convertedDate)

        let year = convertedDate.getFullYear();
        let month = convertedDate.getMonth() + 1;
        let day = convertedDate.getDate();
        let hour = convertedDate.getHours()
        let minutes = convertedDate.getMinutes();
        let second = convertedDate.getSeconds();

        month = month < 10 ? '0' + month :  month;
        day = day < 10 ? '0' + day :  day;
        minutes = minutes < 10 ? '0' + minutes :  minutes;
        second = second < 10 ? '0' + second :  second;

        return (`${day}.${month}.${year}, ${hour}:${minutes}:${second}`)
    }

    const data = props.data.map((item, index) => {
        const sum = item.pays.reduce((acc, n) => acc + n.sum, 0);
        const productCount = item.positions.reduce((acc, n) => acc + n.quantity, 0);
        const status =() => {
            if (sum === item.sum || sum > item.sum)
                return 'Оплачено';
            else if (sum < item.sum)
                return 'Недоплата';
            else return 'Нет оплаты'; 
        }
        return {
            key: index,
            dateReg: convertDate(item.dateReg),
            kioskName: item.kioskName,
            chequeType: item.chequeType ? 'Возврат' : 'Продажа',
            status: status(),
            pay: sum / 100,
            sum: item.sum / 100,
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