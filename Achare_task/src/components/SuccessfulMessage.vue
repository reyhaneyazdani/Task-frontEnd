<template>
  <div>
    <TickCircle :size="32" color="#808080" type="linear" />
    <p class="text-center mt-4 text-secondary">اطلاعات شما با موفقیت ثبت شد</p>
    <div class="mx-auto mt-4 text-center">
      <button type="button" class="btn btn-fixed-size rounded-0" @click="$router.push(`/showall`)">مشاهده اطلاعات</button>
    </div>
    
  </div>
</template>

<script setup>
import { TickCircle } from "vue-iconsax";
</script>

<style scoped>
.btn-fixed-size {
  width: 350px; 
  height: 40px;
  color: #00bfa5;
  border-color: #00bfa5;
}
</style>
