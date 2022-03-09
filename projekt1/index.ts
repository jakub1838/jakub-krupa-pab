import { OperationCanceledException } from "typescript"

const express = require('express')  
const app = express()  
app.get('/', function (req, res) {  
  const num1 = +req.query.num1
  const num2 = +req.query.num2
  const operation = +req.query.operation
  
  const dodaj = num1 + num2
  const usun = num1 - num2
  const podziel = num1 / num2
  const pomnoz = num1 * num2

  if (operation == dodaj){
    res.send(dodaj.toString())
  }else if (operation == usun){
    res.send(usun.toString())
  }else if (operation == podziel){
    res.send(podziel.toString())
  }else if (operation == pomnoz){
    res.send(pomnoz.toString())
  }
})  
app.listen(3000)
