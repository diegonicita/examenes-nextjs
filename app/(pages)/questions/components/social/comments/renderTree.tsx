const RenderTree = ({
  tree,
  parentId,
  depth = 0,
}: {
  tree: any
  parentId: any
  depth: number
}) => {
  if (tree) {
    return tree.map(
      (t: {
        comment: {
          id: number
          id_parent_comment: number
          comment_text: string
        }
        children: object
      }) =>
        t.comment.id_parent_comment === parentId && (
          <div className="">
            <div className="" style={{ paddingLeft: `${depth * 20}px` }}>
              <span>ID:{t.comment.id}. </span>
              <span>
                PARENT:
                {t.comment.id_parent_comment
                  ? t.comment.id_parent_comment.toString() + '. '
                  : ' NULO. '}
              </span>
              <span className="bg-green-100">
                MENSAJE: {t.comment.comment_text}{' '}
              </span>
            </div>
            <RenderTree
              tree={t.children}
              parentId={t.comment.id}
              depth={depth + 1}
            />
          </div>
        ),
    )
  }
}

export default RenderTree
