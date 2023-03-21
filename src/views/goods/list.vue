<template>
  <div class="page-bg">
    <anTable :data="tableData" @getChecked="(data:any)=>selectData = data">
      <template #search>
        <div class="flex search">
          <div class="flex">
            <div class="b1">状态：</div>
            <div>
              <el-select placeholder="请选择">
                <el-option label="广州" value="广州" />
                <el-option label="深圳" value="深圳" />
                <el-option label="北京" value="北京" />
              </el-select>
            </div>
          </div>
          <div class="flex">
            <div class="b1">关键词：</div>
            <div>
              <el-input placeholder="请输入搜索内容"></el-input>
            </div>
          </div>
          <div><el-button type="primary">搜索</el-button></div>
        </div>
      </template>

      <template #action>
        <el-button @click="delFun"
          >批量删除 {{ selectData.length ? selectData.length : "" }}</el-button
        >
        <el-button type="primary">新增商品</el-button>
      </template>

      <template #table>
        <el-table-column type="selection" width="55" />
        <el-table-column prop="index" label="编号" />
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="city" label="城市" />
        <el-table-column prop="address" label="地址" width="250" />
        <el-table-column
          fixed="right"
          label="操作栏"
          width="150"
          align="center"
        >
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleClick(scope)"
              >详情</el-button
            >
            <el-button link type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </template>
    </anTable>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import anTable from "@/components/an-table.vue";
import { ElMessage } from "element-plus";

const selectData = ref<listItem[]>([]); //获取勾选的数据

interface listItem {
  index: number;
  date: string;
  name: string;
  state: string;
  city: string;
  address: string;
  zip: string;
  tag: string;
}

const tableData: {
  total: number;
  list: listItem[];
} = {
  total: 20,
  list: [],
};

for (let i = 1; i <= 20; i++) {
  tableData.list.push({
    index: i,
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  });
}

const handleClick = (data: any) => {
  console.log("click", data.row);
};

//删除
function delFun() {
  if (selectData.value.length) {
    console.log(selectData.value);
    let ids = selectData.value.map((v: listItem) => v.index);
    ElMessage.info(JSON.stringify(ids));
  } else {
    ElMessage.warning("请勾选需要删除的数据");
  }
}
</script>

<style lang="scss" scoped>
.search {
  & > div {
    margin-right: 10px;
  }
  .b1 {
    font-size: 14px;
  }
}
</style>
