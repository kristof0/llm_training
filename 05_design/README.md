# Online Market - React Frontend

A React-based frontend application for an online market with shopping cart functionality.

## Features

- Product browsing with search functionality
- Product CRUD operations (Create, Read, Update, Delete)
- Shopping cart/basket with:
  - Add products to basket
  - Adjust product quantities
  - Remove items from basket
  - Clear entire basket
  - View total price
  - Foldable basket widget in bottom-left corner
- Responsive design for mobile and desktop
- Integration with FastAPI backend

## Tech Stack

- React 18
- TypeScript
- Axios for API calls
- Create React App

## Prerequisites

- Node.js and npm installed
- Backend API running on `http://localhost:8000` (see `03_python_fastapi_project`)

## Installation

Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm start
```

The application will be available at `http://localhost:3000`

The page will reload when you make changes. You may also see any lint errors in the console.

### Production Build

```bash
npm run build
```

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### Run Tests

```bash
npm test
```

Launches the test runner in the interactive watch mode.

## Application Structure

```
src/
├── components/         # React components
│   ├── Basket.tsx     # Shopping basket widget (foldable)
│   ├── ProductCard.tsx    # Individual product display
│   ├── ProductList.tsx    # Product grid/list view
│   ├── ProductForm.tsx    # Create/Edit product form
│   ├── ProductDetails.tsx # Product detail modal
│   └── DeleteProductDialog.tsx
├── services/          # API service layer
│   ├── productService.ts  # Product API calls
│   └── basketService.ts   # Basket API calls
├── types/             # TypeScript type definitions
│   ├── Product.ts
│   └── Basket.ts
├── App.tsx           # Main application component
├── App.css           # Global styles
└── index.tsx         # Application entry point
```

## Key Features

### Shopping Basket
- **Foldable Widget**: Click the basket header to expand/collapse
- **Bottom-Left Position**: Fixed position basket that stays visible while scrolling
- **Quantity Controls**: Increase/decrease product quantities
- **Stock Validation**: Prevents adding more items than available stock
- **Total Calculation**: Real-time total price calculation

### Product Management
- **Search**: Filter products by name or description
- **Add Product**: Create new products with name, price, description, and stock
- **Edit Product**: Update existing product details
- **Delete Product**: Remove products with confirmation dialog
- **View Details**: See full product information in a modal

## API Integration

The frontend connects to the FastAPI backend at `http://localhost:8000` with the following endpoints:

### Products
- `GET /products/` - Fetch all products
- `GET /products/{id}` - Fetch single product
- `POST /products/` - Create new product
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Delete product

### Basket
- `GET /basket/` - Fetch basket items
- `POST /basket/` - Add item to basket
- `PUT /basket/{item_id}` - Update basket item quantity
- `DELETE /basket/{item_id}` - Remove basket item
- `DELETE /basket/` - Clear entire basket

## Styling

The application uses custom CSS with:
- Clean, modern design
- Responsive grid layout
- Smooth transitions and hover effects
- Fixed-position foldable basket widget
- Mobile-friendly responsive breakpoints

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
