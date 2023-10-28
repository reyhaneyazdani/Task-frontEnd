<template>
  <div class="container ">
    <form @submit.prevent="handelRequest"   class="row g-3 needs-validation" novalidate>
      <div class="card-header text-end ">ثبت آدرس</div>
      <div class="card text-end ">
        <div class="card-body">
          <p class="card-title mb-4">لطفا مشخصات و آدرس خود را وارد کنید</p>

          <div class="row mb-2 d-flex flex-row-reverse">
            <div class="col-md-4 mb-4">
              <label for="validationCustom01" class="form-label">نام</label>
              <input
                type="text"
                v-model="first_name"
                class="form-control form-control-sm text-end"
                id="validationCustom01"
                placeholder="مثال:محمدرضا"
                required
              />
            </div>
            <div class="col-md-4 mb-4">
              <label for="validationCustom02" class="form-label"
                >نام خانوادگی</label
              >
              <input
                type="text"
                v-model="last_name"
                class="form-control form-control-sm text-end"
                id="validationCustom02"
                placeholder="مثال:رضایی"
                required
                minlength="3"
                pattern=".{3,}"
                title=""
              />
              <div class="invalid-feedback">نام خانوادگی باید دارای 3 کاراکتر باشد</div>
            </div>
            <div class="col-md-4 mb-4">
              <label for="validationCustom03" class="form-label"
                >شماره تلفن همراه</label
              >
              <input
                type="text"
                v-model="coordinate_mobile"
                class="form-control form-control-sm text-end"
                id="validationCustom03"
                placeholder="مثال: ۰۹۱۲۱۲۳۴۵۶۷"
                required
                minlength="11"
                maxlength="11"
                pattern=".{11,}"
              />
              <div class="invalid-feedback">شماره وارد شده صحیح نمی باشد</div>
            </div>
          </div>

          <div class="row mb-2 d-flex flex-row-reverse">
            <div class="col-md-4 mb-4">
              <label for="exampleFormControlInput4" class="form-label"
                >شماره تلفن ثابت (اختیاری)</label
              >
              <textarea
                type="text"
                v-model="coordinate_phone_number"
                class="form-control form-control-sm text-end"
                id="exampleFormControlInput4"
                placeholder="مثال: ۰۲۱۱۲۳۴۵۶۷"
                rows="1"
              ></textarea>
            </div>
            <div class="col-md-8 mb-4">
              <label for="validationCustom04" class="form-label">آدرس</label>
              <textarea
                class="form-control form-control-sm text-end"
                v-model="address"
                id="validationCustom04"
                rows="1"
                minlength="10"
                required
              ></textarea>
              <div class="invalid-feedback">آدرس باید حداقل 10 کاراکتر باشد</div>
            </div>
          </div>

          <div class="row mb-2">
            <label for="inlineRadio1" class="form-label">جنسیت</label>
            <div class="col-md-2 mb-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  v-model="gender"
                  type="radio"
                  name="gender"
                  id="inlineRadio1"
                  value="خانوم"
                  required
                />
                <label class="form-check-label" for="inlineRadio1">خانوم</label>
              </div>
            </div>

            <div class="col-md-2 mb-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  v-model="gender"
                  type="radio"
                  name="gender"
                  id="inlineRadio2"
                  value="آقا"
                  required
                />
                <label class="form-check-label" for="inlineRadio2">آقا</label>
                <div class="invalid-feedback">جنسیت را انتخاب کنید</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-auto mt-4 text-center">
        <button
          v-if="!loading "
          type="submit"
          class="btn btn-fixed-size rounded-0"
          style="color: #ffff; background: #00bfa5"
          
          
        >
          ثبت و ادامه
        </button>
      </div>
    </form>
  </div>

</template>

<script setup>

import { ref, onMounted,computed } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();

const store = useStore();

const address = ref(null);
const first_name = ref(null);
const last_name = ref(null);
const gender = ref(null);
const coordinate_phone_number = ref(null);
const coordinate_mobile = ref(null);
const loading = ref(false)
const isFormValid = ref(false);


onMounted(() => {
  const forms = document.querySelectorAll('.needs-validation');

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (form.checkValidity()) {
        isFormValid.value = true; 
      } else {
        event.preventDefault();
        event.stopPropagation();
        isFormValid.value = false;
      }
      form.classList.add('was-validated');
    }, false);
  });
});


const handelRequest = async () => {
  if(isFormValid.value === true){
  const formData = {
    id:660283,
    address_id:"8b0d0681-62f5-4697-bfdb-ed5b2f7e3fab",
    region: 1,
    address: address.value,
    last_name: last_name.value,
    first_name: first_name.value,
    gender: gender.value,
    coordinate_mobile: coordinate_mobile.value,
    coordinate_phone_number: coordinate_phone_number.value,
  };

  store.commit('setFormData', formData);
  router.push('/addnewaddress/location');
}

};
</script>

<style scoped>
.container {
  padding-right: 1.5rem;
  padding-left: 1.5rem;
}

@media (min-width: 768px) {
  .container {
    padding-right: 7rem;
    padding-left: 7rem;
  }
}
.btn-fixed-size {
  width: 350px; 
  height: 40px;
}
.form-check-input:checked {
  background-color: #00bfa5; 
  border-color: #00bfa5; 
}
</style>
