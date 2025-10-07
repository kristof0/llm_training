# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a multi-project repository containing several distinct applications:

- `02_python_tools/pk-fancy-pack/` - Python package using hatchling build system
- `03_python_fastapi_project/` - FastAPI backend for online market with product and basket management
- `04_market/` - Vue 3 + TypeScript frontend application with Vite
- `05_design/` - React + TypeScript frontend for online market with shopping cart

## Development Commands

### Python Package (02_python_tools/pk-fancy-pack/)
- Build package: `python -m build` (from pk-fancy-pack directory)
- Install in development mode: `pip install -e .`

### FastAPI Backend (03_python_fastapi_project/)
- Install dependencies: `uv sync`
- Run development server: `uv run uvicorn main:app --reload` or `python -m uvicorn main:app --reload`
- Run production server: `uv run uvicorn main:app --host 0.0.0.0 --port 8000`
- Seed sample data: `python seed_data.py`
- Run tests: `uv run pytest`
- Format code: `uv run black .` and `uv run isort .`
- Lint code: `uv run flake8 .`

### Vue Frontend (04_market/)
- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Type checking: `vue-tsc -b`

### React Frontend (05_design/)
- Install dependencies: `npm install`
- Start development server: `npm start`
- Build for production: `npm run build`
- Run tests: `npm test`

## Architecture Overview

### FastAPI Backend (03_python_fastapi_project/)
- Uses SQLAlchemy with async SQLite (aiosqlite)
- Pydantic models for data validation and serialization
- Product management CRUD endpoints
- Shopping basket/cart endpoints with quantity management
- CORS enabled for frontend connections
- Environment configuration with python-dotenv
- Database file: `app.db` (created automatically)
- Sample data seeding script available

### React Frontend (05_design/)
- React 18 with TypeScript
- Create React App setup
- Shopping cart with foldable basket widget (bottom-left corner)
- Product CRUD operations with modal forms
- Search and filter functionality
- Axios for HTTP requests to backend
- Components:
  - Basket (foldable shopping cart widget)
  - ProductCard, ProductList
  - ProductForm (create/edit)
  - ProductDetails (view modal)
  - DeleteProductDialog (confirmation)

### Vue Frontend (04_market/)
- Vue 3 with Composition API and `<script setup>` syntax
- TypeScript for type safety
- Vite as build tool and development server
- Components: ProductCard, ProductGrid, ProductModal
- Axios for HTTP requests

## Project Dependencies

### Python Projects
- FastAPI project uses `uv` for dependency management
- Python package uses standard `pip`/`build` toolchain

### Frontend Project  
- Uses npm for package management
- Vite for bundling and development server
- Vue 3 with TypeScript support