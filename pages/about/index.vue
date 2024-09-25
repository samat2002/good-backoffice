<script lang="ts" setup>
import Swal from "sweetalert2";
import type { About } from "~/misc/types";
import errorImage from "@/assets/images/error.png"

const defaultImage = "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg"

// definePageMeta({
//   middleware: ["auth"],
// });

const { getAboutByID, updateAboutBy, insertAbout } = useAbout();
const router = useRouter();
const { public: publicCtx } = useRuntimeConfig()
const submitting = ref(false)
const abouts = ref<About>({
  id: '',
  about_detail: '',
  about_img: '',
})

const buffer_image = ref<{
  about_img: { files?: File[], src: string },
}>({
  about_img: { src: '' },
})

onMounted(async () => {
  // try {
  //   const params = new URLSearchParams(window.location.search);
  //   const query: { [key: number | string]: string } = {};

  //   for (const [key, value] of params) {
  //     query[key] = value;
  //   }

  //   abouts.value = await getAboutByID({ id: 'DEFAULT' })
  // } catch (e) {
  //   console.log(e)
  // }

  abouts.value = await getAboutByID({ id: 'DEFAULT' })
})

async function onSubmit() {
  try {
    submitting.value = true
    await updateAboutBy({
      about: abouts.value,
      about_img: buffer_image.value.about_img.files
    })
    void Swal.fire({ title: 'สำเร็จ', text: 'บันทึกข้อมูลแล้ว', icon: "success" })
    await router.push({ path: '/about' });
    console.log(abouts.value);
  } catch (e) {
    console.log(e)
  }

  submitting.value = false
}

function changeImage(e: Event) {
  const reader = new FileReader();
  const target = e.target as HTMLInputElement;

  if (target.files?.length) {
    const file = target.files[0];

    reader.onloadend = () => {
      buffer_image.value.about_img.src = reader.result as string
    };

    reader.readAsDataURL(file);
  }
}

function clearImage() {
  buffer_image.value.about_img = { src: '' }
}


</script>

<template>
  <v-card elevation="10" class="withbg mx-auto" color="grey-lighten-3">
    <v-card-title>เกี่ยวกับเรา</v-card-title>
    <v-card-item>
      <v-row>
        <v-col>
          <v-textarea label="เกี่ยวกับฉัน" v-model="abouts.about_detail"> </v-textarea>
        </v-col>
        <v-col cols="12" md="4">
          <div class="text-center" style="max-width: 400px;">
            <template v-if="buffer_image.about_img.src">
              <v-img :src="buffer_image.about_img.src" aspect-ratio="1" cover max-height="200px"></v-img>
            </template>
            <template v-else-if="abouts.about_img">
              <v-img :src="`${publicCtx.apiBaseUrl}${abouts.about_img}`" aspect-ratio="1" cover max-height="200px">
                <template v-slot:error>
                  <v-img :src="errorImage" alt="error"></v-img>
                </template>
              </v-img>
            </template>
            <template v-else>
              <v-img :src="defaultImage" aspect-ratio="1" max-height="200px"></v-img>
            </template>
            <v-file-input v-model="buffer_image.about_img.files" class="mt-4" accept="image/png, image/jpeg"
              label="รูป (ถ้ามี)" density="compact" @change="changeImage" @click:clear="clearImage"></v-file-input>
          </div>
        </v-col>
        <!-- <v-col>
          <template v-if="abouts.about_img">
            <v-img :src="abouts.about_img" aspect-ratio="1" cover max-height="250px"></v-img>
          </template>
          <template v-else-if="!abouts.about_img">
            <v-img :src="`${publicCtx.apiBaseUrl}${abouts.about_img}`" aspect-ratio="1" cover max-height="250px">
              <template v-slot:error>
                <v-img :src="errorImage" alt="error"></v-img>
              </template>
            </v-img>
          </template>
          <template v-else>
            <v-img :src="defaultImage" aspect-ratio="1" max-height="400px"></v-img>
          </template>
          <v-col class="ml-16" lg="9">
            <v-file-input v-model="buffer_image.about_img.files" class="mt-4" accept="image/png, image/jpeg" label="รูป"
              density="compact" @change="changeImage" @click:clear="clearImage()">
            </v-file-input>
          </v-col>
        </v-col> -->
      </v-row>
    </v-card-item>
    <v-card-text class="d-flex flex-wrap justify-center gap-2">
      <v-btn color="save" @click="onSubmit">
        <template v-if="submitting">
          <v-progress-circular class="mr-2" indeterminate color="success" :size="16"></v-progress-circular>
        </template> บันทึก
      </v-btn>
    </v-card-text>
  </v-card>
</template>