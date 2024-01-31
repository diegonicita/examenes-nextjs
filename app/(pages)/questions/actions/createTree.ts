type Commentario = {
  id: number
  id_question: number
  id_user: number
  comment_text: string
  id_parent_comment: number | null
}

type CommentNode = {
  comment: Commentario
  children?: CommentNode[]
}

type CommentTree = { [key: number]: CommentNode[] }

function createTree(comentarios: Commentario[], key: number) {
  const tree: CommentTree = {}
  comentarios.forEach((comentario) => {
    const { id_parent_comment } = comentario
    if (id_parent_comment === null) {
      // Comentario principal sin padre, agregar como nodo principal en el árbol
      if (!tree[comentario.id_question]) {
        tree[comentario.id_question] = []
      }
      tree[comentario.id_question].push({ comment: comentario })
    } else {
      // Comentario con padre, buscar el nodo padre y agregar como hijo
      const nodoPadre = encontrarNodo(
        tree[comentario.id_question],
        id_parent_comment,
      )
      if (nodoPadre) {
        if (!nodoPadre.children) {
          nodoPadre.children = []
        }
        nodoPadre.children.push({ comment: comentario })
      }
    }
  })

  return tree[key]
}

function encontrarNodo(
  nodos: CommentNode[] | undefined,
  id: number,
): CommentNode | undefined {
  if (!nodos) return undefined

  for (const nodo of nodos) {
    if (nodo.comment.id === id) {
      return nodo
    }
    const nodoHijo = encontrarNodo(nodo.children, id)
    if (nodoHijo) {
      return nodoHijo
    }
  }

  return undefined
}

export default createTree
