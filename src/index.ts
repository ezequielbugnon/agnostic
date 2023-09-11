import * as fs from 'fs';

function crearArbolCarpetasConArchivos(outputPath: string, estructuraCarpetas: Record<string, any>) {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  for (const nombreCarpeta in estructuraCarpetas) {
    const carpetaPath = `${outputPath}/${nombreCarpeta}`;

    if (typeof estructuraCarpetas[nombreCarpeta] === 'object') {
      crearArbolCarpetasConArchivos(carpetaPath, estructuraCarpetas[nombreCarpeta]);
    } else if (typeof estructuraCarpetas[nombreCarpeta] === 'string') {
      const contenidoArchivo = estructuraCarpetas[nombreCarpeta];
      fs.writeFileSync(`${carpetaPath}`, contenidoArchivo);
    }
  }
}

const outputPath = './output'; // Ruta de la carpeta de salida
const estructuraCarpetas = {
  Carpeta1: {
    Subcarpeta1: {
      'archivo1.txt': 'Contenido del archivo 1',
      'archivo2.txt': 'Contenido del archivo 2',
    },
    Subcarpeta2: {},
  },
  Carpeta2: {
    Subcarpeta3: {
      'archivo3.txt': 'Contenido del archivo 3',
    },
  },
  Carpeta3: {},
  'archivo4.txt': 'Contenido del archivo 4',
};

crearArbolCarpetasConArchivos(outputPath, estructuraCarpetas);

