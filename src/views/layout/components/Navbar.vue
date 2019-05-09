<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb />
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
         <!--<img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
        <p id="user-name">{{ name }}
          <i class="el-icon-caret-bottom"/>
        </p>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item >
            主页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getToken, removeToken } from '@/utils/auth'
import { getInfo } from '@/api/login'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      name: '',
      token: getToken()
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  mounted: function() {
    this.getUserinfo()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    async logout() {
      this.$router.push({ name: 'login' })
    },
    async getUserinfo(){
       try{
          await getInfo(this.$store.getters.token).then(res=>{
             this.name = res.data.name
          })
       }catch(err){
         conole.log(err)
       }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background:rgb(48, 65, 86) ;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
<style>
#user-name{
  color: #fff;
  font-style: normal;
  font-size: 16px;
}
#user-name>i{
   margin-top:-19px;
}
</style>

