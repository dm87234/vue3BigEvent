<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import ArticleEdit from './components/ArticleEdit.vue'
import { artGetListAPI } from '@/api/article'
import { formatTime } from '@/utils/dateFormat'

const articleList = ref([]) // 文章列表
const total = ref(0) // 文章條數
const loading = ref(false)
const articleEditRef = ref()

//搜索請求參數對象
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

// 獲取文章列表
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListAPI(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}

// 新增文章
const onAddArticle = () => {
  articleEditRef.value.open({})
}

// 編輯文章
const onEditArtcle = (row) => {
  articleEditRef.value.open(row)
}
// 刪除文章
const onDeleteArtcle = (row) => {
  console.log(row)
}
// 分頁條數變動時
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
// 頁碼變動時
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}

const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}

const onReset = () => {
  params.value.state = ''
  params.value.cate_id = ''
  params.value.pagenum = 1
  getArticleList()
}
// created
getArticleList()
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button @click="onAddArticle" type="primary">添加文章</el-button>
    </template>
    <!-- 表單區域 -->
    <el-form inline>
      <el-form-item label="文章分類:">
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="發布狀態:">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格區域 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章標題" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分類" prop="cate_name"></el-table-column>
      <el-table-column label="發表時間" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="狀態" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            circle
            type="primary"
            :icon="Edit"
            @click="onEditArtcle(row)"
          ></el-button>
          <el-button
            circle
            type="danger"
            :icon="Delete"
            @click="onDeleteArtcle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分頁 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />

    <!-- 新增文章抽屜 -->
    <ArticleEdit ref="articleEditRef"></ArticleEdit>
  </page-container>
</template>

<style lang="scss" scoped>
.el-select {
  width: 200px;
}
.el-pagination {
  margin-top: 30px;
}
</style>
