<template>
    <div class="publish-container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="100px"
                 class="demo-ruleForm">
            <el-form-item label="金句类型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择金句类型">
                    <el-option label="搞笑" :value="1"></el-option>
                    <el-option label="情感" :value="2"></el-option>
                    <el-option label="热点" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="金句内容" prop="content">
                <el-input type="textarea" v-model="ruleForm.content" :autosize="{ minRows: 4, maxRows: 6}"
                          placeholder="请输入内容"
                          :maxlength="500"></el-input>
            </el-form-item>
            <el-form-item style="margin: 0;">{{ruleForm.content.length}}/500</el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" style="float: right;">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import JinjuInterface from "@/interface/JinjuInterface";

    export default {
        data() {
            return {
                userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
                rules: {
                    type: [
                        {required: true, message: "请选择金句类型", trigger: "change"}
                    ],
                    content: [
                        {required: true, message: "请填写金句内容", trigger: "blur"}
                    ]
                },
                ruleForm: {
                    type: "",
                    content: ""
                },
            }
        },

        methods: {
            //立即创建
            submitForm(formName) {
                if (!this.userInfo) {
                    this.$message.error("亲，先登陆吧～");
                    return;
                }
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let params = {
                            user_id: this.userInfo.user_id,
                            type: this.ruleForm.type,
                            content: this.ruleForm.content
                        };
                        JinjuInterface.createJinju(params)
                            .then(data => {
                                this.$message.success("发表成功，还要创建一条吗，加鸡腿哦～");
                                this.ruleForm.content = '';
                            })
                            .catch(reason => {
                                this.$message.error(reason);
                            });
                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>

<style>
    .publish-container {
        padding: 20px 10px;
        background-color: #fff;
    }

    .publish-container .el-form--label-top .el-form-item__label {
        padding: 0 !important;
        margin: 0 !important;
    }
</style>
