<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetChannelAPI, artDelChannelAPI } from '@/api/article'
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessage } from 'element-plus'

const channelList = ref([]) //存文章分類
const loading = ref(false)
const dialog = ref()

const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelAPI()
  channelList.value = res.data.data
  // console.log(channelList.value)
  loading.value = false
}
getChannelList()

// 新增
const onAddChannel = () => {
  dialog.value.open({})
}
// 編輯
const onEditChannel = (row) => {
  dialog.value.open(row)
}
// 刪除
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelAPI(row.id)
  ElMessage.success('刪除成功')
  getChannelList()
}

// 監聽子組件的事件
const onSuccess = () => {
  getChannelList()
}
</script>
<template>
  <page-container title="文章分類">
    <template #extra>
      <el-button @click="onAddChannel">添加分類</el-button>
    </template>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="channelList"
      stripe
      style="width: 100%"
    >
      <el-table-column type="index" label="#" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分類名稱"></el-table-column>
      <el-table-column prop="cate_alias" label="分類別名"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button
            circle
            type="primary"
            :icon="Edit"
            @click="onEditChannel(row)"
          >
          </el-button>
          <el-button
            circle
            type="danger"
            :icon="Delete"
            @click="onDelChannel(row)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增分類彈窗 -->
    <ChannelEdit ref="dialog" @success="onSuccess"></ChannelEdit>
  </page-container>
</template>
<style lang="scss" scoped></style>
