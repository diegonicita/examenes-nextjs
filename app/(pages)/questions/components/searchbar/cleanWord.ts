export function cleanWord(palabra: string) {
  // Reemplaza los caracteres acentuados por sus equivalentes sin acentos
  palabra = palabra
    .replace(/[áÁ]/g, 'a')
    .replace(/[éÉ]/g, 'e')
    .replace(/[íÍ]/g, 'i')
    .replace(/[óÓ]/g, 'o')
    .replace(/[úÚüÜ]/g, 'u')
  return palabra.replace(/^[([.,:;?!¡¿]+|[)\].,;:?!\¡\¿]+|[.,:;?!¡¿]+$/g, '')
}
