import { ref } from "vue"
export default function usePagination() {
  const pagination = ref({
    page: 1,
    size: 10,
    total: 0,
    sizes: [10, 20, 50, 100],
    layout: 'total, sizes, ->, prev, pager, next, jumper',
    sort: null ,
    order: null,
  })

  function getParams() {
    return {
      page: pagination.value.page - 0,
      size: pagination.value.size,
      from: (pagination.value.page - 1) * pagination.value.size,
      limit: pagination.value.size,
      ...(
        pagination.value.sort && pagination.value.order && {
          sort: pagination.value.sort,
          order: pagination.value.order,
        }
      ),
    }
  }

  async function onSizeChange(size) {
    pagination.value.size = size
  }

  async function onCurrentChange(page) {
    pagination.value.page = page
  }

  async function onSortChange(prop, order) {
    pagination.value.sort = prop
    pagination.value.order = order === 'ascending' ? 'asc' : 'desc'
  }

  return {
    pagination,
    getParams,
    onSizeChange,
    onCurrentChange,
    onSortChange,
  }
}
