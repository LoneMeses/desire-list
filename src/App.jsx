import React, {useState} from 'react';

const App = () => {
    const [desires, setDesires] = useState([])
    const [value, setValue] = useState('')

    const btnClickHandler = () => {
        setDesires(prevState => [...prevState, value])
        setValue('')
    }

    const deleteHandler = (post) => {
        setDesires(desires.filter(desire => desire !== post))
    }

    /*Почему такие стили
    На главный див(контейнер) я повесил дисплей=флекс чтобы я мог отцентровать инпут и кнопку.
    На инпут и кнопку и ирочее - чтобы красивее выглядели.
    И на див с желанием я тоже повесил флекс и justifyContent=space-between, чтобы текст и кнопка разъехались по сторонам
    */

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div>
                <input
                    style={{padding: 10, width: 400, borderRadius: 10, border: '1px solid black', marginRight: 10}}
                    type="text"
                    placeholder='Введите желание'
                    value={value}
                    onChange={e => setValue(e.target.value)} />
                <button
                    style={{padding: 10, backgroundColor: "#1E90FF", border: "none", borderRadius: 5, color: "white",}}
                    onClick={btnClickHandler}>Добавить</button>
            </div>
            <div style={{width:'100%',justifyContent:'center', marginTop: 40}}>
                {desires.length === 0 && <h1>Пока желаний нет.</h1>}
                {desires.map((desire, index) => {
                    return (
                        <div key={index} style={{display: "flex", justifyContent: 'space-between', alignItems: 'center', padding: 10, border: '1px solid gray', marginBottom: 10, borderRadius: 5}}>
                            {index + 1}. {desire}<button onClick={() => deleteHandler(desire)}>Удалить</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default App;


/*
Как можно адаптировать
Ну во первых, если это чисто список задач, то можно оставить реактовский useState, но если эти задачи
нужны были бы в других компонентах, то я бы использовал Redux Toolkit или MobX.
Для работы с бекендом я бы выполнял асинхронные запросы либо через js'овский fetch, либо через axios, либо через RTK Query
если бы использовался Redux.
Запросы типа POST для добавления желаний, GET для получения, и DELETE для удаления, причём я бы структурировал желание определённым образом,
потому что скорее всего они бы хранились в БД. Я бы добавил к желанию id, title, description. Это были бы объекты, а не просто строки.
Так их легче обрабатывать на бэке и сразу сохранять в бд.
Также я бы разделил этот компонент на несколько отдельных, допустим даже для списка желаний сделал бы DesireList.
 */