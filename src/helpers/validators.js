/**
 * @file Домашка по FP ч. 1
 *

 */
import { allPass, anyPass, compose, equals, filter, prop, not, length, values, gte } from 'ramda'

const star = prop('star')
const square = prop('square')
const triangle = prop('triangle')
const circle = prop('circle')
//фигуры
const isWhite = equals('white')
const isRed = equals('red')
const isOrange = equals('orange')
const isGreen = equals('green')
const isBlue = equals('blue')
//цвета
const isRedStar = compose(isRed, star)
const isWhiteStar = compose(isWhite, star)
const isGreenSquare = compose(isGreen, square)
const isGreenCircle = compose(isGreen, circle)
const isGreenStar = compose(isGreen, star)
const isWhiteSquare = compose(isWhite, square)
const isWhiteTriangle = compose(isWhite, triangle)
const isWhiteCircle = compose(isWhite, circle)
const isBlueCircle = compose(isBlue, circle)
const isOrangeSquare = compose(isOrange, square)
const isOrangeTriangle = compose(isOrange, triangle)
const isOrangeCircle = compose(isOrange, circle)
const isOrangeStar = compose(isOrange, star)
const isGreenTriangle = compose(isGreen, triangle)
const isNotRedStar = compose(not, isRedStar)
const isNotWhiteStar = compose(not, isWhiteStar)
const isNotWhiteSquare = compose(not, isWhiteSquare)
const isNotWhiteTriangle = compose(not, isWhiteTriangle)
//фигуры+цвета
const greenCount = compose(length, filter(isGreen), values)
const blueCount = compose(length, filter(isBlue), values)
const redCount = compose(length, filter(isRed), values)
const orangeCount = compose(length, filter(isOrange), values)
//счетчики

const isOne = (number) => equals(number, 1)
const isTwo = (number) => equals(number, 2)
const isGreaterOrEquals2 = (number) => gte(number, 2)
const isGreaterOrEquals3 = (number) => gte(number, 3)

/////////
const squareAndTriangleSameColor = (obj) => equals(square(obj), triangle(obj))
const allSameColor = (color) => {
  switch (color) {
    case 'green':
      return allPass([isGreenSquare, isGreenTriangle, isGreenCircle, isGreenStar])
    case 'orange':
      return allPass([isOrangeSquare, isOrangeTriangle, isOrangeCircle, isOrangeStar])
    default:
      return
  }
}

export const validateFieldN1 = allPass([isRedStar, isGreenSquare, isWhiteTriangle, isWhiteCircle])
// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(isGreaterOrEquals2, greenCount)

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (obj) => equals(redCount(obj), blueCount(obj))

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([isBlueCircle, isRedStar, isOrangeSquare])

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = anyPass([compose(isGreaterOrEquals3, greenCount), compose(isGreaterOrEquals3, orangeCount), compose(isGreaterOrEquals3, redCount)])

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([compose(isTwo, greenCount), isGreenTriangle, compose(isOne, redCount)])

// 7. Все фигуры оранжевые.
export const validateFieldN7 = allSameColor('orange')

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([isNotRedStar, isNotWhiteStar])

// 9. Все фигуры зеленые.
export const validateFieldN9 = allSameColor('green')

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([squareAndTriangleSameColor, isNotWhiteSquare, isNotWhiteTriangle])
