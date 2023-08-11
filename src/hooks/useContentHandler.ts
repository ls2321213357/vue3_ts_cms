import { ref } from 'vue'
import type pageContent from '@/views/main/system/department/components/pageContent.vue'
import type pageDialog from '@/views/main/system/department/components/pageDialog.vue'
type editFnType = (data: any) => void
export function useContentHandler(editCallBack?: editFnType) {
  const pageCtx = ref<InstanceType<typeof pageContent>>()
  const pageDig = ref<InstanceType<typeof pageDialog>>()
  //查询操作
  const pageSearchHandler = (searchObj: any) => {
    pageCtx.value?.fetchSearchHandler(searchObj)
  }
  //重置操作
  const pageResetHandler = () => {
    pageCtx.value?.fetchSearchHandler()
  }
  //编辑操作
  const editClickHandler = (itemData: any) => {
    pageDig.value?.editItemHandler(itemData)
    if (editCallBack) editCallBack(itemData)
  }
  //成功成功的回调
  const editSuccessHandler = () => {
    pageCtx.value?.fetchSearchHandler()
  }
  //新建操作
  const createClickHandler = () => {
    pageDig.value?.createUserItem()
  }
  //新建成功的回调
  const createSuccessHandler = () => {
    pageCtx.value?.fetchSearchHandler()
  }
  return {
    pageCtx,
    pageDig,
    pageResetHandler,
    pageSearchHandler,
    editClickHandler,
    editSuccessHandler,
    createClickHandler,
    createSuccessHandler
  }
}
