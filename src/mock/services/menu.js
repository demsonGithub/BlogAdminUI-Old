const accessedMenu = [
  {
    id: 1,
    parentId: 0,
    icon: 'example',
    name: 'Example',
    path: '/example',
    children: [
      {
        id: 11,
        parentId: 1,
        icon: 'input',
        name: 'Input',
        path: '/example/input'
      },
      {
        id: 12,
        parentId: 1,
        icon: 'table',
        name: 'Table',
        path: '/example/table'
      }
    ]
  }
]

export default {
  getMenuByRole: config => {
    const { roles } = JSON.parse(config.body)

    return {
      code: 1,
      data: accessedMenu
    }
  }
}
