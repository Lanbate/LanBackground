<template>
  <div>
    <el-form :inline="true" ref="add_data" :v-model="search_data">
      <el-form-item label="按照时间筛选:">
        <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>- -
        <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="search" @click="handleSearch()">筛选</el-button>
      </el-form-item>
      <div class="addbt">
        <el-form-item class="btnRight">
          <el-button
            type="primary"
            size="small"
            icon="view"
            v-if="user.identity == 'manager'"
            @click="handleAdd()"
          >添加</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-table
      v-if="tableData.length>0"
      :data="tableData"
      max-height="450"
      border
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
      <el-table-column prop="date" label="创建时间" align="center" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
      <el-table-column prop="describe" label="收支描述" align="center" width="180"></el-table-column>
      <el-table-column prop="incode" label="收入" align="center" width="170">
        <template slot-scope="scope">
          <span style="color:#00d053">{{ scope.row.incode }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="expend" label="支出" align="center" width="170">
        <template slot-scope="scope">
          <span style="color:#f56767">{{ scope.row.expend }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cash" label="账户现金" align="center" width="170">
        <template slot-scope="scope">
          <span style="color:#4db3ff">{{ scope.row.cash }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center" width="220"></el-table-column>
      <el-table-column
        label="操作"
        prop="operation"
        align="center"
        width="180"
        v-if="user.identity == 'manager'"
      >
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="mini"
            icon="edit"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="delete"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-row>
      <el-col :span="24">
        <div class="paginations">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="paginatios.page_index"
            :page-sizes="paginatios.page_sizes"
            :page-size="paginatios.page_size"
            :layout="paginatios.layout"
            :total="paginatios.total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <Dlalog :dialog="dlalog" :formData="formData" @update="getProfile()"></Dlalog>
  </div>
</template>

<script>
import Dlalog from "../components/Dlalog";
export default {
  name: "FundList",
  data() {
    return {
      search_data: {
        startTime: "",
        endTime: ""
      },
      filterTableData: [],
      paginatios: {
        page_index: 1, //当前在哪一页
        total: 0, //总数
        page_size: 5, //一页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" //翻页属性
      },
      tableData: [],
      allTableData: [],
      formData: {
        type: "",
        describe: "",
        incode: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      dlalog: {
        show: false,
        title: "",
        option: "edit"
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      //获取表单数据
      this.$axios
        .get("/api/profiles")
        .then(res => {
          // console.log(res);
          this.allTableData = res.data;
          this.filterTableData = res.data;
          //设置分页数据
          this.setPaginations();
        })
        .catch(err => console.log(err));
    },
    setPaginations() {
      //分页属性设置
      this.paginatios.total = this.allTableData.length;
      this.paginatios.page_index = 1;
      this.paginatios.page_size = 5;
      //设置默认的分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginatios.page_size;
      });
    },
    handleEdit(index, row) {
      //编辑
      this.dlalog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };
      this.formData = {
        type: row.type,
        describe: row.describe,
        incode: row.incode,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    handleDelete(index, row) {
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    handleAdd() {
      this.dlalog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      this.formData = {
        type: "",
        describe: "",
        incode: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
    },
    handleSizeChange(page_size) {
      // console.log(page_size);
      //切换size
      this.paginatios.page_index = 1;
      this.paginatios.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      // console.log(page);
      //获取当前页
      let index = this.paginatios.page_size * (page - 1);
      //获取数据的总数
      let nums = this.paginatios.page_size * page;
      //容器
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    },
    handleSearch() {
      //筛选
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        this.getProfile();
        return;
      }
      //开始时间
      const sTime = this.search_data.startTime.getTime();
      //结束时间
      const eTime = this.search_data.endTime.getTime();

      this.allTableData = this.filterTableData.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= sTime && time <= eTime;
      });

      //分页数据
      this.setPaginations();
    }
  },
  components: {
    Dlalog
  }
};
</script>

<style scoped>
.addbt {
  float: right;
}
.paginations {
  text-align: right;
  margin-top: 10px;
}
</style>

