# Лабораторна робота №5  
**Тема:** Організація стану застосунку за допомогою Redux Toolkit  
**Проєкт:** Maze Runner

## 1. Мета роботи
Реалізувати глобальний стан застосунку за допомогою Redux Toolkit та забезпечити модульну структуру стейту.

## 2. Виконано
- Впроваджено Redux Toolkit як основний стейт-менеджер.
- Створено модулі:
  - store.js
  - gameSettingsSlice.js
  - gameStateSlice.js
- Оновлено сторінки (MenuPage, GamePage, ResultPage) на основі useSelector/useDispatch.
- Видалено контексти GameSettingsContext та GameStateContext.
- Налаштовано App.js та index.js для роботи з Redux.

## 3. Результат
Стан застосунку централізовано у Redux Toolkit, логіку відокремлено від UI, дублювання стейту усунуто.

## 4. Висновок
Вимоги Лабораторної роботи №5 виконані повністю.
