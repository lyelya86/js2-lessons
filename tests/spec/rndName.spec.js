describe ('Сравнение (сопоставление) значение', () => {
    it ('Простые числа - 1', () => {
        let a = 10
        expect (a).toBe (10)
    })
    it ('Простые числа - 2', () => {
        let a = 100
        expect (a).toBe (10)
    })
    it ('Простые числа - 3', () => {
        let a = '123'
        expect (a).toBe ('123')
    })
    it ('Объекты', () => {
        let ob = {
            name: 'Qwert',
            age: 20
        }
        let ob2 = {
            name: 'Qwert',
            age: 21
        }

        expect (ob).toEqual (ob2)
    })
})