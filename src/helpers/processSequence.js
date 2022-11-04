/**
 * @file Домашка по FP ч. 2

 */
import { assoc, gt, length, lt, mathMod, __, compose, andThen, allPass, concat, tap, otherwise, partial, ifElse, prop, test } from 'ramda'
import Api from '../tools/api'

const api = new Api()

const NUMBERS_URL = 'https://api.tech/numbers/base'
const ANIMALS_URL = 'https://animals.tech/'

const getApiResult = compose(String, prop('result'))
const afterGetApiResult = andThen(getApiResult)

const moreThan2 = compose(gt(__, 2), length)
const lessThan10 = compose(lt(__, 10), length)

const isDigit = test(/^[0-9]+\.?[0-9]+$/)
const isValid = allPass([moreThan2, lessThan10, isDigit])

const convertToNumber = compose(Math.round, Number)
const convertToBinary = compose(api.get(NUMBERS_URL), assoc('number', __, { from: 10, to: 2 }))

const getLength = andThen(length)
const getSquare = andThen((val) => val ** 2)
const getModByThree = andThen(compose(String, mathMod(__, 3)))

const getAnimal = andThen(compose(api.get(__, {}), concat(ANIMALS_URL)))

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  const tapLog = tap(writeLog)
  const thenTapLog = andThen(tapLog)

  const afterHandleSuccess = andThen(handleSuccess)

  const otherwiseHandleError = otherwise(handleError)
  const handleValidationError = partial(handleError, ['ValidationError'])

  const doAndLog = (action) => compose(thenTapLog, action)

  const processComposition = compose(otherwiseHandleError, afterHandleSuccess, afterGetApiResult, getAnimal, doAndLog(getModByThree), doAndLog(getSquare), doAndLog(getLength), thenTapLog, afterGetApiResult, convertToBinary, tapLog, convertToNumber)

  compose(ifElse(isValid, processComposition, handleValidationError), tapLog)(value)
}
export default processSequence
