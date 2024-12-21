# pdf-reciept
Make a PDF look like a reciept allowing it to be printed from label printers

## Getting Started

First, run the development server:

```bash
npm run dev
```

## To Build
```bash
npm run build
docker build -t pdf-reciept .
```

## To Run In Docker
```bash
docker run -p 8080:80 pdf-reciept
```

# Starting Point
```bash
npx create-next-app@latest
```