<script setup>
import { ref } from 'vue'
import { artAddChannelAPI, artEditChannelAPI } from '@/api/article'
const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '不得為空', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '不得為空', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ]
}
// 子傳父
const emit = defineEmits(['success'])
// 提交按鈕
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await artEditChannelAPI(formModel.value)
    ElMessage.success('編輯成功')
  } else {
    await artAddChannelAPI(formModel.value)
    ElMessage.success('新增成功')
  }
  dialogVisible.value = false
  emit('success')
}

/**
 * 组件对外暴露一个方法 open, 基于 open 的参数，初始化表单数据，并判断区分是添加 还是 编辑
    1. open({ }) =>  添加操作，添加表单初始化无数据
    2. open({ id: xx,  ...  })  =>  编辑操作，编辑表单初始化需回显
    open 調用後可以打開彈窗
 */
const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
}

// 向外暴露ㄤ法
defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '編輯分類' : '新增分類'"
    width="30%"
  >
    <el-form ref="formRef" :model="formModel" :rules="rules">
      <el-form-item label="分類名稱" prop="cate_name">
        <el-input v-model="formModel.cate_name" placeholder="請輸入分類名稱" />
      </el-form-item>
      <el-form-item label="分類別名" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          placeholder="請輸入分類別名"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">確認</el-button>
      </div>
    </template>
  </el-dialog>
</template>
