import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Table(props) {
    return (
        <table className="table">
            <thead>
                <tr className='header-table table-row'>
                    <td className="header-table-item table-item">Дата покупки</td>
                    <td className="header-table-item table-item">Киоск</td>
                    <td className="header-table-item table-item">Тип</td>
                    <td className="header-table-item table-item">Статус оплаты</td>
                    <td className="header-table-item table-item">Оплата</td>
                    <td className="header-table-item table-item">Сумма</td>
                    <td className="header-table-item table-item">Кол-во товара</td>
                    <td className="header-table-item table-item">Товары</td>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map((item, i) => {
                        return <TableItem key={i} data={item} deleteItem={props.deleteItem} index={i}/>
                    })
                }
            </tbody>
        </table>
    );
}

const TableItem = ({data, deleteItem, index}) => {
    const sum = data.pays.reduce((acc, n) => acc + n.sum, 0);
    const productCount = data.positions.reduce((acc, n) => acc + n.quantity, 0);
    return (
        <tr className='main-table table-row'>
            <td className="table-item">{data.dateReg}</td>
            <td className="table-item">{data.kioskName}</td>
            <td className="table-item">
                {data.chequeType ? 'Возврат' : 'Продажа'}
            </td>
            <td className="main-table-item table-item">{
                sum === data.sum ? 'Оплачено' : sum ? 'Недоплата' : 'Нет оплаты'
                }
            </td>
            <td className="table-item">{sum}
            </td>
            <td className="table-item">{data.sum}</td>
            <td className="table-item">{productCount}
            </td>
            <td className="table-item">{
                [...data.positions].map((item, i) => {
                    if (i < data.positions.length - 1)
                        return item.name + ', '
                    return item.name
                })
            }
            </td>
            <td className='delete' 
            icon={["fal", "coffee"]}
            onClick={() => {
                let result = window.confirm('Вы уверены что хотите удалить элемент?');
                console.log(result)
                result && deleteItem(index)
            }}><FontAwesomeIcon icon={faTimes} /></td>
        </tr>
    )
}

export default Table;