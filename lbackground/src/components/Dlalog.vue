<template>
  <el-dialog
    :title="dialog.title"
    :visible.sync="dialog.show"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :modal-append-to-body="false"
  >
    <el-form ref="form" :model="formData" :rules="form_rules" label-width="120px">
      <el-form-item label="收支类型">
        <el-select v-model="formData.type" placeholder="收支类型">
          <el-option
            v-for="(formtype,index) in format_type_list"
            :key="index"
            :label="formtype"
            :value="formtype"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="describe" label="收支描述">
        <el-input type="describe" v-model="formData.describe"></el-input>
      </el-form-item>
      <el-form-item prop="incode" label="收入">
        <el-input type="incode" v-model="formData.incode"></el-input>
      </el-form-item>
      <el-form-item prop="expend" label="支出">
        <el-input type="expend" v-model="formData.expend"></el-input>
      </el-form-item>
      <el-form-item prop="cash" label="账户现金">
        <el-input type="cash" v-model="formData.cash"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="formData.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialog.show = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "dlalog",
  data() {
    return {
      format_type_list: [
        "体现",
        "体现手续费",
        "充值",
        "优惠劵",
        "充值礼卷",
        "转账"
      ],
      form_rules: {
        describe: [
          {
            required: true,
            message: "收支描述不能为空",
            trigger: "blur"
          }
        ],
        incode: [
          {
            required: true,
            message: "收入不能为空",
            trigger: "blur"
          }
        ],
        expend: [
          {
            required: true,
            message: "支出不能为空",
            trigger: "blur"
          }
        ],
        cash: [
          {
            required: true,
            message: "账户现金不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    dialog: Object,
    formData:Object
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
            const url=this.dialog.option == "add" ? "add" : `edit/${this.formData.id}`
          //   console.log(this.formData)
          this.$axios.post(`api/profiles/${url}`, this.formData).then(res => {
            //添加成功
            this.
              $message({
                message: "数据操作成功",
                type: "success"
              });
            //隐藏
            this.dialog.show = false;
            this.$emit('update');
            this.formData='';
          });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>

