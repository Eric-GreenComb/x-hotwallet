<template>
  <div class="container unlogin-container" :style="'min-height: '+minHeight">
    <div>
      <div class="row disf"><span class="label"></span><input v-model="mobile" class="flex1" type="text" placeholder="请输入手机号">
      </div>
      <div class="row disf">
        <input v-model="password" class="flex1" type="password" placeholder="短信验证码">
        <button class="button" id="btn_ck" >获取验证码</button>
      </div>
      <div class="row disf"><span class="label"></span><input v-model="mobile" class="flex1" type="password" placeholder="字母和数字组合,620位">
      </div>
    </div>
    <button class="button" @click="toLogin">确&nbsp;&nbsp;&nbsp;&nbsp;定</button>
  </div>
</template>

