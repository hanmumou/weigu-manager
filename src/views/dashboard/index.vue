<template>
  <div class="dashboard-container">
    <!--<div class="dashboard-text">name:{{ name }}</div>-->
    <!--<div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {
    return {}
  },
  methods: {
    getAuthCode() {
      var code = location.href
      var _this = this
      for (let i = 0; i < code.length; i++) {
        if (code[i] == '@' && code[i + 1] == '@' && code[i + 2] == '@') {
          let strcode = code.split('?')
          var auth_code = String(strcode[1]).split('&')[0].split('=')[1]
          console.log(auth_code)
          $.ajax({
            headers: {
              'Authorization': 'Bearer' + ' ' + _this.$store.getters.token
            },
            url: 'https://suokekj.com/api/api/wechat/authorize/generate-mini-program',
            type: 'post',
            data: {
              'auth_code': auth_code
            },
            dataType: 'json',
            success: function(res) {
              if (res.message == '小程序生成成功!') {
                let status = 1
                // 跳转到绑定小程序页面
                _this.$router.push({
                  path: '/appmanage/bingapp',
                  query: {
                    status: status
                  }
                })
              } else {
                _this.$router.push({
                  path: '/appmanage/bingapp',
                  query: {
                    status: 0
                  }
                })
              }
            }
          })
        }
      }
    }
  },
  mounted() {
    this.getAuthCode()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
