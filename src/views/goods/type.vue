<template>
    <div>
      <anTable :data="tableData" @getChecked="(data:any)=>selectData = data">

        <template #action>
          <el-button @click="delFun">批量删除</el-button>
          <el-button type="primary">新增类型</el-button>
        </template>
    
        <template #table>
          <el-table-column type="selection" width="55" />
          <el-table-column prop="name" label="编号" />
          <el-table-column prop="time" label="创建时间" width="250" />
          <el-table-column fixed="right" label="操作栏" width="150" align="center">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="handleClick(scope)"
                >编辑</el-button
              >
              <el-button link type="primary" size="small">删除</el-button>
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
    
    const selectData = ref([]); //获取勾选的数据
    
    const tableData: any = {
      total: 20,
      list: [],
    };
    
    for (let i = 1; i <= 5; i++) {
      tableData.list.push({
        index: i,
        name: "化妆品",
        time: "2023-3-15 17:07:37",
      });
    }
    
    const handleClick = (data: any) => {
      console.log("click", data.row);
    };
    
    //删除
    function delFun() {
      if (selectData.value.length) {
        console.log(selectData.value);
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
    