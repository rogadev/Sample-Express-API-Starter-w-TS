/* eslint-disable */
// Styles are Bootstrap 5 only - NOT TAILWIND

import fetchAndRenderOrders from './getOrders.js'

const form = document.getElementById('new-order')

// Create our form.
const formObject = document.createElement('form')
formObject.action = '/api/orders'
formObject.method = 'POST'

const PizzaType = [
  'Canadian',
  'Cheese',
  'Hawaiian',
  'Meat Lovers',
  'Pepperoni',
  'Vegetarian',
]

const CrustType = ['cauliflower', 'deep dish', 'regular', 'thin crust']

const PizzaSize = ['individual', 'small', 'medium', 'large']

// Create our form fields.
// Order Date
// Order Type
// Crust Type
// Size
// Quantity
// Price Ea.

const orderDateLabel = document.createElement('label')
orderDateLabel.innerText = 'Order Date'
orderDateLabel.classList.add('form-label')

const orderDate = document.createElement('input')
orderDate.type = 'date'
orderDate.name = 'orderDate'
orderDate.required = true
orderDate.classList.add('form-control')

const orderTypeLabel = document.createElement('label')
orderTypeLabel.innerText = 'Order Type'
orderTypeLabel.classList.add('form-label')

const orderType = document.createElement('select')
orderType.name = 'type'
orderType.required = true
orderType.classList.add('form-select')

for (const type of PizzaType) {
  const option = document.createElement('option')
  option.value = option.innerText = type
  orderType.append(option)
}

const crustTypeLabel = document.createElement('label')
crustTypeLabel.innerText = 'Crust Type'
crustTypeLabel.classList.add('form-label')

const crustType = document.createElement('select')
crustType.name = 'crust'
crustType.required = true
crustType.classList.add('form-select')

for (const type of CrustType) {
  const option = document.createElement('option')
  option.value = option.innerText = type
  crustType.append(option)
}

const pizzaSizeLabel = document.createElement('label')
pizzaSizeLabel.innerText = 'Pizza Size'
pizzaSizeLabel.classList.add('form-label')

const pizzaSize = document.createElement('select')
pizzaSize.name = 'size'
pizzaSize.required = true
pizzaSize.classList.add('form-select')

for (const size of PizzaSize) {
  const option = document.createElement('option')
  option.value = option.innerText = size
  pizzaSize.append(option)
}

const quantityLabel = document.createElement('label')
quantityLabel.innerText = 'Quantity'
quantityLabel.classList.add('form-label')

const quantity = document.createElement('input')
quantity.type = 'number'
quantity.name = 'quantity'
quantity.required = true
quantity.classList.add('form-control')

const priceLabel = document.createElement('label')
priceLabel.innerText = 'Price'
priceLabel.classList.add('form-label')

const price = document.createElement('input')
price.type = 'number'
price.name = 'pricePer'
price.min = 0.01
price.step = 0.01
price.max = 1000
price.required = true
price.classList.add('form-control')

// Create our submit button.
const submitButton = document.createElement('button')
submitButton.type = 'submit'
submitButton.innerText = 'Submit'
submitButton.classList.add('btn', 'btn-primary')

// Append our form fields to the form.
formObject.append(
  orderDateLabel,
  orderDate,
  orderTypeLabel,
  orderType,
  crustTypeLabel,
  crustType,
  pizzaSizeLabel,
  pizzaSize,
  quantityLabel,
  quantity,
  priceLabel,
  price,
  submitButton
)

// Append our form to the DOM.
form.append(formObject)

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  // Clear our Orders table of old data.
  const ordersTable = document.getElementById('order-list')
  ordersTable.innerHTML = 'Loading...'

  const formData = new FormData(formObject)
  const order = Object.fromEntries(formData.entries())

  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })

  if (response.ok) {
    // clear out the form values
    formObject.reset()
  } else {
    const { errors } = await response.json()
    // each error's key will be the same as the input's name
    // append an error message for each error string in the array for each key
    const numberOfErrors = Object.keys(errors).length
    if (numberOfErrors > 0) {
      const errorList = document.createElement('ul')
      errorList.classList.add('list-group')
      for (const key in errors) {
        const error = document.createElement('li')
        error.classList.add('list-group-item', 'list-group-item-danger')
        error.innerText = `${key}: ${errors[key]}`
        errorList.append(error)
      }
      formObject.append(errorList)
    }
  }

  ordersTable.innerHTML = ''
  fetchAndRenderOrders()
})
