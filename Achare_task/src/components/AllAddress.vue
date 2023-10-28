<template>
  <div v-if="!loading" class="container ">
    <div   class="card-header text-secondary text-end mb-4">آدرس ها و مشخصات</div>

    <div class="card text-end  mb-4" v-for="item in list" :key="item.id">
      <div class="card-body">
        <div class="row d-flex flex-row-reverse">
          <div class="col-md-4 mb-4 my-container ">
            <h6 class="p-2 mb-2 text-color">نام</h6>
            <p class="p-2 card-text paragraph-color">{{ item.first_name }}</p>
          </div>
          <div class="col-md-4 mb-4 my-container ">
            <h6 class="card-text p-2 mb-2 text-color">نام خانوادگی</h6>
            <p class="card-text paragraph-color">{{ item.last_name }}</p>
          </div>
          <div class="col-md-4 mb-4 my-container ">
            <h6 class="card-text p-2 mb-2 text-color">شماره تلفن همراه</h6>
            <p class="card-text paragraph-color">{{ item.coordinate_mobile }}</p>
          </div>
        </div>
        <div class="pb-4">
            <div class="row d-flex flex-row-reverse">
          <div class="col-md-4 mb-4 my-container ">
            <h6 class="card-text p-2 mb-2 text-color">شماره تلفن ثابت</h6>
            <p class="card-text paragraph-color" v-if="item?.coordinate_phone_number">
              {{ item.coordinate_phone_number }}
            </p>
            <p class="card-text paragraph-color" v-else>-</p>
          </div>
          <div class="col-md-4 mb-4 my-container ">
            <h6 class="card-text p-2 mb-2 text-color">جنسیت</h6>
            <p class="card-text paragraph-color">{{ item.gender }}</p>
          </div>
          <hr class="hr hr-blurry" />
          <div class="col-md-4">
            <h6 class="card-text p-2 mb-2 text-color">آدرس</h6>
            <p class="card-text paragraph-color">{{ item.address }}</p>
          </div>
        </div>
        </div>
      </div>
    </div>
    
  </div>
  <button v-else class="btn btn-load" type="button" disabled>
  <span class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
  در حال بارگیری اطلاعات  
</button>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const loading = ref(false);
const list = ref([]);
onMounted(async () => {
  await getList();
});
const apiUrl = "https://stage.achareh.ir/api/karfarmas/address";
const authHeader = "Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4";
const getList = async () => {
  try {
    loading.value = true;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: authHeader,
      },
    });
    loading.value = false;

    if (response.status === 200) {
      list.value = response.data; 
    } else {
      console.error("Error fetching data. Status:", response.status);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
</script>
<style scoped>
.container {
  padding-right: 0.5rem;
  padding-left: 0.5rem;
}
.my-container {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.btn-load{
    color: #ffff;
  background: #00bfa5;
}

@media (min-width: 768px) {
  .container {
    padding-right: 11rem;
    padding-left: 11rem;
  }

  .my-container {
  flex-direction: column;
  
}
  

  .row {
    display: flex;
    flex-wrap: wrap;
  }

  .hr {
    display: none;
  }
}
.text-color {
  color: #9b9b9b;
}

.paragraph-color {
  color: #37474f;
  font-weight: 700;
}
</style>
