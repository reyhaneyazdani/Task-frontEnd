<template>
  <div class="container">
    <div class="card-header text-end mb-4 text-secondary">
      انتخاب موقعیت <ArrowRight :size="22" color="#808080" type="linear" />
    </div>
    <div class="card">
      <!-- <div class="card-text text-end mb-3 " style="color:#37474F;">
        موقعیت مورد نظر خود را روی نقشه مشخص کنید
    </div> -->

      <div ref="mapContainer" class="map-container"></div>
    </div>
    <div class="mx-auto mt-4 text-center">
      <button
        v-if="!loading"
        type="button"
        class="btn btn-fixed-size rounded-0"
        style="color: #ffff; background: #00bfa5"
        @click="handelRequest"
      >
        ثبت و ادامه
      </button>

      <button
        v-else
        type="button"
        class="btn btn-fixed-size rounded-0 dot-elastic-button"
        
      >
        <div class="dot-elastic"></div>
      </button>
    </div>

    


  </div>
</template>

<script setup>
import { ArrowRight } from "vue-iconsax";
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

const formData = computed(() => store.state.formData);

import L from "leaflet";
import "leaflet-easybutton";

const apiUrl = "https://stage.achareh.ir/api/karfarmas/address";
const authHeader = "Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4";

const lat = ref(0);
const lng = ref(0);
const map = ref();
const mapContainer = ref();
const loading = ref(false);

const errorMessage = ref("");

const handleError = (message) => {

  errorMessage.value = message;
  loading.value = false
  alert(errorMessage.value);
};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
      lat.value = position.coords.latitude;
      lng.value = position.coords.longitude;
      map.value.setView([lat.value, lng.value], 13);

      L.marker([lat.value, lng.value], { draggable: true })
        .addTo(map.value)
        .on("dragend", (event) => {
          console.log(event.target._latlng.lat);
          console.log(event.target._latlng.lng);
        });
    });
  }
}
onMounted(() => {
  map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map.value);

  L.easyButton(
    '<i class="material-icons" style="font-size:18px; padding-bottom: 12px; display: flex; vertical-align: middle;">gps_fixed</i>',
    function () {
      getLocation();
    },
    { position: "bottomright" }
  ).addTo(map.value);
});

const handelRequest = async () => {
  const additionalData = {
    lat: lat.value,
    lng: lng.value,
  };

  const combinedData = {
    ...formData.value,
    ...additionalData,
  };

  try {
    loading.value = true;
    const response = await axios.post(apiUrl, combinedData, {
      headers: {
        Authorization: authHeader,
      },
    });
    loading.value = false;
    if (response.status === 200) {
      console.log("Data posted successfully:", response.data);
      router.push("/success");
    } else {
      console.error("Error posting data. Status:", response.status);
      handleError("خطا در برقراری ارتباط.\n دوباره تلاش کنید");
    }
  } catch (error) {
    console.error("Error posting data:", error);
    handleError("خطا در برقراری ارتباط.\n دوباره تلاش کنید");
  }
};
</script>

<style scoped>
.map-container {
  width: 340px;
  height: 431px;
  margin: auto;
}

@media (min-width: 768px) {
  .map-container {
    width: 920px;
    height: 418px;
  }
  .container {
    padding-right: 10rem;
    padding-left: 10rem;
  }
}

.container {
  padding-right: 0.5rem;
  padding-left: 0.5rem;
}

.btn-fixed-size {
  width: 350px; 
  height: 40px;
}
.dot-elastic-button {
  color: #ffff;
  background: #00bfa5;
  display:inline-flex;
  align-items: center;
  justify-content: center;
}
.dot-elastic {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #ffff;
  color: #ffff;
  animation: dot-elastic 1s infinite linear;
}
.dot-elastic::before,
.dot-elastic::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}
.dot-elastic::before {
  left: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #ffff;
  color: #ffff;
  animation: dot-elastic-before 1s infinite linear;
}
.dot-elastic::after {
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #ffff;
  color: #ffff;
  animation: dot-elastic-after 1s infinite linear;
}

@keyframes dot-elastic-before {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1.5);
  }
  50% {
    transform: scale(1, 0.67);
  }
  75% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
}
@keyframes dot-elastic {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 1.5);
  }
  75% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
}
@keyframes dot-elastic-after {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 0.67);
  }
  75% {
    transform: scale(1, 1.5);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>
