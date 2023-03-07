/* eslint-disable */

// HELPERS
const orderList = document.getElementById('order-list')
/**
 * Capital Case Function
 * Take a string and return it in capital case. 'some thing' => 'Some Thing'. 'thing' => 'Thing'
 */
const capitalCase = (str) => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
/**
 * Create the header row for the order list.
 */
const createHeaderRow = () => {
  // Create the header row elements
  const headerRow = document.createElement('div')
  const orderDateHeader = document.createElement('div')
  const orderNumberHeader = document.createElement('div')
  const orderTypeHeader = document.createElement('div')
  const crustTypeHeader = document.createElement('div')
  const sizeHeader = document.createElement('div')
  const quantityHeader = document.createElement('div')
  const priceHeader = document.createElement('div')
  const totalHeader = document.createElement('div')

  // Add classes for the header row
  headerRow.classList.add('row', 'border')
  headerRow.style.fontWeight = 'bold'
  orderNumberHeader.classList.add('col')
  orderDateHeader.classList.add('col')
  orderTypeHeader.classList.add('col')
  crustTypeHeader.classList.add('col')
  sizeHeader.classList.add('col')
  priceHeader.classList.add('col')
  quantityHeader.classList.add('col')
  totalHeader.classList.add('col')

  // Add the text for the headers
  orderDateHeader.innerText = 'Order Date'
  orderNumberHeader.innerText = 'Order #'
  orderTypeHeader.innerText = 'Order Type'
  crustTypeHeader.innerText = 'Crust Type'
  sizeHeader.innerText = 'Size'
  quantityHeader.innerText = 'Quantity'
  priceHeader.innerText = 'Price Ea.'
  totalHeader.innerText = 'Total'

  // Append all the headers to the header row.
  headerRow.append(
    orderDateHeader,
    orderNumberHeader,
    orderTypeHeader,
    crustTypeHeader,
    sizeHeader,
    quantityHeader,
    priceHeader,
    totalHeader
  )

  // Append the header row to the order list.
  orderList.append(headerRow)
}

/**
 * Fetch the orders from the API and render them to the DOM.
 */
const fetchAndRenderOrders = async () => {
  // Get our orders from the API.
  let orders = await fetch('/api/orders').then((res) => res.json())
  /**
   * Sort the orders by date. Newest first.
   */
  orders = orders.sort((a, b) => {
    if (a.orderDate < b.orderDate) {
      return -1
    }
    if (a.orderDate > b.orderDate) {
      return 1
    }
    return 0
  })

  createHeaderRow()

  for (const order of orders) {
    // Create a div for the order.
    const orderDiv = document.createElement('div')
    orderDiv.classList.add('row', 'border')
    orderDiv.style.cursor = 'pointer'

    // Make the order div clickable.
    orderDiv.onclick = () => {
      window.location.href = `/orders/${order.id}`
    }

    // Order Date Cell (Sorted)
    const orderDateDiv = document.createElement('div')
    orderDateDiv.classList.add('col')
    orderDateDiv.innerText = capitalCase(order.orderDate)

    // Order Number Cell
    const orderNumberDiv = document.createElement('div')
    orderNumberDiv.classList.add('col')
    orderNumberDiv.innerText = order.id

    // Order Type Cell
    const orderTypeDiv = document.createElement('div')
    orderTypeDiv.classList.add('col')
    orderTypeDiv.innerText = capitalCase(order.type)

    // Crust Type Cell
    const crustTypeDiv = document.createElement('div')
    crustTypeDiv.classList.add('col')
    crustTypeDiv.innerText = capitalCase(order.crust)

    // Size Cell
    const sizeDiv = document.createElement('div')
    sizeDiv.classList.add('col')
    sizeDiv.innerText = capitalCase(order.size)

    // Quantity Cell
    const quantityDiv = document.createElement('div')
    quantityDiv.classList.add('col')
    quantityDiv.innerText = order.quantity

    // Price Cell
    const priceDiv = document.createElement('div')
    priceDiv.classList.add('col')
    priceDiv.innerText = `${Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(order.pricePer)}`

    // Total Cell
    const totalDiv = document.createElement('div')
    totalDiv.classList.add('col')
    totalDiv.innerText = `${Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(order.pricePer * order.quantity)}`

    // Append all the cells to the order div.
    orderDiv.append(
      orderDateDiv,
      orderNumberDiv,
      orderTypeDiv,
      crustTypeDiv,
      sizeDiv,
      quantityDiv,
      priceDiv
    )

    // Append the order div to the order list.
    orderList.append(orderDiv)
  }
}

fetchAndRenderOrders()

export default fetchAndRenderOrders
