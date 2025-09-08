# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a multi-project repository containing several distinct applications:

- `02_python_tools/pk-fancy-pack/` - Python package using hatchling build system
- `03_python_fastapi_project/` - FastAPI application with SQLAlchemy and SQLite
- `04_market/` - Vue 3 + TypeScript frontend application with Vite
- `05_design/` - Design assets directory

## Development Commands

### Python Package (02_python_tools/pk-fancy-pack/)
- Build package: `python -m build` (from pk-fancy-pack directory)
- Install in development mode: `pip install -e .`

### FastAPI Project (03_python_fastapi_project/)
- Install dependencies: `uv sync`
- Run development server: `uv run uvicorn main:app --reload`
- Run production server: `uv run uvicorn main:app --host 0.0.0.0 --port 8000`
- Run tests: `uv run pytest`
- Format code: `uv run black .` and `uv run isort .`
- Lint code: `uv run flake8 .`

### Vue Frontend (04_market/)
- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Type checking: `vue-tsc -b`

## Architecture Overview

### FastAPI Application
- Uses SQLAlchemy with async SQLite (aiosqlite)
- Pydantic models for data validation and serialization
- Product management CRUD endpoints
- Environment configuration with python-dotenv
- Database file: `app.db` (created automatically)

### Vue Frontend
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