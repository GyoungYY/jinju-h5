<template>
    <div class="login-form">
        <div class="tag-line">
            <span :class="{'active-tag' : activeTag === 'login'}" @click="activeTag = 'login'">登录</span>
            *
            <span :class="{'active-tag' : activeTag === 'register'}" @click="activeTag = 'register'">注册</span>
        </div>
        <el-form :model="params" :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
            <el-form-item prop="username">
                <el-input placeholder="请输入用户名" v-model="params.username">
                    <el-button slot="prepend" icon="glyphicon glyphicon-user"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input placeholder="请输入用密码" v-model="params.password" type="password">
                    <el-button slot="prepend" icon="glyphicon glyphicon-lock"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item prop="password" v-if="activeTag === 'register'">
                <el-input placeholder="请再次输入密码" v-model="params.passwordAgain" type="password">
                    <el-button slot="prepend" icon="glyphicon glyphicon-lock"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" round @click="submitForm('ruleForm')" v-if="activeTag === 'login'"
                           style="width: 100%;font-size: 16px;">立即登录
                </el-button>
                <el-button type="success" round @click="register('ruleForm')" v-if="activeTag === 'register'"
                           style="width: 100%;font-size: 16px;">注册
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import UserInterface from "@/interface/UserInterface";

    export default {
        data() {
            return {
                activeTag: 'login',
                params: {
                    username: '',
                    password: '',
                    passwordAgain: '',
                },
                rules: {
                    username: [{required: true, message: "请输入用户名", trigger: "blur"}],
                    password: [{required: true, message: "请输入密码", trigger: "blur"}]
                }
            };
        },
        mounted(){
            scrollTo(0, 0);
        },
        methods: {

            //登录接口
            login() {
                UserInterface.login(this.params).then(data => {
                    this.$message.success('报告主人，您已成功登陆～');
                    sessionStorage.setItem('userInfo', JSON.stringify(data));
                    this.$store.commit('changeTab','JinjuList');
                    this.$router.push({path: '/index/jinjuList'});
                }).catch(reason => {
                    this.$message.error(reason);
                });
            },

            //注册接口
            createUser() {
                if(this.params.password.length < 6){
                    this.$message.error('密码至少6位');
                    return;
                }
                if(this.params.password !== this.params.passwordAgain){
                    this.$message.error('两次输入密码不一致');
                    return;
                }
                UserInterface.register(this.params).then(data => {
                    this.$message.success('注册成功，请登录');
                }).catch(reason => {
                    this.$message.error(reason);
                });
            },

            //点击登录按钮
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.login();
                    } else {
                        return false;
                    }
                });
            },

            //点击注册按钮
            register(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.createUser();
                    } else {
                        return false;
                    }
                });
            }
        }
    };
</script>

<style scoped>
    .login-form {
        padding: 60px 30px 30px 30px;
        background-color: #fff;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-image: url("../assets/bg.jpg");
        background-size: 100% 100%;
        background-position: center center;
    }

    .tag-line {
        margin-bottom: 20px;
        font-size: 20px;
        text-align: center;
        color: #fff;
    }

    .tag-line > span {
        padding: 10px;
        display: inline-block;
        cursor: pointer;
    }

    .active-tag {
        color: #f90;
        border-bottom: 2px solid #f90;

    }
</style>
