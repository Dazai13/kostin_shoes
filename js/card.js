document.addEventListener('DOMContentLoaded', function() {
  // Находим все товары в каталоге
  const catalogItems = document.querySelectorAll('.catalog__content-item');
  
  // Для каждого товара настраиваем переключение цветов
  catalogItems.forEach(item => {
    // Находим элементы внутри конкретного товара
    const colorItems = item.querySelectorAll('.catalog-color');
    const mainImage = item.querySelector('.catalog__item-image');
    
    // Добавляем обработчик клика для каждого цвета в товаре
    colorItems.forEach((colorItem, index) => {
      colorItem.addEventListener('click', function() {
        // Удаляем класс active у всех цветов в этом товаре
        colorItems.forEach(color => {
          color.classList.remove('active');
        });
        
        // Добавляем класс active только к выбранному цвету
        this.classList.add('active');
        
        // Меняем изображение товара
        // Предполагаем, что имена файлов следуют шаблону catalog__item-X-Y.png
        // Где X - номер товара, Y - номер цвета
        // Или другой логике, которую вам нужно реализовать
        
        // Пример 1: если у вас просто последовательные номера для каждого цвета
        // mainImage.src = `images/catalog__item-${index + 1}.png`;
        
        // Пример 2: если нужно учитывать и номер товара и номер цвета
        // Получаем номер товара (например, из data-атрибута)
        const itemNumber = item.dataset.itemNumber || '1'; // если нет атрибута, используем '1'
        mainImage.src = `images/catalog__item-${itemNumber}-${index + 1}.png`;
        
        // Если у вас другая логика формирования имен файлов, измените эту строку
      });
    });
  });
});