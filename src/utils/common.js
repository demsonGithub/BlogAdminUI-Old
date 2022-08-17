import { getMenuListApi } from '@/api/menuPermission'

// 获取树形菜单
export async function getParentMenuData() {
  var apiResult = await getMenuListApi()

  let formatResult = JSON.parse(
    JSON.stringify(apiResult.data)
      .replace(/id/g, 'value')
      .replace(/menuName/g, 'label')
  )

  return formatResult
}
